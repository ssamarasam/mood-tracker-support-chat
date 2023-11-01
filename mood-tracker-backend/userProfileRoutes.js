const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/get-healthcareProfessional", async (req, res) => {
  try {
    const professional = await prisma.user.findFirst({
      where: {
        role: "HealthCare Professional",
      },
    });

    if (!professional) {
      return res.status(404).json({
        message: "No healthcare professional found.",
      });
    }

    res.status(200).json(professional);
  } catch (err) {
    console.error("Error fetching healthcare professional: ", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/signup", async (req, res) => {
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

router.get("/get-user-data/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("catch error: ", err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});

module.exports = router;
