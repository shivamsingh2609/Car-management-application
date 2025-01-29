
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Car mangeee from shivamsingh. All Rights Reserved.
        </p>
        <div className="footer-links mb-3">
          <a href="/terms" className="text-decoration-none text-light mx-2">
            Terms of Service
          </a>
          <span>|</span>
          <a href="/privacy" className="text-decoration-none text-light mx-2">
            Privacy Policy
          </a>
        </div>
        <div className="social-icons mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-3 social-icon">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light me-3 social-icon">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light social-icon">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
