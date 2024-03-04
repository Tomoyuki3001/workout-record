require("dotenv").config();
const userRoute = require("./routes/userRoute");
const logRoute = require("./routes/logRoute");
const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/user", userRoute);
app.use("/api/log", logRoute);

app.listen(5000, () => {
  console.log("Server is running");
});
