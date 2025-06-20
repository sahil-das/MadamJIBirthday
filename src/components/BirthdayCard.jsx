import React, { useRef, useEffect } from "react";
import "../styles/BirthdayCard.css";

const FALLING_EMOJIS = [ "🌸", "💐", "💗", "🌷",, "🌹"];

const BirthdayCard = () => {
  const mainContainerRef = useRef(null);
  const [falling, setFalling] = React.useState([]);
  const [confetti, setConfetti] = React.useState([]);

  // Generate falling elements
  useEffect(() => {
    let running = true;
    function addFalling() {
      if (!running) return;
      setFalling(f => {
        // Limit the number of falling elements to 8 at a time
        const maxFalling = 1;
        const next = [
          ...f,
          {
            id: Math.random(),
            emoji: FALLING_EMOJIS[Math.floor(Math.random() * FALLING_EMOJIS.length)],
            left: Math.random() * 100,
            duration: 5 + Math.random() * 2
          }
        ];
        return next.length > maxFalling ? next.slice(next.length - maxFalling) : next;
      });
      setTimeout(addFalling, 400 + Math.random() * 400);
    }
    addFalling();
    return () => { running = false; };
  }, []);

  // Remove falling elements after animation
  useEffect(() => {
    if (!falling.length) return;
    const timeout = setTimeout(() => {
      setFalling(f => f.slice(1));
    }, 2000);
    return () => clearTimeout(timeout);
  }, [falling]);

  // Confetti
  useEffect(() => {
    setConfetti(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2
    })));
  }, []);

  const handleGiftClick = () => {
    if (mainContainerRef.current) {
      mainContainerRef.current.classList.add('fade-out');
    }
    setTimeout(() => {
      window.location.href = '/letter'; // Use React Router for SPA navigation
    }, 1000);
  };

  return (
    <div  className="birthday-body ">
    

      <div className="main-container" ref={mainContainerRef}>
        <div className="fancy-banner">
          <div className="ribbon-left">🎀</div>
          <h2>
            Happy Birthday Khushi ji <span className="heart"></span>
          </h2>
          <div className="ribbon-right">🎀</div>
        </div>

        <div
          className="gift-icon"
          tabIndex={0}
          title="Open your surprise!"
          onClick={handleGiftClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleGiftClick();
            }
          }}
        >
          <div className="gift-box">
            <div className="gift-lid"></div>
            <div className="gift-bow">
              <div className="bow-left"></div>
              <div className="bow-right"></div>
            </div>
            <div className="gift-body"></div>
          </div>
          <span className="gift-label">I made this just for you – open the gift 🎁✨</span>
        </div>

        <div className="cake-container">
          <div className="cake">
            <div className="layer layer-1">
              <div className="frosting"></div>
              <div className="frosting" style={{ left: '40px' }}></div>
              <div className="frosting" style={{ right: '40px' }}></div>
            </div>
            <div className="layer layer-2">
              <div className="frosting"></div>
              <div className="frosting" style={{ left: '35px' }}></div>
              <div className="frosting" style={{ right: '35px' }}></div>
            </div>
            <div className="layer layer-3">
              <div className="frosting"></div>
              <div className="frosting" style={{ left: '30px' }}></div>
              <div className="frosting" style={{ right: '30px' }}></div>
              <div className="candle">
                <div className="flame"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="falling-elements">
          {falling.map(f => (
            <span
              key={f.id}
              style={{
                left: `${f.left}%`,
                animationDuration: `${f.duration}s`
              }}
            >{f.emoji}</span>
          ))}
        </div>
        <div className="confetti">
          {confetti.map(c => (
            <span
              key={c.id}
              style={{
                left: `${c.left}%`,
                animationDelay: `${c.delay}s`
              }}
            ></span>
          ))}
        </div>
        <div className="sparkle" style={{ top: '10%', left: '20%' }}></div>
        <div className="sparkle" style={{ top: '50%', left: '80%' }}></div>
        <div className="sparkle" style={{ top: '70%', left: '40%' }}></div>
        <div className="heart-float" style={{ bottom: '20px', left: '60%' }}>💗</div>
      </div>
    </div>
  );
};

export default BirthdayCard;
