
import { useState } from 'react';
import './App.css';


function generateShortCode() {
  // Generates a random 6-character alphanumeric string
  return Math.random().toString(36).substring(2, 8);
}

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [customId, setCustomId] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urlMap, setUrlMap] = useState({});
  const [error, setError] = useState('');

  const [history, setHistory] = useState([]);

  const handleShorten = () => {
    setError('');
    if (!longUrl) {
      setError('Please enter a URL.');
      return;
    }
    let code = customId.trim();
    if (code === '') {
      // No custom ID provided, generate one
      let newCode;
      do {
        newCode = generateShortCode();
      } while (urlMap[newCode]); // Ensure uniqueness
      code = newCode;
    } else {
      // Custom ID provided, check for collision
      if (urlMap[code]) {
        setError('Custom ID already exists. Please choose another.');
        return;
      }
    }
    setUrlMap(prev => ({ ...prev, [code]: longUrl }));
    setShortUrl(window.location.origin + '/s/' + code);
    setHistory(prev => [{ code, longUrl }, ...prev].slice(0, 5));
  };

  return (
    <div className="App">
      <div className="url-shortener-container">
        <h1>URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter your long URL here"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          className="url-input"
        />
        <input
          type="text"
          placeholder="Custom unique ID (optional)"
          value={customId}
          onChange={e => setCustomId(e.target.value)}
          className="url-input"
        />
        <button onClick={handleShorten} className="shorten-btn">
          Shorten URL
        </button>
        {error && (
          <div className="error-message">{error}</div>
        )}
        {!shortUrl && !error && (
          <div className="before-shortening">
            <p>Enter a long URL and (optionally) a custom ID, then click <strong>Shorten URL</strong> to generate your short link.</p>
          </div>
        )}
        {shortUrl && !error && (
          <div className="after-shortening short-url-section">
            <strong>Shortened URL:</strong>
            <div>
              <a href={longUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            </div>
            <div style={{ marginTop: 8 }}>
              <span>Original URL: </span>
              <a href={longUrl} target="_blank" rel="noopener noreferrer">{longUrl}</a>
            </div>
          </div>
        )}
        {history.length > 0 && (
          <div className="history-section" style={{ marginTop: 24 }}>
            <h3>Past 5 Shortened URLs</h3>
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {history.map((item, idx) => (
                <li key={item.code} style={{ marginBottom: 10 }}>
                  <span style={{ fontWeight: 'bold' }}>Short:</span> <a href={window.location.origin + '/s/' + item.code} target="_blank" rel="noopener noreferrer">{window.location.origin + '/s/' + item.code}</a>
                  <br />
                  <span style={{ fontWeight: 'bold' }}>Original:</span> <a href={item.longUrl} target="_blank" rel="noopener noreferrer">{item.longUrl}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="info-text">
          This is a simple URL shortener app. Enter a long URL and click "Shorten URL" to generate a short link. Optionally, provide a custom unique ID.
        </p>
      </div>
    </div>
  );
}

export default App;