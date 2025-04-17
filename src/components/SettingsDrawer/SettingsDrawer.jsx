import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeContext'; // import the hook

const SettingsDrawer = ({ isOpen, onClose }) => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  // Use theme from context
  const { theme, toggleTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  // Sync with theme from context
  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    onClose();
  };

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    if (newTheme !== theme) toggleTheme(); // just toggling between dark/light for now
    localStorage.setItem('theme', newTheme);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed top-0 right-0 w-80 h-full bg-gradient-to-br from-[#2e2f47] via-[#48495B] to-[#1c1d2a] text-white shadow-2xl z-50 p-6 flex flex-col gap-8 rounded-l-xl transition-all duration-300`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{t('Settings')}</h2>
        <button 
          onClick={onClose} 
          className="text-white text-2xl hover:text-red-400 transition"
          aria-label="Close settings"
        >
          <FaTimes />
        </button>
      </div>

      {/* Language Selection */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-300">
          {t('language')}
        </h3>
        <div className="flex flex-col gap-4">
          {[
            { code: 'en', label: 'English', flag: 'https://flagcdn.com/us.svg' },
            { code: 'mr', label: 'Marathi', flag: 'https://flagcdn.com/in.svg' }
          ].map(({ code, label, flag }) => (
            <div
              key={code}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition hover:bg-[#5c5d72] ${
                language === code ? 'bg-[#5c5d72]' : ''
              }`}
              onClick={() => handleLanguageChange(code)}
            >
              <div
                className={`w-4 h-4 rounded-full border-4 ${
                  language === code ? 'border-white' : 'border-[#48495B]'
                } bg-black`}
              />
              <img 
                src={flag} 
                alt={label} 
                className="w-5 h-4 rounded shadow-sm" 
                loading="lazy"
              />
              <span className="text-white font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-500" />

      {/* Theme Selection */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-300">
          {t('theme')}
        </h3>
        <div className="flex space-x-4">
          {['light', 'dark'].map((th) => (
            <button
              key={th}
              className={`w-9 h-9 rounded-full border-2 ${
                selectedTheme === th ? 'border-yellow-300 scale-105' : 'border-transparent'
              } ${
                th === 'dark' ? 'bg-black' : 'bg-white'
              } cursor-pointer flex items-center justify-center transition-transform hover:scale-110`}
              onClick={() => handleThemeChange(th)}
              aria-label={`${th} theme`}
            >
              {selectedTheme === th && (
                <span className={`text-sm ${th === 'light' ? 'text-black' : 'text-white'}`}>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-500" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        {t('Close')}
      </button>
    </div>
  );
};

export default SettingsDrawer;
