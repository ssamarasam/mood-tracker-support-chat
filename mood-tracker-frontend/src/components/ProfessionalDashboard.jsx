import React, { useState, useEffect, useContext } from "react";
import { useChannel } from "ably/react";
import ProfessionalChat from "./ProfessionalChat";
import "./PatientDashboard.css";
import { AuthContext } from "../context/AuthContext";

const ProfessionalDashboard = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { logout } = useContext(AuthContext);

  const { channel } = useChannel("professional-channel", (message) => {
    console.log("Received message on professional channel: ", message);
    if (message.name === "chat-started") {
      const patientId = message.data.patientId;
      console.log("Received chat-started for patientId:", patientId);

      if (!activeChats.includes(patientId)) {
        setActiveChats((prevChats) => [...prevChats, patientId]);
      } else {
        console.log("Patient already in active chats.");
      }
    } else {
      console.log("Received unexpected message:", message.name);
    }
  });

  const viewChat = (patientId) => {
    setSelectedChat(patientId);
    setSelectedProfile(null);
  };

  const viewPatientProfile = (patientId) => {
    setSelectedProfile(patientId);
    setSelectedChat(null);
  };

  return (
    <div>
      <h2>
        HealthCare Professionals's Dashboard
        <div className="dashboard-header">
          <button className="logout-button" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </h2>

      <div className="chat-listing">
        <h3>Active Chats</h3>
        <ul>
          {activeChats.map((patientId) => (
            <li key={patientId}>
              <button onClick={() => viewChat(patientId)}>
                Chat with Patient {patientId}
              </button>
              <button onClick={() => viewPatientProfile(patientId)}>
                View Profile
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-view">
        {selectedChat && <ProfessionalChat patientId={selectedChat} />}

        {selectedProfile && (
          <div className="profile-container">
            <h3>Patient Profile</h3>
            <p>ID: </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
