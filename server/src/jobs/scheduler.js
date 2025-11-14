import cron from "node-cron";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { sendReminderEmail } from "../utils/mailer.js";

console.log("📌 Scheduler file loaded");

cron.schedule("*/1 * * * *", async () => {
  console.log("🕓 Scheduler running at:", new Date().toLocaleTimeString());

  const now = new Date();
  const tasks = await Task.find({
    reminderTime: { $lte: now },
    status: { $ne: "done" },
  }).populate("createdBy");

  console.log("🔍 Tasks found:", tasks.length);
});
