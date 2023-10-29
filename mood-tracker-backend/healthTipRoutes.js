const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const openai = require("openai");
const { OpenAI } = require("openai");
const Ably = require("ably");

// openai.apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// console.log(Object.keys(openai));

const realtime = new Ably.Realtime(process.env.ABLY_API_KEY);

async function generateHealthTip(moodData) {
  const prompt = `I am feeling ${moodData.moodType} and had a sleep quality rating of ${moodData.sleepQuality} and stress leval rating is ${moodData.stressLevel} and energy level of ${moodData.energyLevel} hours, provide me a relevant health tip. Between each tip add a double exclamatory mark "!!" and do not add any sequence number for each point/tip and no need to add the "!!" at the end. Also do not say you are an AI, not a doctor and no need to give anything like this "Remember, these tips are not meant to replace professional medical advice. It's always essential to consult with a healthcare professional for personalized recommendations and guidance".`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  //   console.log("chat resp: ", response);
  //   console.log("tip: ", response.choices[0].message.content);
  return response.choices[0].message.content;
}

router.get("/generate-tip/:id", async (req, res) => {
  //   console.log("inside generate tup");
  const userId = parseInt(req.params.id);
  try {
    const latestMood = await prisma.moodTrackingData.findFirst({
      where: {
        id: userId,
      },
      orderBy: { timeEntered: "desc" },
    });

    if (!latestMood) {
      return res.status(400).send({ error: "No mood trackdata found." });
    }
    const healthTip = await generateHealthTip(latestMood);

    await prisma.user.update({
      where: { id: latestMood.userId },
      data: { aiPredictiveData: healthTip },
    });

    const channel = realtime.channels.get(`health-tip-${latestMood.userId}`);
    channel.publish("tip", healthTip);

    res.send({ message: "Health tip generated an sent." });
  } catch (error) {
    console.error("Error generating tip:", error);
    res.status(500).send({ error: "Failed to generate health tip." });
  }
});

module.exports = router;
