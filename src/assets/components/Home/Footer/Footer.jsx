import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white p-10">
      <div className="flex flex-col items-center space-y-4 mt-20">
        <p className="text-gray-400">Questions? Call 1-800-123-4567</p>

        <div className="flex flex-wrap justify-center space-x-8">
          <a href="#" className="footer-link">FAQ</a>
          <a href="#" className="footer-link">Investor Relations</a>
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Speed Test</a>
          <a href="#" className="footer-link">Help Center</a>
          <a href="#" className="footer-link">Jobs</a>
          <a href="#" className="footer-link">Terms of Use</a>
          <a href="#" className="footer-link">Contact Us</a>
        </div>

        <p className="text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} Netflix, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
