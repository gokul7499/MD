import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) newErrors.name = t('contact.errors.name');
    if (!formData.jobTitle) newErrors.jobTitle = t('contact.errors.jobTitle');
    if (!formData.email.trim()) newErrors.email = t('contact.errors.email');
    else if (!emailRegex.test(formData.email)) newErrors.email = t('contact.errors.emailInvalid');
    if (!formData.phone.trim()) newErrors.phone = t('contact.errors.phone');
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = t('contact.errors.phoneInvalid');
    if (!formData.message.trim()) newErrors.message = t('contact.errors.message');

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      await axios.post('/api/contact', formData);
      alert(t('contact.form.submit') + ' ' + t('contact.form.successMessage'));
      setFormData({ name: '', jobTitle: '', email: '', phone: '', message: '' });
    } catch (err) {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-blue-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl bg-black bg-opacity-50 backdrop-blur-lg rounded-xl p-6 sm:p-8 text-white grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Section */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gray-300">{t('contact.getInTouch')}</span>
          </h1>
          <p className="text-gray-300 mb-6 text-sm sm:text-base">
            {t('contact.description')}
          </p>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>{t('contact.services.discussNeeds')}</li>
            <li>{t('contact.services.expertAdvice')}</li>
            <li>{t('contact.services.quote')}</li>
            <li>{t('contact.services.fullConsultation')}</li>
          </ul>
        </div>

        {/* Right Section - Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-70 rounded-lg p-4 sm:p-6 space-y-4">
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder={t('contact.form.name')}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-sm"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="w-full">
              <select
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-sm"
              >
                <option value="">{t('contact.form.jobTitle')}</option>
                <option value="Site Owner">Site Owner</option>
                <option value="Engineer">Engineer</option>
                <option value="Architect">Architect</option>
                <option value="Contractor">Contractor</option>
              </select>
              {errors.jobTitle && <p className="text-red-400 text-sm mt-1">{errors.jobTitle}</p>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder={t('contact.form.email')}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-sm"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="w-full">
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder={t('contact.form.phone')}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-sm"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder={t('contact.form.message')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md resize-none text-sm"
            ></textarea>
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold text-sm"
          >
            {t('contact.form.submit')}
          </button>

          <p className="text-xs text-center text-gray-400 mt-2">
            {t('contact.form.privacy')}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Contact;
