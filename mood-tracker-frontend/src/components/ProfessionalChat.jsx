import React, { useState, useEffect, useContext } from "react";
import { useChannel } from "ably/react";
import { AuthContext } from "../context/AuthContext";
import { useAbly } from "ably/react";
import "./ProfessionalChat.css";
import ablyLogo from "../assets/ably-logo.png";

const ProfessionalChat = ({ patientId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const { user } = useContext(AuthContext);

  const channelName = `patient-${patientId}-chat`;

  const { channel } = useChannel(channelName, (message) => {
    if (message.name === "chat-message") {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    }
  });

  const sendMessage = () => {
    if (channel && messageContent) {
      channel.publish("chat-message", {
        sender: "doctor",
        text: `Doctor: ${messageContent}`,
      });
      setMessageContent("");
    }
  };

  useEffect(() => {
    if (channel) {
      channel.presence.enter();
      channel.on("detached", () => {
        channel.attach();
      });

      channel.on("attached", () => {
        channel.history((err, page) => {
          if (err) {
            console.error("channel history fetch failed:", err);
            return;
          }
          const historicalMessages = page.items.map((item) => item.data);
          setMessages(historicalMessages);
        });
      });

      channel.attach((err) => {
        if (err) {
          console.error("channel attach failed:", err);
        }
      });
    }

    return () => {
      if (channel) {
        channel.presence.leave();
        channel.detach();
        channel.off("detached");
        channel.off("attached");
      }
    };
  }, [channel]);

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
        Chat with Patient {patientId}
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
          placeholder="Type a message..."
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ProfessionalChat;
