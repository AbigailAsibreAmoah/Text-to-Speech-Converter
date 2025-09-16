import React from "react";

export default function TextInput({ text, setText }) {
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type your text here..."
      rows={5}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px",
        marginBottom: "15px"
      }}
    />
  );
}
