import React, { useState, useEffect, useContext } from "react";
import MoodTrackingForm from "./MoodTrackingForm";
import HealthTip from "./HealthTip";
import MoodAnalytics from "./MoodAnalytics";
import Chat from "./Chat";
import "./PatientDashboard.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import PatientChat from "./PatientChat";

const PatientDashboard = () => {
  const [openChat, setOpenChat] = useState(false);
  const { user, role, logout } = useContext(AuthContext);
  const URL = "http://localhost:3000" + "/ably/ably-auth";
  const ablyApiKey = import.meta.env.VITE_ABLY_API_KEY;

  const handleChatButton = () => {
    setOpenChat(!openChat);
  };

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <button>Profile</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <div className="dashboard-content">
        <div className="columns-wrapper">
          {" "}
          {/* Newly added div */}
          <div className="column-1">
            <MoodTrackingForm />
          </div>
          <div className="column-2">
            <div className="column-2-top">
              <HealthTip />
            </div>
            <div className="column-2-bottom">
              <MoodAnalytics />
            </div>
          </div>
        </div>{" "}
        {/* Close the wrapper div */}
        {openChat && (
          <div className="chat-window">
            <PatientChat />
            <button className="chat-minimize-button" onClick={handleChatButton}>
              Minimize
            </button>
          </div>
        )}
      </div>
      <button className="chat-float-button" onClick={handleChatButton}>
        Chat Support
      </button>
    </div>
  );
};

export default PatientDashboard;
