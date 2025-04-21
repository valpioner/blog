'use client';

import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function LogicComponent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={() => {
        setIsDarkMode(!isDarkMode);
        toggleTheme();
      }}>
        Toggle Dark Mode
      </button>
      <p>
        {isDarkMode ? 'Dark mode is enabled!' : 'Light mode is enabled!'}
      </p>
    </div>
  );
}
