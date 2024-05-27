// src/components/Chat.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/chat.css";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context = "You are a chef";
  const sendMessage = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:4000/chatGPT", {
        context,
        message,
        conversation,
      });
      const newMessages = response.data.response.map((msg, index) => ({
        id: uuidv4(),
        content: msg.content,
        role: msg.role,
      }));
      // console.log(response.data.response);

      // Update the conversation state by concatenating new messages

      setConversation(newMessages);
      setMessage("");
      
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2>Recipie Assistant</h2>
      <div className="message-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          conversation.map((msg) => (
            <div key={msg.id} class={`message ${msg.role}`}>
              <p>{msg.content}</p>
            </div>
          ))
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
      <div>
        <Link to={"/chatWithSpeech"}>Have Dirty Hands?</Link>
      </div>
    </div>
  );
};

export default Chat;
