require("dotenv").config();
const express = require("express");
const cors = require("cors");
const UserModel = require("./models/userModel");

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("The password is wrong");
        }
      } else {
        res.json("The user doesn't exist");
      }
    })
    .catch((error) => res.json(error));
});

app.post("/signup", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});

app.listen(5000, () => {
  console.log("Server is running");
});
