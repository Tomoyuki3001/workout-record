const express = require("express");
const router = express.Router();
const RecordModel = require("../models/recordModel");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create-record", authMiddleware, async (req, res) => {
  console.log("value", req.body);
  const recordFromTheDate = await RecordModel.findOne({ date: req.body.date });
  if (recordFromTheDate) {
    return res
      .status(200)
      .send({ message: "The record already exists", success: false });
  }
  try {
    const newRecord = new RecordModel(req.body);
    await newRecord.save();
    res
      .status(200)
      .send({ message: "Daily record created successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not create the daily record", details: error });
  }
});

module.exports = router;
