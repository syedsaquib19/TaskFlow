import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    console.log("🔹 Raw header:", header);

    if (!header) {
      return res.status(401).json({ status: "fail", message: "No token sent" });
    }

    const token = header.split(" ")[1];
    console.log("🔹 Extracted token:", token?.slice(0, 20) + "...");

    if (!process.env.JWT_SECRET) {
      console.log("🚨 JWT_SECRET missing!");
      return res.status(500).json({ status: "fail", message: "Server misconfiguration" });
    }

    console.log("🔹 Using JWT_SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("💥 JWT verify error:", err.message);
    return res.status(401).json({ status: "fail", message: "Invalid or expired token" });
  }
};
