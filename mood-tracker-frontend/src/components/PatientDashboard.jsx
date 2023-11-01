import React, { useState, useEffect, useContext } from "react";
import MoodTrackingForm from "./MoodTrackingForm";
import HealthTip from "./HealthTip";
import "./PatientDashboard.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import PatientChat from "./PatientChat";

const PatientDashboard = () => {
  const [openChat, setOpenChat] = useState(false);
  const { user, role, logout } = useContext(AuthContext);

  const handleChatButton = () => {
    setOpenChat(!openChat);
  };

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <h3>Patient Dashboard</h3>
        <button className="logout-button" onClick={() => logout()}>
          Logout
        </button>
      </div>
      <div className="dashboard-content">
        <div className="columns-wrapper">
          <div className="column-1">
            <MoodTrackingForm />
          </div>
          <div className="column-2">
            <div className="column-2-top">
              <HealthTip />
            </div>
          </div>
        </div>
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
