// App.tsx
"use client"

import React, { useState } from 'react';
import TranslationModal from '../TranslationModal';
import axios from 'axios';
import './App.css'; // Import a CSS file for styling

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [inputLanguage, setInputLanguage] = useState<string>('en'); // Default input language
  const [outputLanguage, setOutputLanguage] = useState<string>('es'); // Default output language

  const translateText = async () => {
    if (!text) {
      alert("Please enter text to translate.");
      return;
    }
    try {
      const response = await axios.post('https://api-inference.huggingface.co/models/facebook/m2m100_418M', {
        inputs: text,
        parameters: {
          source_lang: inputLanguage,
          target_lang: outputLanguage,
        },
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`, // Use the environment variable
        },
      });

      setTranslatedText(response.data[0].translation_text);
      setModalVisible(true);
    } catch (error) {
      console.error("Translation error:", error);
      alert("An error occurred while translating. Please try again.");
    }
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const spokenText = event.results[0][0].transcript;
      setText(spokenText);
    };
    recognition.start();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Zacasa</h1>
        <div className="nav-icons">
          <button className="nav-icon" aria-label="Messages">
            {/* <span role="img" aria-label="Messages">✉️</span> */}
          </button>
          <button className="nav-icon" aria-label="Profile">
            <span role="img" aria-label="Profile">👤</span>
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="language-selection">
          <select value={inputLanguage} onChange={(e) => setInputLanguage(e.target.value)} className="language-dropdown">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="vi">Vietnamese</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            {/* Add more languages as needed */}
          </select>

          <select value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)} className="language-dropdown">
            <option value="es">Spanish</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="vi">Vietnamese</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        <input
          type="text"
          placeholder="Type or speak text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={translateText}>Translate</button>
        <button onClick={startListening}>Start Voice Recognition</button>
      </main>

      {modalVisible && (
        <TranslationModal 
          translatedText={translatedText} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default App;
