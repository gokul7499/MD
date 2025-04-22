import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Drawer, Switch, Divider, Radio, Form, InputNumber, Select, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const SettingsDrawer = ({ isOpen, onClose, theme, setTheme }) => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [settings, setSettings] = useState({
    theme: 'light',
    primaryColor: '#1890ff',
    layout: 'sidemenu',
    fixedHeader: true,
    fixSiderbar: true,
    contentWidth: 'Fluid',
    colorWeak: false,
  });
  const showDrawer = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };
  const handleSubmit = () => {
    form.validateFields().then(values => {
      setSettings(values);
      handleClose();
    });
  };
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    onClose();
  };
  const handleThemeChange = (newTheme) => {
    if (typeof setTheme === 'function') {
      setTheme(newTheme);
    } else {
      console.error('setTheme is not a function');
    }
    onClose();
  };
  const colorOptions = [
    { label: 'Daybreak Blue', value: '#1890ff' },
    { label: 'Dust Red', value: '#f5222d' },
    { label: 'Volcano', value: '#fa541c' },
    { label: 'Sunset Orange', value: '#fa8c16' },
    { label: 'Polar Green', value: '#52c41a' },
    { label: 'Cyan', value: '#13c2c2' },
    { label: 'Purple', value: '#722ed1' },
  ];
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-gradient-to-br from-[#2e2f47] via-[#48495B] to-[#1c1d2a] text-white shadow-2xl z-50 p-6 flex flex-col gap-8 rounded-l-xl transition-all duration-300">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{t('Settings')}</h2>
            <button onClick={onClose} className="text-white text-2xl hover:text-red-400 transition">
              <FaTimes />
            </button>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-300">{t('language')}</h3>
            <div className="flex flex-col gap-4">
              {[{ code: 'en', label: 'English', flag: 'https://flagcdn.com/us.svg' },
              { code: 'mr', label: 'Marathi', flag: 'https://flagcdn.com/in.svg' }].map(({ code, label, flag }) => (
                <div
                  key={code}
                  className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition hover:bg-[#5c5d72] ${language === code ? 'bg-[#5c5d72]' : ''}`}
                  onClick={() => handleLanguageChange(code)}
                >
                  <div className={`w-4 h-4 rounded-full border-4 ${language === code ? 'border-white' : 'border-[#48495B]'} bg-black`} />
                  <img src={flag} alt={label} className="w-5 h-4 rounded shadow-sm" />
                  <span className="text-white font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
   
      
    </>
  );
};
export default SettingsDrawer;