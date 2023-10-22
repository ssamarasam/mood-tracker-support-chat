const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./authRoutes");
const userProfileRoutes = require("./userProfileRoutes");
const userMoodRoutes = require("./userMoodRoutes");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
dotenv.config();

// Enable CORS
app.use(cors());

const ABLY_API_KEY = process.env.ABLY_API_KEY;

app.use("/auth", authRoutes);
app.use("/user-profile", userProfileRoutes);
app.use("/user-mood", userMoodRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to mood tracker and support.");
});

// app.get("/login", (req, res) => {
//   res.send("Welcome to mood tracker and support.");
// });

app.listen(port, () => {
  console.log("server is running at port ", port);
});

// const crypto = require("crypto");
// const secretKey = crypto.randomBytes(32).toString("hex");
// console.log(secretKey);
