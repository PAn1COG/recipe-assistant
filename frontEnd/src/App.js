// src/App.js
import React from 'react';
import Chat from './components/chat';
import ChatWithSpeech from './components/chatWithSpeech';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <Routes>
                        <Route path='/' element = {<Chat/>}/>
                        <Route path='/chatWithSpeech' element = {<ChatWithSpeech/>}/>
                    </Routes>
                </Router>
            </header>
        </div>
    );
}

export default App;
