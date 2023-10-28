import React, { useState, useEffect, useContext } from "react";
import { useChannel } from "ably/react";
import { AuthContext } from "../context/AuthContext";
import { useAbly } from "ably/react";

const Chat = ({ context, patientId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const { user, healthcareProfessionalUserId } = useContext(AuthContext);
  const ably = useAbly();

  console.log("patient id: ", patientId);
  let channelName;
  if (context === "patient") {
    channelName = `chat-${user.id}-${healthcareProfessionalUserId}`;
  } else if (context === "healthcare-professional" && patientId) {
    channelName = `chat-${patientId}-${user.id}`;
  }

  const { channel } = useChannel(channelName, (message) => {
    if (message.name === "chat-message") {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    }
  });

  const sendMessage = () => {
    if (channel && messageContent) {
      channel.publish("chat-message", messageContent);
      setMessageContent("");
      if (context === "patient") {
        channel.publish("chat-started", { patientId: user.id });
      }
    }
    console.log("messageContent: ", messageContent);
  };

  useEffect(() => {
    if (context === "patient" && channel && ably && ably.client) {
      const profChannel = ably.client.channels.get("professional-channel");
      if (profChannel) {
        profChannel.publish("chat-started", { patientId: user.id });
      }
    }
  }, [channel, context, user.id]);

  return (
    <div>
      <h2>
        {context === "patient"
          ? "Chat with Doctor"
          : `Chat with Patient ${patientId}`}
      </h2>
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className="send-message">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
