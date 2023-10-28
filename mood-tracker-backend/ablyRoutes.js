const express = require("express");
require("dotenv").config();
const router = express.Router();
const Ably = require("ably");
const ABLY_API_KEY = process.env.ABLY_API_KEY;
console.log("ably keys1: ", ABLY_API_KEY);

const realtime = new Ably.Realtime(ABLY_API_KEY);

const generateAblyToken = (clientId, role) => {
  console.log("Generating token for clientId:", clientId, "with role:", role);

  return new Promise((resolve, reject) => {
    let capabilities = {};

    if (role === "Patient") {
      capabilities = {
        [`chat-${clientId}`]: ["subscribe"],
      };
    } else if (role === "HealthCare Professional") {
      // Updated the role to start with a capital 'D'
      capabilities = {
        [`chat-${clientId}`]: ["publish", "subscribe"],
      };
    }
    console.log("capabilities: ", capabilities);
    const tokenParams = {
      clientId: clientId.toString(),
      capability: JSON.stringify(capabilities),
    };

    realtime.auth.createTokenRequest(tokenParams, (err, tokenRequest) => {
      if (err) {
        console.error("Error generating token:", err);
        reject(err);
      } else {
        console.log("Token generation successful:", tokenRequest);
        resolve(tokenRequest);
      }
    });
  });
};

router.post("/ably-auth", async (req, res) => {
  console.log(
    "Attempting Ably auth with userId:",
    req.body.userId,
    "and role:",
    req.body.role
  );

  try {
    const clientId = req.body.userId;
    const role = req.body.role;

    if (!clientId || !role) {
      return res.status(400).send("userId and role are required.");
    }

    const token = await generateAblyToken(clientId, role);
    res.json(token);
  } catch (err) {
    console.error("Error during Ably auth:", err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
