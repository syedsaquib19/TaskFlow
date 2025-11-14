import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["backlog", "in-progress", "review", "done"],
    default: "backlog",
  },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  tags: [String],
  category: String,
  dueDate: Date,
  assignees: [String],
  recurrence: {
    type: String,
    enum: ["none", "daily", "weekly", "monthly"],
    default: "none",
  },
  reminderTime: Date, // when to send reminder
  lastReminderSent: Date, // prevent duplicate reminders
  completedAt: Date,
      attachments: [
      {
        url: String,
        publicId: String,
        filename: String,
        filetype: String,
        size: Number,
        uploadedAt: { type: Date, default: Date.now },
      }
    ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
