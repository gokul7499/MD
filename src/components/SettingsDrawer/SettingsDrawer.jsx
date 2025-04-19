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
      {/* Your Custom Settings Drawer */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-gradient-to-br from-[#2e2f47] via-[#48495B] to-[#1c1d2a] text-white shadow-2xl z-50 p-6 flex flex-col gap-8 rounded-l-xl transition-all duration-300">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{t('Settings')}</h2>
            <button onClick={onClose} className="text-white text-2xl hover:text-red-400 transition">
              <FaTimes />
            </button>
          </div>

          {/* Language Selection */}
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

          <hr className="border-gray-500" />

          {/* Theme Selection */}
          <div>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-300">{t('theme')}</h3>
            <div className="flex space-x-4">
              {['dark', 'light', 'blue'].map((th) => (
                <div
                  key={th}
                  className={`w-9 h-9 rounded-full border-2 ${
                    theme === th ? 'border-yellow-300 scale-105' : 'border-transparent'
                  } ${th === 'dark' ? 'bg-black' : th === 'light' ? 'bg-white' : 'bg-blue-500'}
                  cursor-pointer flex items-center justify-center transition-transform hover:scale-110`}
                  onClick={() => handleThemeChange(th)}
                >
                  {theme === th && (
                    <span className={`text-sm ${th === 'light' ? 'text-black' : 'text-white'}`}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-500" />
        </div>
      )}

      {/* Ant Design Settings Drawer */}
      <Button
        type="primary"
        shape="circle"
        icon={<SettingOutlined />}
        onClick={showDrawer}
        style={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          zIndex: 999,
        }}
      />
      
      <Drawer
        title="Advanced Settings"
        placement="right"
        width={350}
        onClose={handleClose}
        visible={visible}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={settings}
        >
          <Form.Item label="Theme" name="theme">
            <Radio.Group>
              <Radio value="light">Light</Radio>
              <Radio value="dark">Dark</Radio>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item label="Primary Color" name="primaryColor">
            <Select>
              {colorOptions.map(color => (
                <Select.Option key={color.value} value={color.value}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: color.value,
                      width: 16,
                      height: 16,
                      marginRight: 8,
                      borderRadius: 2,
                    }} />
                    {color.label}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Divider>Navigation Mode</Divider>
          
          <Form.Item label="Layout" name="layout">
            <Radio.Group>
              <Radio.Button value="sidemenu">Side Menu</Radio.Button>
              <Radio.Button value="topmenu">Top Menu</Radio.Button>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item label="Content Width" name="contentWidth">
            <Radio.Group>
              <Radio.Button value="Fluid">Fluid</Radio.Button>
              <Radio.Button value="Fixed">Fixed</Radio.Button>
            </Radio.Group>
          </Form.Item>
          
          <Divider>Other Settings</Divider>
          
          <Form.Item label="Fixed Header" name="fixedHeader" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item label="Fixed Sidebar" name="fixSiderbar" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item label="Color Weakness Mode" name="colorWeak" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default SettingsDrawer;