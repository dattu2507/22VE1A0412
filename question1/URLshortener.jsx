import React from "react";

function URLShortener() {
  return (
    <div>
      <h1>URL Shortener</h1>
        <p>Use this component to shorten URLs.</p>
        <input
          type="text"
          placeholder="Enter your long URL here"
        />
        <input
          type="text"
          placeholder="Custom unique ID (optional)"
        />
        <button>
          Shorten URL
        </button>
    </div>
  );
}

export default URLShortener;
