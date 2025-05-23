"use client"

import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Link from "next/link";
import NightModeToggle from "./nightM";
import Services from "./services";

import Wave from './components/wave'

/* import LottiePlayer from "./components/Lottie"; */

import Foot from "./components/Fot";


const HomePage = () => {
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [currentContent, setCurrentContent] = useState(0);
  const [gradientIndex, setGradientIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // State to track if the background change is paused

  const gradientListDay = [
    'linear-gradient(90deg, rgba(240,214,38,1) 12%, rgba(255,0,172,1) 100%)',
    'linear-gradient(90deg, #FF6F61 0%, #FFB74D 50%, #FFD54F 100%)', 
    'linear-gradient(90deg, #D6A4A4 0%, #E2C2D4 50%, #B9D9EB 100%)',
  ];

  const gradientListNight = [
    'linear-gradient(180deg, #2e003c 0%, #4d004d 50%, #ff0066 100%)',
    'linear-gradient(180deg, #020024 0%, #090979 50%, #00d4ff 100%)', 
    'linear-gradient(180deg, #0b0c1a 0%, #2e2f44 50%, #5f6c91 100%)',
  ];

  useEffect(() => {
    const savedMode = localStorage.getItem("nightMode") === "true";
    setIsNightMode(savedMode);
  }, []);

  const toggleNightMode = () => {
    const newMode = !isNightMode;
    setIsNightMode(newMode);
    localStorage.setItem("nightMode", newMode.toString());
  };

  const contentList = [
    {
      text: {
        heading: "Building Dreams, ",
        subhead: "Creating Reality",
        subText: "Designing the Future, Building with Passion",
      },
    },
    {
      text: {
        heading: "Crafting Spaces, ",
        subhead: " Shaping Lives",
        subText: "Building with Integrity, Designing with Vision",
      },
    },
    {
      text: {
        heading: "Innovative Architecture, ",
        subhead: "Timeless Design",
        subText: "Where Creativity Meets Functionality",
      },
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        setCurrentContent((prevIndex) => (prevIndex + 1) % contentList.length);
        setGradientIndex((prevIndex) => (prevIndex + 1) % (isNightMode ? gradientListNight.length : gradientListDay.length));
        resetAnimation();
      }, 5000);
  
      return () => clearInterval(intervalId);
    }
  }, [isNightMode, isPaused]);

  const resetAnimation = () => {
    const textElement = document.querySelector(`.${styles.textFadeIn}`) as HTMLElement | null;
    const imageElement = document.querySelector(`.${styles.house}`) as HTMLElement | null;
  
    if (textElement) {
      textElement.classList.remove(styles.textFadeIn);
      textElement.style.opacity = "0"; // Temporarily hide text
      setTimeout(() => {
        textElement.style.opacity = "1"; // Show text after re-adding the class
        textElement.classList.add(styles.textFadeIn);
      }, 50); // Delay before re-adding the class
    }
    
    if (imageElement) {
      imageElement.classList.remove(styles.imageFadeIn);
      imageElement.style.opacity = "0"; 
      setTimeout(() => {
        imageElement.style.opacity = "1"; 
        imageElement.classList.add(styles.imageFadeIn);
      }, 50); 
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentImage = isNightMode
    ? `/assets/night${currentContent + 1}.png`
    : `/assets/day${currentContent + 1}.png`;
  const currentGradient = isNightMode ? gradientListNight[gradientIndex] : gradientListDay[gradientIndex];
  const textColorClass = isNightMode ? styles.textNightMode : styles.textDayMode;

  const handleNavigation = (mode:any) => {
    localStorage.setItem('authMode', mode);
    window.location.href = '/Login'; 
  };


  return (
    <div>
      <div style={{ background: currentGradient }}>
        <div className={`${styles.container}`}>
          <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.logo}>TownEst</div>
            <ul className={styles.navLinks}>
              <li><Link href="/" className="active">Home</Link></li>
              <li><Link href="/Projects">Projects</Link></li>
              <li><Link href="/Designers">Interior Designs</Link></li>
              <li><Link href="/Architects">Architects</Link></li>
            </ul>
            <div className={styles.navButtons}>
              <button className={styles.ctaButton} onClick={() => handleNavigation('Login')}>Login</button>
              <button className={styles.Sign}  onClick={() => handleNavigation('signup')}>Sign Up</button>
              <NightModeToggle isNightMode={isNightMode} toggleNightMode={toggleNightMode} />
              <button onClick={togglePause} className={styles.pauseButton}>
                {isPaused ? <img src="/images/play.png" className={styles.pp}/> : <img src="/images/pause.png" className={styles.pp}/>}
             </button>
            </div>
          </nav>

          <main className={styles.mainContent}>
            <div className={`${styles.textSection} ${styles.textFadeIn} ${textColorClass}`}>
              <h1>{contentList[currentContent].text.heading}
                <span className={styles.reality}>{contentList[currentContent].text.subhead}</span>
              </h1>
              <p>{contentList[currentContent].text.subText}</p>
              <Link href="/Projects">
                <button className={styles.ctaButton}>Explore Projects</button>
              </Link>
            </div>
            <div className={styles.imageSection}>
              <img
                src={currentImage}
                alt="Home Image"
                className={`${styles.house} ${styles.imageFadeIn}`}
              />
            </div>
          </main>
        </div>

        <div className={styles.custom}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={styles.shapeFill}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={styles.shapeFill}
            ></path>
            <path
              d="M0,0V5.63C150.24,51.6,321.43,71.07,489,53.28,603.7,41.13,715.8,6.55,828.91,0c107.76-6.2,216.07,16.3,314.63,54.13,31,11.71,60.54,26.7,89.46,44.48V0Z"
              className={styles.shapeFill}
            ></path>
          </svg>
        </div>
      </div>


      <div style={{ background: currentGradient}} className="samaykom">
        <main className={styles.halloween}>
        <div className={ `  ${styles.b}`}>
              <img
                src='/images/House.png'
                alt="Home Image"
                className={` ${styles.imageFadeIn} ${styles.build}`}
              />
            
            <div className={`${styles.textSection}  ${styles.textdesign}  ${styles.textFadeIn} ${textColorClass}`}>
              <h1>
                Build Your Home, 
                <span className={styles.reality}>
                With Passion
                </span>
              </h1>
              <p>
              Design your dream home with our expert architects. We combine innovative design From concept to construction, we work closely with you to bring your vision to life.

               </p>
              <Link href="/Projects">
                <button className={styles.ctaButton}>Take a sit</button>
              </Link>
            </div>
            </div>
            <img src="/images/po.png" alt="" className={styles.pattern}/>
        
          </main> 
    
          <div style={{ background: currentGradient}} className="halala" >
            
              <main className={styles.halloween}>
                <div className={ `  ${styles.b}`}>

                <div className={`${styles.textSection} ${styles.textdesign} ${styles.textFadeIn} ${textColorClass}`}>
                  <h1>
                  Design your Home,  
                    <span className={styles.reality}>
                        With Love
                    </span>
                  </h1>
                  <p>
                  Transform your living space into a true reflection of your style, we bring your vision to life with attention to every detail. Let us craft a home that’s both inspiring and uniquely yours.    
                  </p>
                  <Link href="/Projects">
                    <button className={styles.ctaButton}>Explore Projects</button>
                  </Link>
                </div>
                  
                  <img
                    src='/images/d.png'
                    alt="Home Image"
                    className={` ${styles.imageFadeIn} ${styles.design}`} 
                  />
                 </div>
              <Wave/>
              </main>
              </div>
          </div>
      <div style={{ background: currentGradient, height:'100%', width:'100%'
       }}>

      <Services />
      </div>
      <div style={{ background: currentGradient, height:'100%', width:'100%'
       }}>


<main className={styles.halloween}>
                <div className={ `  ${styles.b}`}>

                <div className={`${styles.textSection} ${styles.textdesign} ${styles.textFadeIn} ${textColorClass}`}>
                  <h1>
                   
                    <span className={styles.reality}>
                      Be part of team,  Join us
                    </span>
                  </h1>
                  <p>
                  Are you an architect or interior designer ? . Let's build spaces that inspire and innovate. If you're ready to take your career to the next level, we'd love to hear from you. Join us and be part of something extraordinary.
                  </p>
                  <Link href="/Sign">
                    <button className={styles.buttonJ}>Join Us</button>
                  </Link>
                </div>
                  
                 
         
                 </div>
             
              </main>
       
       </div>
      
      <Foot/>
    </div>
  );
};

export default HomePage;
