import React, { useEffect, useState, useContext } from "react";
import Ably from "ably";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function HealthTip() {
  const [healthTip, setHealthTip] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHealthTip = async () => {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const URL = `${backendURL}/health-tip/generate-tip/${user.id}`;

      try {
        const response = await axios.get(URL);
        const data = response.data;

        // if (data && data.message === "Health tip generated and sent.") {
        //   setHealthTip(data.message);
        // }
      } catch (error) {
        console.error("Error fetching health tip:", error);
      }
    };

    fetchHealthTip();
    const ablyApiKey = import.meta.env.VITE_ABLY_API_KEY;
    const ably = new Ably.Realtime(ablyApiKey);
    const channel = ably.channels.get(`health-tip-${user.id}`);

    channel.subscribe("tip", (message) => {
      console.log("message via channel: ", message.data);
      setHealthTip(message.data);
    });

    return () => {
      channel.unsubscribe();
      ably.close();
    };
  }, [user.id]);

  return (
    <div className="health-tip-container">
      <h4>Health Tip:</h4>
      {/* <p>{healthTip}</p> */}
      {healthTip.length > 0 ? (
        healthTip
          .split("!!")
          .map((tip, i) => <p key={i}>{`${i + 1} -  ${tip}`}</p>)
      ) : (
        <p>Let us know how are you feeling now to get health tip!</p>
      )}
    </div>
  );
}

export default HealthTip;
