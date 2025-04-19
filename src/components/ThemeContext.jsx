import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // default to dark

  // Available themes
  const themes = {
    dark: {
      bgColor: '#1a1a1a',
      textColor: '#f3f4f6',
      primary: '#818cf8',
      secondary: '#2d3748',
      border: '#4a5568',
      cardBg: '#2d3748',
      hover: '#4a5568'
    },
    light: {
      bgColor: '#ffffff',
      textColor: '#333333',
      primary: '#4f46e5',
      secondary: '#f3f4f6',
      border: '#e5e7eb',
      cardBg: '#ffffff',
      hover: '#f9fafb'
    },
    blue: {
      bgColor: '#1e3a8a',
      textColor: '#f0f9ff',
      primary: '#3b82f6',
      secondary: '#1e40af',
      border: '#1e40af',
      cardBg: '#1e40af',
      hover: '#1e3a8a'
    }
  };

  const changeTheme = (newTheme) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      applyThemeStyles(newTheme);
    }
  };

  const applyThemeStyles = (themeName) => {
    const theme = themes[themeName];
    const root = document.documentElement;
    
    root.style.setProperty('--bg-color', theme.bgColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--border-color', theme.border);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--hover-color', theme.hover);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    changeTheme(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themes, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};