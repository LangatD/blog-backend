import express from "express";
import ContactMessage from "../models/ContactMessage.js"; // Import the model

const router = express.Router();
router.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newMessage = new ContactMessage({ name, email, message });
      await newMessage.save();
  
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;