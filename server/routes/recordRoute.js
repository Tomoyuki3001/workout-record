const express = require("express");
const router = express.Router();
const RecordModel = require("../models/recordModel");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/get-a-record", authMiddleware, async (req, res) => {
  try {
    const records = await RecordModel.findOne({ id: req.body.id });
    // res.status(200).send({
    //   message: "Logs fetched successfully",
    //   success: true,
    //   data: logs,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor accounts",
      success: false,
      error,
    });
  }
});

router.post("/create-training-record", authMiddleware, async (req, res) => {
  const dateRecord = await RecordModel.findOne({ id: req.body.userId });
  try {
    const updatedLogs = await LogModel.findOneAndUpdate(
      {
        userId: userId,
      },
      { logs: newLogs },
      { new: true }
    );
    res.json(updatedLogs);
  } catch (error) {
    res.status(500).json({ error: "Could not update logs", details: error });
  }
});

module.exports = router;
