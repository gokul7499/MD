import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
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
    const phoneRegex = /^[6-9]\d{9}$/; // Basic Indian phone format

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.jobTitle) newErrors.jobTitle = "Please select job title";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (!formData.message.trim()) newErrors.message = "Message is required";

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
      alert('Form submitted successfully!');
      setFormData({ name: '', jobTitle: '', email: '', phone: '', message: '' });
    } catch (err) {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-blue-900 flex items-center justify-center px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full bg-black bg-opacity-50 backdrop-blur-lg rounded-xl p-8 text-white">
        
        {/* Left Section */}
        <div>
          <h1 className="text-4xl font-bold mb-6">
            <span className="text-gray-300">Get</span> in Touch with <br />
            <span className="text-yellow-400">Our Construction Experts!</span>
          </h1>
          <p className="text-gray-300 mb-6">
            Whether you're planning a new building, need plumbing, electrical fitting, or want advice from our site experts, we’re here for you!
          </p>
          <ul className="space-y-3 text-sm">
            <li>✔️ Discuss your site and construction needs</li>
            <li>✔️ Get expert AC fitting, flooring, or material advice</li>
            <li>✔️ Receive a quote or connect with our team</li>
            <li>✔️ Full project consultation & support</li>
          </ul>
        </div>

        {/* Right Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-70 rounded-lg p-6 space-y-4">
          <div className="flex gap-4">
            <div className="w-full">
              <input name="name" value={formData.name} onChange={handleChange}
                type="text" placeholder="Your name" className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md" />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="w-full">
              <select name="jobTitle" value={formData.jobTitle} onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md">
                <option value="">Select job title</option>
                <option value="Site Owner">Site Owner</option>
                <option value="Engineer">Engineer</option>
                <option value="Architect">Architect</option>
                <option value="Contractor">Contractor</option>
              </select>
              {errors.jobTitle && <p className="text-red-400 text-sm mt-1">{errors.jobTitle}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <input name="email" value={formData.email} onChange={handleChange}
                type="email" placeholder="you@company.com" className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md" />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="w-full">
              <input name="phone" value={formData.phone} onChange={handleChange}
                type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md" />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <textarea name="message" value={formData.message} onChange={handleChange}
              rows={4} placeholder="Your message..." className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md resize-none"></textarea>
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          <button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">
            Submit
          </button>

          <p className="text-xs text-center text-gray-400 mt-2">
            By submitting this form you agree to our privacy policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Contact;
