import React, { useState, useEffect, useContext } from "react";
import { useChannel } from "ably/react";
import { AuthContext } from "../context/AuthContext";
import { useAbly } from "ably/react";

const ProfessionalChat = ({ patientId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const { user } = useContext(AuthContext);

  const channelName = `patient-${patientId}-chat`;

  const { channel } = useChannel(channelName, (message) => {
    if (message.name === "chat-message") {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message.data]);
    }
  });

  const sendMessage = () => {
    if (channel && messageContent) {
      channel.publish("chat-message", `Doctor: ${messageContent}`);
      setMessageContent("");
    }
  };

  useEffect(() => {
    if (channel) {
      channel.on("detached", () => {
        console.log("Channel was detached. Attempting to reattach...");
        channel.attach();
      });

      channel.on("attached", () => {
        console.log("Successfully reattached to the channel.");
        channel.history((err, page) => {
          if (err) {
            console.error("Failed to fetch channel history:", err);
            return;
          }
          const historicalMessages = page.items.map((item) => item.data);
          setMessages(historicalMessages);
        });
      });

      // Initially attaching to the channel
      channel.attach((err) => {
        if (err) {
          console.error("Failed to attach to channel:", err);
        }
      });
    }

    return () => {
      if (channel) {
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
      <h2>Chat with Patient {patientId}</h2>
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

export default ProfessionalChat;
