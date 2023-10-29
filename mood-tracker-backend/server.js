const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./authRoutes");
// const ablyRoutes = require("./ablyRoutes");
const userProfileRoutes = require("./userProfileRoutes");
const userMoodRoutes = require("./userMoodRoutes");
const healthTipRoutes = require("./healthTipRoutes");
const port = process.env.PORT || 3000;
const app = express();
const Ably = require("ably");
const bodyParser = require("body-parser");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user-profile", userProfileRoutes);
app.use("/user-mood", userMoodRoutes);
// app.use("/ably", ablyRoutes);
app.use("/health-tip", healthTipRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to mood tracker and support.");
});

app.listen(port, () => {
  console.log("server is running at port ", port);
});

// const crypto = require("crypto");
// const secretKey = crypto.randomBytes(32).toString("hex");
// console.log(secretKey);
