// pages/index.js
"use client"
import React, { useEffect, useState } from "react";
import './style.css'
import Slider from "../Slider";
import styles from "../Home.module.css";
import Link from "next/link";
import NightModeToggle from "../nightM";

const HomePage = () => {
  const images = [
    '/img/slide1.jpg',
    '/img/slide2.jpg',
    
    '/img/slide4.jpg',
    '/img/slide5.jpg',
    '/img/slide6.jpg',
    '/img/slide7.jpg',
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  useEffect(() => {
    const savedMode = localStorage.getItem("nightMode") === "true";
    setIsNightMode(savedMode);
  }, []);

  const toggleNightMode = () => {
    const newMode = !isNightMode;
    setIsNightMode(newMode);
    localStorage.setItem("nightMode", newMode.toString());
  };
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
  return (
  <>
    <section >
      <div>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.logo}>TownEst</div>
       
          <ul className={styles.navLinks}>
            <li><Link href="/" className="active">Home</Link></li>
            <li><Link href="/Projects">Projects</Link></li>
            <li><Link href="/Designs">Interior Design</Link></li>
            <li><Link href="/Architects">Architects</Link></li>
          </ul>
          <div className={styles.navButtons}>
            <Link href="/Login"><button className={styles.ctaButton}>Login</button></Link>
            <Link href="/SignUp"><button className={styles.Sign}>Sign Up</button></Link>
            <NightModeToggle isNightMode={isNightMode} toggleNightMode={toggleNightMode} />
         
        </div>
      </nav>

      <div>
      <Slider images={images} interval={5000} />
      
      
    </div>
   
      </div>
    </section>
    
    
    
    
    
  </>
  );
};

export default HomePage;
