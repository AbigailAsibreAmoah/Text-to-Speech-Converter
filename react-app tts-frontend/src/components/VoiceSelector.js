import React from "react";

export default function VoiceSelector({ voice, setVoice }) {
  const voices = ["Joanna (Female, US)", "Matthew (Male, US)", "Amy (Female, UK)", "Brian (Male, UK)"];
  return (
    <select
      value={voice}
      onChange={(e) => setVoice(e.target.value)}
      style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginRight: "10px" }}
    >
      {voices.map((v) => <option key={v} value={v}>{v}</option>)}
    </select>
  );
}
