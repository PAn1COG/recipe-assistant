// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition';
import '../css/chatWithSpeech.css'


const ChatWithSpeech = () => {

    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            const response = await axios.post('http://localhost:4000/chatGPT', {
                context,
                message,
                conversation
            });
            // console.log(response.data.response);
            const newMessages = response.data.response;
            // Update the conversation state by concatenating new messages
            setConversation(newMessages);
            setMessage('');

            console.log(conversation);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (transcript.includes("search on GPT")) {
            setMessage(transcript);
        }
    }, [transcript]);

    useEffect(() => {
        if (!listening) {
            sendMessage();
        }
    }, [listening]);

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
                    conversation.map((msg, index) => (
                        <div key={index} className={`message ${msg.role}`}>
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
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>

    );
};
export default ChatWithSpeech;
