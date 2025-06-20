import React, { useEffect } from 'react';
import '../styles/FinalWhisper.css';

const FinalWhisper = () => {
  useEffect(() => {
    const createRainDrop = () => {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.height = `${14 + Math.random() * 18}px`;
      drop.style.opacity = `${0.15 + Math.random() * 0.25}`;
      drop.style.animationDuration = `${0.9 + Math.random() * 0.7}s`;
      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 2000);
    };
    const interval = setInterval(createRainDrop, 60);
    return () => clearInterval(interval); // Clean up
  }, []);

  return (
    <div className="container">
      <h1> Just a Quiet Thank You... 🌸</h1>

      <div className="message-box">
        <p>
          Once again... <strong>Happy Birthday, Madam ji. 🎉🌸</strong><br /><br />
          Thank you for turning these few digital pages into something meaningful.<br />
          Every word was chosen with care, every image placed with thought...<br /><br />
          You may never know how much this meant — and that’s okay.<br />
          Some feelings are best left as gentle whispers in time.<br /><br />
          <em>— With all respect and quiet admiration,<br />Sahil</em>
        </p>
        <button className="replay-button" onClick={() => window.location.href = '/'}>
          ↻ Replay Message
        </button>
      </div>
      <audio autoPlay loop>
        <source
          src={process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/music/stars.mp3' : '/music/stars.mp3'}
          type="audio/mp3"
        />
      </audio>
    </div>
  );
};

export default FinalWhisper;
