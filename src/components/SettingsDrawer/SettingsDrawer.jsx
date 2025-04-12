
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SettingsDrawer = ({ isOpen, onClose }) => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [theme, setTheme] = useState('dark');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang); // <-- This changes the app language
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // You can set theme globally using context or CSS classes
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-72 h-full bg-[#48495B] text-white shadow-lg z-50 p-5 flex flex-col gap-6">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-white text-xl">
          <FaTimes />
        </button>
      </div>

      {/* Language Selection */}
      <div>
        <h2 className="text-sm font-semibold mb-2">{t('language')}</h2>
        <div className="flex items-center space-x-3 mb-3">
          <div
            className={`w-4 h-4 rounded-full border-4 ${
              language === 'en' ? 'border-white' : 'border-[#48495B]'
            } bg-black cursor-pointer`}
            onClick={() => handleLanguageChange('en')}
          />
          <img src="https://flagcdn.com/us.svg" alt="English" className="w-5 h-4" />
          <span className="text-white font-medium">English</span>
        </div>
        <div className="flex items-center space-x-3">
          <div
            className={`w-4 h-4 rounded-full border-4 ${
              language === 'mr' ? 'border-white' : 'border-[#48495B]'
            } bg-black cursor-pointer`}
            onClick={() => handleLanguageChange('mr')}
          />
          <img src="https://flagcdn.com/in.svg" alt="Marathi" className="w-5 h-4" />
          <span className="text-white font-medium">Marathi</span>
        </div>
      </div>

      <hr className="border-gray-400" />

      {/* Theme Selection */}
      <div>
        <h2 className="text-sm font-semibold mb-3">{t('theme')}</h2>
        <div className="flex space-x-4">
          {['dark', 'light', 'blue'].map((th) => (
            <div
              key={th}
              className={`w-8 h-8 rounded-full border-2 ${
                theme === th ? 'border-blue-400' : 'border-transparent'
              } bg-${th === 'dark' ? 'black' : th === 'light' ? 'white' : 'blue-400'} cursor-pointer flex items-center justify-center`}
              onClick={() => handleThemeChange(th)}
            >
              {theme === th && (
                <span className={`text-sm ${th === 'light' ? 'text-black' : 'text-white'}`}>✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-400" />
    </div>
  );
};

export default SettingsDrawer;

