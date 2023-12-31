import React, { useState, useEffect, useContext } from "react";
import { useChannel } from "ably/react";
import { AuthContext } from "../context/AuthContext";
import { useAbly } from "ably/react";
import ablyLogo from "../assets/ably-logo.png";

const PatientChat = () => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const { user } = useContext(AuthContext);
  const ably = useAbly();
  const [professionalLoggedIn, setProfessionalLoggedIn] = useState(false);

  const channelName = `patient-${user.id}-chat`;

  const { channel } = useChannel(channelName, (message) => {
    if (message.name === "chat-message") {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    }
  });

  useEffect(() => {
    const onPresenceChange = (presenceMsg) => {
      switch (presenceMsg.action) {
        case "enter":
          setProfessionalLoggedIn(true);
          break;
        case "leave":
          setProfessionalLoggedIn(false);
          break;
        default:
          break;
      }
    };

    channel.presence.subscribe(onPresenceChange);

    return () => channel.presence.unsubscribe(onPresenceChange);
  }, [channel]);

  const sendMessage = () => {
    if (channel && messageContent) {
      channel.publish("chat-message", {
        sender: "patient",
        text: `Patient: ${messageContent}`,
      });
      setMessageContent("");
      const profChannel = ably.channels.get("professional-channel");
      if (profChannel) {
        profChannel.publish("chat-started", { patientId: user.id }, (err) => {
          if (err) {
            console.error("Error sending chat-started msg:", err);
          } else {
            console.log("chat-started msg sent successfully");
          }
        });
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div>
      <div style={{ textAlign: "center", margin: "10px 0" }}>
        <img
          src={ablyLogo}
          alt="Ably"
          width="40"
          style={{ verticalAlign: "middle" }}
        />
        <span
          style={{
            fontSize: "1.1rem",
            marginLeft: "10px",
            verticalAlign: "middle",
          }}
        >
          Mood Tracker with Support - Powered by Ably
        </span>
      </div>
      <p
        style={{
          fontSize: "1.1rem",
          marginLeft: "10px",
          verticalAlign: "middle",
        }}
      >
        Chat with HealthCare Professional -{" "}
        {professionalLoggedIn ? (
          <span className="online-status">Online</span>
        ) : (
          <span className="offline-status">Offline</span>
        )}
      </p>
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form className="send-message" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Type a message"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default PatientChat;
