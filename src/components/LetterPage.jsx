import React, { useEffect, useRef, useState } from "react";
import "../styles/LetterPage.css";
import { useNavigate } from "react-router-dom";

export default function LetterPage() {
  const [showLetter, setShowLetter] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [hintFade, setHintFade] = useState(false);
  const [pageFade, setPageFade] = useState(false);
  const navigate = useNavigate();
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const letterRef = useRef(null);

  const message = `Dear Madam ji, 💖\n\nOn this special day, I just wanted you to know...\n\nEven though you were never mine, my heart beats with joy when I think of you. 💌\n\nEvery moment, every smile of yours means the world to someone who admires you silently.\n\nThis wish is more than words... it's a little piece of my heart wrapped in hope, love, and pure emotion.\n\nHappy Birthday! May your life be as beautiful as your smile. ✨\n\nFrom the one who still remembers you...`;

  useEffect(() => {
    // Floating symbols
    const symbols = ["💖", "🌸", "💐", "❤️", "🌷"];
    const interval = setInterval(() => {
      const elem = document.createElement("div");
      elem.className = "float-symbol";
      elem.innerText = symbols[Math.floor(Math.random() * symbols.length)];
      elem.style.left = Math.random() * 100 + "vw";
      elem.style.fontSize = `${Math.random() * 24 + 16}px`;
      elem.style.animationDuration = Math.random() * 5 + 5 + "s";
      document.body.appendChild(elem);
      setTimeout(() => elem.remove(), 10000);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const openLetter = () => {
    setShowLetter(true);
    setHintFade(true);
    intervalRef.current = setInterval(() => {
      if (indexRef.current < message.length) {
        const char = message[indexRef.current];
        setTypedMessage((prev) => prev + (char === "\n" ? "<br>" : char));
        indexRef.current++;
        if (letterRef.current) {
          letterRef.current.scrollTop = letterRef.current.scrollHeight;
        }
      } else {
        clearInterval(intervalRef.current);
        setTimeout(() => setShowNext(true), 300);
      }
    }, 50);
  };

  const goToNextPage = () => {
    setPageFade(true);
    setTimeout(() => {
      navigate("/surprise");
    }, 700); // match animation duration
  };

  return (
    <div className={`letter-body${pageFade ? ' fade-out' : ''}`}> 
      <div
        className="floating-bg"
        style={{ backgroundImage: "url('/images/flowers.png')" }}
      ></div>
      <div className="letter-container">
        {!showLetter && (
          <div className="letter-closed" onClick={openLetter}>
            💌
          </div>
        )}
        {showLetter && (
          <div className="letter-open" ref={letterRef}>
            <div
              className="typed-text"
              dangerouslySetInnerHTML={{ __html: typedMessage }}
            />
          </div>
        )}
        {showNext && (
          <div className="next-button-container">
            <button className="next-button show" onClick={goToNextPage}>
              🎁 Open Surprise
            </button>
          </div>
        )}
      </div>
      <div className={`letter-hint${hintFade ? ' fade-out' : ''}`} id="letterHint">
        Click the letter to open something from the heart 💖
      </div>
      <audio autoPlay loop>
        <source
          src="https://www.chosic.com/wp-content/uploads/2021/12/Love-Inspiring-Piano.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}