const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new user profile
router.post("/signup", async (req, res) => {
  console.log("auth routes entry succesfull");
  const {
    email,
    password,
    role,
    name,
    gender,
    dob,
    phone,
    emergencyContactName,
    emergencyContactPhone,
    emergencyContactRelationship,
    healthCareCode,
    professionalSpecialization,
    aiPredictiveData,
  } = req.body;

  console.log("email: ", email);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
        name,
        gender,
        dob,
        phone,
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelationship,
        healthCareCode,
        professionalSpecialization,
        aiPredictiveData,
      },
    });
    console.log("created user: ", user);
    res.status(201).json(user);
  } catch (err) {
    console.log("catch error: ", err);
    if (err.code === "P2002") {
      res.json({
        message: "Unique Constraint Error",
      });
    } else {
      res.json({
        message: "Other Server Error",
      });
    }
  }
});

// Read user profile
router.get("/:id", (req, res) => {
  // Implement the logic to read a user profile by ID
});

// Update user profile
router.put("/:id", (req, res) => {
  // Implement the logic to update a user profile by ID
});

// Delete user profile
router.delete("/:id", (req, res) => {
  // Implement the logic to delete a user profile by ID
});

module.exports = router;
