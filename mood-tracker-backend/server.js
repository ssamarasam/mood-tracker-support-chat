const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const cors = require("cors");
// const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const apiKey = process.env.ABLY_API_KEY;

const app = express();
// app.use("/", express.static(__dirname));

app.get("/", (req, res) => {
  res.send("Welcome to mood tracker and support.");
});

app.listen(port, () => {
  console.log("server is running at port ", port);
});
