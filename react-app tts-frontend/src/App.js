import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("Joanna"); // default female American
  const [language, setLanguage] = useState("en-US");
  const [audioUrl, setAudioUrl] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  
  // SSML Controls
  const [speed, setSpeed] = useState("1.0");
  const [audioBlob, setAudioBlob] = useState(null);

  // Add spiral elements to DOM
  React.useEffect(() => {
    const spirals = ['spiral-1', 'spiral-2', 'spiral-3', 'spiral-4', 'spiral-5'];
    spirals.forEach(className => {
      if (!document.querySelector(`.${className}`)) {
        const spiral = document.createElement('div');
        spiral.className = className;
        document.body.appendChild(spiral);
      }
    });
  }, []);

  const handleDownload = () => {
    if (!audioBlob) return;
    
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speech-${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!audioBlob) return;
    
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([audioBlob], 'speech.mp3', { type: 'audio/mpeg' })] })) {
      try {
        await navigator.share({
          title: 'Generated Speech',
          text: 'Check out this text-to-speech audio!',
          files: [new File([audioBlob], 'speech.mp3', { type: 'audio/mpeg' })]
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      // Fallback: copy audio URL to clipboard
      const url = URL.createObjectURL(audioBlob);
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Audio link copied to clipboard!');
      } catch (err) {
        alert('Sharing not supported on this device. Use the download button instead.');
      }
      URL.revokeObjectURL(url);
    }
  };

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
          body: JSON.stringify({ 
            text, 
            voice, 
            language,
            speed
          }),
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
        setAudioBlob(blob);
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
        <div className="word-counter">
          {text.length} / 2500 characters
        </div>

        <div className="controls">
          <div>
            <label>Voice:</label>
            <select value={voice} onChange={(e) => setVoice(e.target.value)}>
              <option value="Joanna">🇺🇸 Joanna (Female)</option>
              <option value="Matthew">🇺🇸 Matthew (Male)</option>
              <option value="Amy">🇬🇧 Amy (Female)</option>
              <option value="Brian">🇬🇧 Brian (Male)</option>
            </select>
          </div>

          <div>
            <label>Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en-US">🇺🇸 English (US)</option>
              <option value="fr-FR">🇫🇷 French</option>
              <option value="de-DE">🇩🇪 German</option>
              <option value="ko-KR">🇰🇷 Korean</option>
            </select>
          </div>
        </div>

        <div className="ssml-controls">
          <h3>Voice Settings</h3>
          
          <div className="controls">
            <div>
              <label>Speed:</label>
              <select value={speed} onChange={(e) => setSpeed(e.target.value)}>
                <option value="0.25">0.25x</option>
                <option value="0.5">0.5x</option>
                <option value="1.0">1.0x</option>
                <option value="1.5">1.5x</option>
                <option value="2.0">2.0x</option>
              </select>
            </div>
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
          <div className="audio-actions">
            <button type="button" className="download-btn" onClick={handleDownload}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                <path d="M12,11L16,15H13V19H11V15H8L12,11Z"/>
              </svg>
              Download
            </button>
            <button type="button" className="share-btn" onClick={handleShare}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"/>
              </svg>
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
