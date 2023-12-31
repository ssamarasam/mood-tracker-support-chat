const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const verifyToken = require("./authMiddleware");
const JWT_SECRET_KEY = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("user not found");
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      console.log("pwd not correct");
      return res.status(401).json({ message: "Auth failed" });
    }
    if (user) {
      const { password, ...userObjWithoutPassword } = user;

      const token = jwt.sign({ user: userObjWithoutPassword }, JWT_SECRET_KEY);
      // console.log("auth sucecssful, user found, token generated");
      res.json({ token });
    }
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
