const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new UserModel(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User doesn't exist", success: false });
    }
    const pwMatch = await bcrypt.compare(req.body.password, user.password);
    if (!pwMatch) {
      return res
        .status(200)
        .send({ message: "The password is wrong", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
      res
        .status(200)
        .send({ message: "Successful", success: true, data: token });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error login process", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User doesn't exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting about the user information",
      success: false,
      error,
    });
  }
});

router.post("/update-profile", authMiddleware, async (req, res) => {
  try {
    const doctor = await UserModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );

    res.status(200).send({
      success: true,
      message: "The doctor plofile updated successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting the doctor information",
      success: false,
      error,
    });
  }
});

module.exports = router;
