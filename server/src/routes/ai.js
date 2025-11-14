import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // 🔥 UPDATED MODEL
      messages: [
        {
          role: "system",
          content:
            "You are a productivity assistant that creates clear, actionable tasks.",
        },
        { role: "user", content: `Generate 3 specific, actionable tasks for: ${prompt}` },
      ],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (err) {
    console.error("Groq error:", err);
    res.status(500).json({ message: "AI request failed" });
  }
});

export default router;
