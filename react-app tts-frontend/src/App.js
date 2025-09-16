import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("Joanna"); // default female American
  const [language, setLanguage] = useState("en-US");
  const [audioUrl, setAudioUrl] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return alert("Please enter text!");

    // Call your backend API
    try {
      const response = await fetch(
        "https://eajoomar0d.execute-api.us-east-1.amazonaws.com/prod/speak",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, voice, language }),
        }
      );
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }
      
      // Get the response data
      const responseData = await response.json();
      console.log('Response data:', responseData);
      
      // Convert base64 to blob
      try {
        const binaryString = atob(responseData.audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'audio/mpeg' });
        console.log('Blob size:', blob.size);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setTranslatedText(responseData.translatedText);
        
        // Auto-play the audio
        setTimeout(() => {
          const audio = document.querySelector('audio');
          if (audio) {
            audio.play().catch(e => console.log('Autoplay blocked:', e));
          }
        }, 100);
      } catch (error) {
        console.error('Error converting base64 to audio:', error);
        throw new Error('Failed to process audio data');
      }
    } catch (err) {
      console.error('Full error:', err);
      console.error('Error message:', err.message);
      alert(`Error generating speech: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Text-to-Speech Converter</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <div className="controls">
          <div>
            <label>Voice:</label>
            <select value={voice} onChange={(e) => setVoice(e.target.value)}>
              <option value="Joanna">Female - American</option>
              <option value="Matthew">Male - American</option>
              <option value="Amy">Female - British</option>
              <option value="Brian">Male - British</option>
            </select>
          </div>

          <div>
            <label>Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en-US">English - US</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="ko-KR">Korean</option>
            </select>
          </div>
        </div>

        <button type="submit">Convert to Speech</button>
      </form>

      {translatedText && translatedText !== text && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8fafc", borderRadius: "10px" }}>
          <h3>Translation:</h3>
          <p style={{ fontStyle: "italic", color: "#64748b" }}>{translatedText}</p>
        </div>
      )}
      
      {audioUrl && (
        <div className="audio-player">
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default App;
