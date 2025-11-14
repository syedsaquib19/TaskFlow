import express from "express";
const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, message } = req.body || {};
  console.log("📩 Contact message:", { name, email, message, at: new Date().toISOString() });
  res.json({ ok: true });
});

export default router;
