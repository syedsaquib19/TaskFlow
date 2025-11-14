import express from "express";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/:taskId", auth, upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "taskflow/attachments" },
      async (error, uploadResult) => {
        if (error) return res.status(500).json({ message: error.message });

        const task = await Task.findById(req.params.taskId);
        const att = {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          filename: req.file.originalname,
          filetype: req.file.mimetype,
          size: req.file.size
        };

        task.attachments.push(att);
        await task.save();

        // notify real-time
        const io = req.app.get("io");
        io.emit("task:update", task);

        res.json(att);
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:taskId/:publicId", auth, async (req, res) => {
  try {
    const { taskId, publicId } = req.params;

    await cloudinary.uploader.destroy(publicId);
    const task = await Task.findByIdAndUpdate(taskId, {
      $pull: { attachments: { publicId } }
    }, { new: true });

    const io = req.app.get("io");
    io.emit("task:update", task);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
