import React from "react";

function CustomId({ customId, setCustomId }) {
  return (
    <input
      type="text"
      placeholder="Custom unique ID (optional)"
      value={customId}
      onChange={(e) => setCustomId(e.target.value)}
    />
  );
}

export default CustomId;
