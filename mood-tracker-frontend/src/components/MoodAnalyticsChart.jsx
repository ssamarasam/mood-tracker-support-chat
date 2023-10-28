import React from "react";
import { Line } from "react-chartjs-2";

const MoodAnalyticsChart = ({ moodData }) => {
  const timeLabels = moodData.map((item) => item.timeEntered);
  const moodScores = moodData.map((item) => item.moodSeverity);
  const sleepQuality = moodData.map((item) => item.sleepQuality);
  const stressLevel = moodData.map((item) => item.stressLevel);
  const energyLevel = moodData.map((item) => item.energyLevel);

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: "Mood Severity",
        data: moodScores,
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Sleep Quality",
        data: sleepQuality,
        borderColor: "red",
        fill: false,
      },
      {
        label: "Stress Level",
        data: stressLevel,
        borderColor: "green",
        fill: false,
      },
      {
        label: "Energy Level",
        data: energyLevel,
        borderColor: "orange",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time Entered",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MoodAnalyticsChart;
