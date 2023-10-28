import React, { useState, useEffect } from "react";
import axios from "axios";
import MoodAnalyticsChart from "./MoodAnalyticsChart";

const MoodAnalytics = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const URL = "http://localhost:3000" + "/user-mood/get-mood-tracking-data";
    axios
      .get(URL)
      .then((response) => {
        setMoodData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Mood Analytics</h2>
      <MoodAnalyticsChart moodData={moodData} />
    </div>
  );
};

export default MoodAnalytics;
