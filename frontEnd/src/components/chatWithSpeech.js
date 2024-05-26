// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition';
import { v4 as uuidv4 } from 'uuid';
import '../css/chatWithSpeech.css'


const ChatWithSpeech = () => {

    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [pauseTimeout, setPauseTimeout] = useState(true);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const navigate = useNavigate();
    if(!browserSupportsSpeechRecognition){
        alert("Browser does not support");
        navigate('/');
    };    
    const context = "You are a chef"
    const sendMessage = async () => {
        try {
            console.log("in SendMessage");
            setIsLoading(true);
            const response = await axios.post('http://localhost:4000/chatGPT', {
                context,
                message,
                conversation
            });
            const newMessages = response.data.response.map((msg, index) => ({
                id: uuidv4(),
                content: msg.content,
                role: msg.role
            }));
            console.log(response.data.response);
            // Update the conversation state by concatenating new messages
            setConversation(newMessages);
            setMessage('');
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
            // console.log(conversation);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!listening) {
            SpeechRecognition.startListening({ continuous: true });
            console.log(conversation);
        }
    }, [listening]);

    useEffect(() => {
        if (transcript.includes("search on GPT")) {
            const newMessage = transcript.replace("search on GPT", "").trim();
            setMessage(newMessage);
            console.log(newMessage);
            console.log("stopping listen");
            SpeechRecognition.stopListening();
        }
    }, [transcript]);

    useEffect(() => {
        if (!listening && message!=="") {
            sendMessage();
        }
    }, [listening, message]);


    return (
        <div className="chat-container">
            <h2>ChatGPT Chat</h2>
            <div>
                <p>Microphone:{listening? 'on':'off'}</p>
                <button onClick={SpeechRecognition.startListening}>Start</button>
                <p>{transcript}</p>
            </div>
            <div className="message-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    conversation.map((msg) => (
                        <div key={msg.id} className={`message ${msg.role}`}>
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
                    placeholder="Type a message..."
                />
                <button disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>

    );
};
export default ChatWithSpeech;
