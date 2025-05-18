const express = require("express");
const router = express.Router();
const Tournament = require("../models/Tournament");

// GET all tournaments
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ date: 1 });
    res.json({ success: true, tournaments });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET single tournament
router.get("/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, tournament });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// CREATE tournament
router.post("/", async (req, res) => {
  try {
    const { name, date, time, prizePool, maxParticipants, description } = req.body;
    const tournament = new Tournament({ name, date, time, prizePool, maxParticipants, description });
    await tournament.save();
    res.status(201).json({ success: true, tournament });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid data" });
  }
});

// UPDATE tournament
router.put("/:id", async (req, res) => {
  try {
    const { name, date, time, prizePool, maxParticipants, description } = req.body;
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { name, date, time, prizePool, maxParticipants, description },
      { new: true }
    );
    if (!tournament) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, tournament });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid data" });
  }
});

// DELETE tournament
router.delete("/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Tournament deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
