import { useState, useEffect } from 'react';

function DistractionBlocker() {
  const [websiteInput, setWebsiteInput] = useState('');
  const [websites, setWebsites] = useState([]);

  const fetchWebsites = () => {
    fetch('/api/blocked-websites')
      .then((response) => response.json())
      .then((data) => {
        setWebsites(data.blockedWebsites);
      })
      .catch((error) => console.error('Error fetching websites:', error));
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  const addWebsite = () => {
    if (websiteInput.trim() !== '') {
      fetch('/api/blocked-websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website: websiteInput.trim() }),
      })
        .then(() => {
          fetchWebsites();
          setWebsiteInput('');
        })
        .catch((error) => console.error('Error adding website:', error));
    }
  };

  const removeWebsite = (website) => {
    fetch('/api/blocked-websites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ website }),
    })
      .then(() => {
        fetchWebsites();
      })
      .catch((error) => console.error('Error removing website:', error));
  };

  return (
    <div className="distraction-blocker">
      <h2>Distraction Blocker</h2>
      <input
        type="text"
        placeholder="Enter website to block"
        value={websiteInput}
        onChange={(e) => setWebsiteInput(e.target.value)}
      />
      <button onClick={addWebsite}>Add Website</button>
      <ul id="websites">
        {websites.map((website, index) => (
          <li key={index}>
            {website}
            <button className="delete-btn" onClick={() => removeWebsite(website)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DistractionBlocker;