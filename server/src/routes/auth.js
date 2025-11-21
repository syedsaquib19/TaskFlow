import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.js";
import { createAccessToken, createRefreshToken } from "../utils/tokens.js";
import { sendReminderEmail } from "../utils/mailer.js";


const router = express.Router();

/** Helper: set refresh token as httpOnly cookie */
const setRefreshCookie = (res, token) => {
  const maxAge = 1000 * 60 * 60 * 24 * 7; // 7 days in ms (align with REFRESH_TOKEN_EXPIRES)
  res.cookie("refreshToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge
  });
};

/** REGISTER */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("📩 Registration attempt:", email);

  try {
    const exists = await User.findOne({ email });
    console.log("🔍 Found user:", exists);

    if (exists) {
      console.log("❌ Email already exists:", email);
      return res.status(409).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    console.log("✅ User registered successfully:", user.email);

    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error("💥 Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


/** LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // basic validation
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    // find the user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    // use the model's built-in checker
    const isMatch = await user.checkPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // generate tokens
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    // store refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // set cookie
    setRefreshCookie(res, refreshToken);

    // respond
    res.json({
      accessToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("💥 Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



/** REFRESH ACCESS TOKEN (reads httpOnly cookie) */
router.post("/refresh", async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    // verify token
    let payload;
    try {
      payload = await new Promise((resolve, reject) => {
        import("jsonwebtoken").then(({ default: jwt }) => {
          jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
          });
        });
      });
    } catch (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token) return res.status(401).json({ message: "Invalid session" });

    const accessToken = createAccessToken({ id: user._id });
    // optionally rotate refresh tokens here (issue new one)
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
});

/** LOGOUT (clear refresh cookie + remove token in DB) */
router.post("/logout", async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      // try to find user and remove refreshToken
      await User.updateOne({ refreshToken: token }, { $unset: { refreshToken: "" } });
    }
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

/** FORGOT PASSWORD — send reset link */
router.post("/forgot", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ ok: true }); // don't reveal existence

    const token = crypto.randomBytes(32).toString("hex");
    // store a hashed token & expiry
    const hashed = crypto.createHash("sha256").update(token).digest("hex");
    user.resetPasswordToken = hashed;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const html = `
      <p>Hello ${user.name},</p>
      <p>You requested a password reset. Click the link below to set a new password (valid 1 hour):</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you didn't request this, ignore this email.</p>
    `;

    await sendMail({ to: user.email, subject: "TaskFlow — Password reset", html });

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

/** RESET PASSWORD — token in URL */
router.post("/reset/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "Password required" });

    const hashed = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ resetPasswordToken: hashed, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
