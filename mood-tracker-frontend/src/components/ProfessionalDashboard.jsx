import React, { useState, useEffect, useContext } from "react";
import { useChannel } from "ably/react";
import ProfessionalChat from "./ProfessionalChat";
import "./ProfessionalDashboard.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ProfessionalDashboard = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { logout } = useContext(AuthContext);

  const { channel } = useChannel("professional-channel", (message) => {
    if (message.name === "chat-started") {
      const patientId = message.data.patientId;

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

  const fetchPatientProfile = async (patientId) => {
    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const URL =
        backendURL + `/user-profile/get-user-data/${parseInt(patientId)}`;
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching patient details:", error);
      return null;
    }
  };

  const viewPatientProfile = async (patientId) => {
    const profile = await fetchPatientProfile(patientId);
    if (profile) {
      setSelectedProfile(profile);
    } else {
      console.log("error fetching patient profle details");
    }
    setSelectedChat(null);
  };

  return (
    <div>
      <div className="dashboard-header">
        <h3>HealthCare Professionals's Dashboard</h3>
        <button className="logout-button" onClick={() => logout()}>
          Logout
        </button>
      </div>

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
          <div className="profile-table">
            <h3>Patient Profile</h3>
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>ID</strong>
                  </td>
                  <td>{selectedProfile.id}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Name</strong>
                  </td>
                  <td>{selectedProfile.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Date of Birth</strong>
                  </td>
                  <td>{selectedProfile.dob}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phone</strong>
                  </td>
                  <td>{selectedProfile.phone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Emergency Contact Name</strong>
                  </td>
                  <td>{selectedProfile.emergencyContactName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Emergency Contact Phone</strong>
                  </td>
                  <td>{selectedProfile.emergencyContactPhone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Emergency Contact Relationship</strong>
                  </td>
                  <td>{selectedProfile.emergencyContactRelationship}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
