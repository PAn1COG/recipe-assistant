// src/components/Chat.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { v4 as uuidv4 } from "uuid";
import "../css/chatWithSpeech.css";

const ChatWithSpeech = () => {
  let voices = window.speechSynthesis.getVoices();
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [pauseTimeout, setPauseTimeout] = useState(true);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const navigate = useNavigate();
  if (!browserSupportsSpeechRecognition) {
    alert("Browser does not support");
    navigate("/");
  }
  const context = "You are a chef";
  const sendMessage = async () => {
    try {
      console.log("in SendMessage");
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
      console.log(response.data.response);
      let filteredContent = response.data.response
        .reverse()
        .find((item) => item.role === "assistant");
      const speech = new SpeechSynthesisUtterance();
      const longSpeech = new SpeechSynthesisUtterance(
        "Plase Read the content I found for you!"
      );
      speech.text = filteredContent.content;
      speech.voice = voices[4];
      longSpeech.voice = voices[4];
      console.log(voices);
      if (filteredContent.content.length > 400) {
        SpeechRecognition.stopListening();
        window.speechSynthesis.speak(longSpeech);
      } else {
        SpeechRecognition.stopListening();
        window.speechSynthesis.speak(speech);
      }
      filteredContent = {};

      // Update the conversation state by concatenating new messages
      setConversation(newMessages);
      setMessage("");
      resetTranscript();
      speech.onend = () => {
        SpeechRecognition.startListening({ continuous: true });
      };
      longSpeech.onend = () => {
        SpeechRecognition.startListening({ continuous: true });
      };
      // console.log(conversation);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening]);

  useEffect(() => {
    if (transcript.includes("search on GPT")) {
      const newMessage = transcript.replace("search on GPT", "").trim();
      setMessage(newMessage);
      console.log(newMessage);
      console.log("stopping listen");
      SpeechRecognition.stopListening();
    } else {
      // If trigger phrase not detected, stop listening after 10 seconds
      const timer = setTimeout(() => {
        setMessage(transcript);
        if (message !== "") {
          console.log("stopping listen");
          SpeechRecognition.stopListening();
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [transcript, message]);

  useEffect(() => {
    if (!listening && message !== "") {
      sendMessage();
      // SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening, message]);

  return (
    <div className="chat-container">
      <h2>Recipie Assistant</h2>
      <div>
        <p>Microphone:{listening ? "on" : "off"}</p>
        <p>{transcript}</p>
      </div>
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
          {isLoading ? "Sending..." : "speak to talk"}
      </div>
    </div>
  );
};
export default ChatWithSpeech;
