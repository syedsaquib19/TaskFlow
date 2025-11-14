import express from "express";
// after imports
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
router.use(auth);

/* READ all with filters + pagination + optional date range for calendar */
router.get("/", async (req, res, next) => {
  try {
    const { status, priority, q, page = 1, limit = 10, start, end, hasDue } = req.query;
    const filter = { createdBy: req.user.id };

    // Filters
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (q) filter.title = { $regex: q, $options: "i" };

    // If calendar passes start & end date, filter by range
    if (start || end || hasDue === "true") {
      filter.dueDate = {};
      if (start) filter.dueDate.$gte = new Date(start);
      if (end) filter.dueDate.$lte = new Date(end);
      if (hasDue === "true" && !start && !end) {
        // only tasks that have a due date
        filter.dueDate = { $exists: true, $ne: null };
      }
    }

    const skip = (page - 1) * limit;
    const total = await Task.countDocuments(filter);
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ total, page: Number(page), tasks });
  } catch (err) {
    next(err);
  }
});


/* CREATE */
router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });
    const io = req.app.get("io");
    io.emit("task:create", task);
    res.status(201).json(task);
  } catch (err) { next(err); }
});

/* UPDATE */
router.put("/:id", async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    const io = req.app.get("io");
    io.emit("task:update", task);
    res.json(task);
  } catch (err) { next(err); }
});

/* DELETE */
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    const io = req.app.get("io");
    io.emit("task:delete", deleted._id);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;

