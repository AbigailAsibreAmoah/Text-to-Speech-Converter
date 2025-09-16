import React from "react";

export default function AudioPlayer({ audioUrl }) {
  if (!audioUrl) return null;
  return (
    <audio controls style={{ marginTop: "20px", width: "100%" }} src={audioUrl}></audio>
  );
}
