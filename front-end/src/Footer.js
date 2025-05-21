import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import logo from './assets/logo2.png';
import './Footer.css';

const Footer = () => {
  const [formData, setFormData] = useState({
    article: '',
    fullName: '',
    contact: '',
    email: '',
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Article validation
    if (!formData.article) newErrors.article = 'Article is required.';

    // Full Name validation
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 2 characters long.';
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = 'Full name must not exceed 50 characters.';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.fullName)) {
      newErrors.fullName = 'Full name can only contain letters, spaces, hyphens, and apostrophes.';
    }

    // Contact validation for Nepali phone numbers
    if (!formData.contact) {
      newErrors.contact = 'Contact number is required.';
    } else if (!/^(0\d{9}|98\d{7,8})$/.test(formData.contact)) {
      newErrors.contact = 'Contact number must be a valid Nepali phone number.';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(); // Validate form fields
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
      return; // Stop form submission
    }

    try {
      console.log('Form data being sent:', JSON.stringify(formData));
      const response = await fetch('http://localhost/wp-headless/server/wp-json/neparchi/v1/submit-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Response:', response);
      console.log('Result:', result);
      if (response.ok) {
        alert('Article submitted successfully!');
        setFormData({
          article: '',
          fullName: '',
          contact: '',
          email: '',
        });
        setErrors({}); // Clear errors on successful submission
      } else {
        console.error('Failed to submit article:', result);
        alert(`Failed to submit article: ${result.message || response.status}`);
      }
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('There was an error submitting your article.');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src={logo} alt="Neparchi Logo" className="footer-logo" />
          {/* Social Media Icons */}
          <div className="footer-social-media">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <a href="mailto:Neparchi.np@gmail.com" className="footer-email">
            Neparchi.np@gmail.com
          </a>
        </div>

        <div className="footer-right">
          <h3 className="footer-title">Send us your article to be featured!</h3>
          <form className="footer-form" onSubmit={handleSubmit}>
            <textarea
              className="article-input"
              placeholder="Enter your article…"
              rows={4}
              name="article"
              value={formData.article}
              onChange={handleChange}
            />
            {errors.article && <span className="error">{errors.article}</span>} {/* Error message */}

            <input
              type="text"
              className="input-field"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>} {/* Error message */}

            <input
              type="text"
              className="input-field"
              name="contact"
              placeholder="Contact no."
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <span className="error">{errors.contact}</span>} {/* Error message */}

            <input
              type="email"
              className="input-field"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>} {/* Error message */}

            <button type="submit" className="submit-button">
              Submit Article
            </button>
          </form>
        </div>
      </div>
      {/* All rights reserved section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Neparchi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
