const express = require("express");
const router = express.Router();

router.post("/add-mood-tracking-data", async (req, res) => {
  const {
    moodType,
    moodSeverity,
    timeEntered,
    sleepQuality,
    stressLevel,
    energyLevel,
    physicalHealthIssue,
    emotionalStateIssue,
    triggeringEvents,
    userId,
  } = req.body;

  try {
    const moodData = await prisma.moodTrackingData.create({
      data: {
        moodType,
        moodSeverity,
        timeEntered,
        sleepQuality,
        stressLevel,
        energyLevel,
        physicalHealthIssue,
        emotionalStateIssue,
        triggeringEvents,
        userId,
      },
    });
    console.log("created mood data: ", moodData);
    res.status(201).json(moodData);
  } catch (err) {
    console.log("Error while adding mood trackdata: ", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/get-mood-tracking-data/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const moodDataList = await prisma.moodTrackingData.findMany({
      where: {
        userId: userId,
      },
    });

    if (!moodDataList.length) {
      return res.status(404).json({
        message: "No mood tracking data found.",
      });
    }

    res.status(200).json(moodDataList);
  } catch (err) {
    console.log("Error fetching mood trackin data: ", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
