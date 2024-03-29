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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).send({
        message: "Successful",
        success: true,
        data: token,
        user: user,
      });
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

router.post("/update-user-profile", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.id });
    user.name = req.body.name;
    user.email = req.body.email;
    user.weight = req.body.weight;
    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/delete-user", authMiddleware, async (req, res) => {
  const id = req.body.id;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) return res.sendStatus(404);
    return res.send(user);
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;
