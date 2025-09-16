import React from "react";

export default function LanguageSelector({ language, setLanguage }) {
  const languages = ["English", "French", "German", "Korean"];
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
    >
      {languages.map((l) => <option key={l} value={l}>{l}</option>)}
    </select>
  );
}
