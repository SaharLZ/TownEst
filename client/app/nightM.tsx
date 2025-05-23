import React from 'react';
import styles from './Home.module.css';

interface NightModeToggleProps {
  isNightMode: boolean;
  toggleNightMode: () => void;
}

export default function NightModeToggle({ isNightMode, toggleNightMode }: NightModeToggleProps) {
  return (
    <button onClick={toggleNightMode} className={styles.dark}>
      {isNightMode ? (
        <img src="/assets/moon.png" alt="Moon Icon" className={styles.moonIcon} />
      ) : (
        <img src="/img/sun.png" alt="Sun Icon" className={styles.sunIcon} />
      )}
    </button>
  );
}
