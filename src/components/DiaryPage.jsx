import React, { useEffect, useRef, useState } from 'react';
import "../styles/DiaryPage.css";


const images = [
  { src: 'https://picsum.photos/seed/1/300/400', quote: 'Your smile was the beginning of my silence.' },
  { src: 'https://picsum.photos/seed/2/310/420', quote: 'Even in a crowd, I only saw you.' },
  { src: 'https://picsum.photos/seed/3/320/430', quote: 'Every glance of you felt like forever.' },
  { src: 'https://picsum.photos/seed/4/330/440', quote: 'You are the poem I never finished writing.' },
  { src: 'https://picsum.photos/seed/5/340/460', quote: 'Still… you are everything I remember beautifully.' }
];

export default function SurpriseSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // Floating symbols
  useEffect(() => {
    const symbols = ['💖', '🌸', '💐', '❤️', '🌷'];
    const createFloatSymbol = () => {
      const elem = document.createElement('div');
      elem.className = 'float-symbol';
      elem.innerText = symbols[Math.floor(Math.random() * symbols.length)];
      elem.style.left = Math.random() * 100 + 'vw';
      elem.style.fontSize = Math.random() * 24 + 16 + 'px';
      elem.style.animationDuration = Math.random() * 5 + 5 + 's';
      document.body.appendChild(elem);
      setTimeout(() => elem.remove(), 10000);
    };
    const interval = setInterval(createFloatSymbol, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoading(true);
    const img = new window.Image();
    img.src = images[currentIndex].src;
    img.onload = () => setLoading(false);
  }, [currentIndex]);

  const nextScene = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      window.location.href = 'final-whisper'; // Redirect to final whisper page
    }
  };

  const prevScene = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      window.location.href = 'letter';
    }
  };

  return (
    <div className="slideshow-body">
      <h1>Every Photo, A Memory of You 💖</h1>
      <div id="sceneContainer" ref={containerRef}>
        {images.map((item, index) => (
          <div
            className="scene"
            key={index}
            style={{ display: index === currentIndex ? 'flex' : 'none' }}
          >
            <div className="glassy-scene">
              {loading ? (
                <div className="photo-loading-bar">
                  <div className="loading-bar-inner"></div>
                </div>
              ) : (
                <div className="photo-container" style={{ backgroundImage: `url(${item.src})` }}></div>
              )}
              <div className="quote">{item.quote}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="nav-buttons">
        <button onClick={prevScene}>⟵ Previous</button>
        <button onClick={nextScene}>
          {currentIndex === images.length - 1 ? 'Next Page ⟶' : 'Next ⟶'}
        </button>
      </div>
      <audio autoPlay loop>
        <source           
          src={process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/music/stars.mp3' : '/music/stars.mp3'}
          type="audio/mp3" />
      </audio>
    </div>
  );
}
