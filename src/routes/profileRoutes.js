import express from "express";
import protect from "./../middleware/authMiddleware.js";

const router = express.Router();

// Protected profile route
router.get("/", protect, (req, res) => {
  res.json({
    message: "User profile accessed successfully",
    user: req.user,
  });
});

export default router;
