import React from 'react';
import Navbar from '../components/Navbar'; 
import '../styles/contact.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const user = "Arianne.Mecarsos"; // Or however you retrieve the user

  return (
    <div className="contact-page">
      <Navbar user={user} />

      <div className="contact-container">
        <div className="contact-card">
          
          {/* Header Section */}
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>
              Have questions about Blue Truth? We're here to help. Reach out to us for any inquiries about our water monitoring system.
            </p>
          </div>

          <div className="contact-content-grid">
            
            {/* LEFT COLUMN: Contact Info */}
            <div className="contact-info-section">
              <h3>Get In Touch</h3>
              <p className="info-desc">
                Our team is available to assist you with technical support, partnerships, or general inquiries about the Blue Truth water monitoring system.
              </p>

              <div className="info-boxes">
                {/* Email Box */}
                <div className="info-box">
                  <div className="icon-wrapper">
                    <FaEnvelope />
                  </div>
                  <div className="info-text">
                    <span className="label">Email</span>
                    <span className="value">support@bluetruth.com</span>
                    <span className="sub-value">info@bluetruth.com</span>
                  </div>
                </div>

                {/* Phone Box */}
                <div className="info-box">
                  <div className="icon-wrapper">
                    <FaPhoneAlt />
                  </div>
                  <div className="info-text">
                    <span className="label">Phone</span>
                    <span className="value">+63 123 456 7890</span>
                    <span className="sub-value">Mon-Fri, 8am-5pm</span>
                  </div>
                </div>

                {/* Office Box */}
                <div className="info-box">
                  <div className="icon-wrapper">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="info-text">
                    <span className="label">Office</span>
                    <span className="value">Bonbon, Cebu</span>
                    <span className="sub-value">Philippines</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Form */}
            <div className="contact-form-section">
              <h3>Send Us a Message</h3>
              
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Your name" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="your@email.com" />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" placeholder="Subject" />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="5" placeholder="Your message..."></textarea>
                </div>

                <button type="button" className="send-btn">
                  <FaPaperPlane className="btn-icon" /> Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}