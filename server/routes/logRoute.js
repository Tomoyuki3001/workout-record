const express = require("express");
const router = express.Router();
const LogModel = require("../models/logModel");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/get-all-records", authMiddleware, async (req, res) => {
  try {
    const records = await LogModel.find({ userId: req.body.userId });
    res.status(200).send({
      message: "Logs fetched successfully",
      success: true,
      data: records,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor accounts",
      success: false,
      error,
    });
  }
});

router.post("/create-daily-log", authMiddleware, async (req, res) => {
  try {
    const logExists = await LogModel.findOne({ userId: req.body.userId });
    if (!logExists) {
      const newLogObj = {
        date: req.body.date,
        type: req.body.type,
        recordId: req.body.id,
        set: [],
      };
      const array = [];
      array.push(newLogObj);
      const newLog = new LogModel({
        userId: req.body.userId,
        logs: array,
      });
      await newLog.save();
      return res
        .status(200)
        .send({ message: "User log created successfully", success: true });
    }
    let existedLogArray = logExists.logs;
    const newLogObj = {
      date: req.body.date,
      type: req.body.type,
      recordId: req.body.id,
      set: [],
    };
    existedLogArray.unshift(newLogObj);
    await logExists.save();
    return res
      .status(200)
      .send({ message: "User log created successfully", success: true });
  } catch (error) {
    res.status(500).send({
      message: "Error getting user log",
      success: false,
      error,
    });
  }
});

router.post("/delete-log-by-id", authMiddleware, async (req, res) => {
  const { userId, newLogs } = req.body;
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

router.post("/update-training-by-date", authMiddleware, async (req, res) => {
  const { userId, newArray } = req.body;
  try {
    const updatedLogs = await LogModel.findOneAndUpdate(
      {
        userId: userId,
      },
      { logs: newArray },
      { new: true }
    );
    res.json(updatedLogs);
  } catch (error) {
    res.status(500).json({ error: "Could not update logs", details: error });
  }
});

router.post("/update-weight-by-training", authMiddleware, async (req, res) => {
  const { userId, newArray } = req.body;
  try {
    const updatedLogs = await LogModel.findOneAndUpdate(
      {
        userId: userId,
      },
      { logs: newArray },
      { new: true }
    );
    res.json(updatedLogs);
  } catch (error) {
    res.status(500).json({ error: "Could not update logs", details: error });
  }
});

router.post("/update-training-by-user", authMiddleware, async (req, res) => {
  const { userId, newArray } = req.body;
  try {
    const updatedLogs = await LogModel.findOneAndUpdate(
      {
        userId: userId,
      },
      { logs: newArray },
      { new: true }
    );
    res.json(updatedLogs);
  } catch (error) {
    res.status(500).json({ error: "Could not update logs", details: error });
  }
});

router.post("/delete-user-record", authMiddleware, async (req, res) => {
  const id = req.body.id;
  try {
    const log = await LogModel.findOneAndDelete({ userId: id });
    if (!log) return res.sendStatus(404);
    return res.send(user);
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;
