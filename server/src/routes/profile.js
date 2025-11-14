import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js"; // we'll update auth middleware to verify access token

const router = express.Router();

router.use(auth);

// GET /api/profile
router.get("/", async (req, res) => {
  const user = await User.findById(req.user.id).select("-password -refreshToken -resetPasswordToken -resetPasswordExpires");
  res.json(user);
});

// PUT /api/profile
router.put("/", async (req, res) => {
  const { name, avatar, theme } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { name, avatar, theme }, { new: true }).select("-password -refreshToken");
  res.json(user);
});

// POST /api/profile/change-password
router.post("/change-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ message: "Both passwords required" });

  const user = await User.findById(req.user.id);
  const ok = await bcrypt.compare(currentPassword, user.password);
  if (!ok) return res.status(401).json({ message: "Current password incorrect" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ ok: true });
});

export default router;
