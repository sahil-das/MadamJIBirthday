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
      <h1>This Is Not Just Goodbye... 💫</h1>
      <div className="message-box">
        <p>
          Somewhere between memories and dreams,<br />
          you became the most beautiful chapter I never wrote.<br /><br />
          I loved you not because I could have you...<br />
          but because loving you made me feel alive in silence.
        </p>
        <div className="signature">– Avinash</div>
        <button className="replay-button" onClick={() => window.location.href = '/'}>
          ↻ Replay Message
        </button>
      </div>
      <audio autoPlay loop>
        <source
          src="https://www.chosic.com/wp-content/uploads/2021/12/Love-Inspiring-Piano.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default FinalWhisper;
