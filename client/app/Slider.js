// components/Slider.js
import { useState, useEffect } from 'react';
import './slider.css'
const Slider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="slider">
      
      <div
        className="slider-background"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        </div>
        <div className='overlay'>

        <div className="otext">
      Relax, we’ll handle everything— from the foundation to the final detail, ensuring your home is a perfect reflection of your vision
      <div>
        <button className='takesit'>
          Take a sit
        </button>
        </div>
      </div>
    
      
      </div>
    </div>
  );
};

export default Slider;
