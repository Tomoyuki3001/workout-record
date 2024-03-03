const express = require("express");
const router = express.Router();
const RecordModel = require("../models/recordModel");
const authMiddleware = require("../middleware/authMiddleware");

// router.get("/get-record-by-date", authMiddleware, async (req, res) => {
//   console.log("date", req.body.date);
//   try {
//     const record = await RecordModel.findOne({ date: req.body.date });
//     res.status(200).send({
//       message: "The record fetched successfully",
//       success: true,
//       data: record,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error fetching the record",
//       success: false,
//       error,
//     });
//   }
// });

router.post("/get-record-by-date", authMiddleware, async (req, res) => {
  // console.log("value", req.body);
  const recordFromTheDate = await RecordModel.findOne({ date: req.body.date });
  if (!recordFromTheDate) {
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
  }
  res.status(200).send({
    message: "The record fetched successfully",
    success: true,
    data: recordFromTheDate,
  });
});

module.exports = router;
