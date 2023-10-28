import React, { useState, useEffect, useContext } from "react";
import { useChannel } from "ably/react";
import { AuthContext } from "../context/AuthContext";
import { useAbly } from "ably/react";

const PatientChat = () => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const { user } = useContext(AuthContext);
  const ably = useAbly();
  console.log("Ably instance:", ably);

  const channelName = `patient-${user.id}-chat`;

  const { channel } = useChannel(channelName, (message) => {
    if (message.name === "chat-message") {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    }
  });

  const sendMessage = () => {
    if (channel && messageContent) {
      channel.publish("chat-message", `Patient: ${messageContent}`);
      setMessageContent("");
      // Notify the professional's dashboard that a chat has started.
      const profChannel = ably.channels.get("professional-channel");
      if (profChannel) {
        profChannel.publish("chat-started", { patientId: user.id }, (err) => {
          if (err) {
            console.error("Error sending chat-started message:", err);
          } else {
            console.log("chat-started message sent successfully");
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
      <h2>Chat with Doctor</h2>
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
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

export default PatientChat;
