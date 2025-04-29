import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">ZenPath</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Professional mental health counseling services to help you find your path to wellness and inner peace.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                  <FaFacebookF size={20} />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                  <FaLinkedinIn size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">About Us</Link>
                </li>
                <li>
                  <Link to="/resources" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">Resources</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>123 Serenity Lane</li>
                <li>Mindful City, MC 54321</li>
                <li>Phone: (555) 123-4567</li>
                <li className="flex items-center">
                  <FaEnvelope size={16} className="mr-2 text-blue-500" />
                  <a href="mailto:info@zenpath.com" className="hover:text-blue-500 transition-colors">info@zenpath.com</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Newsletter</h3>
              <p className="text-gray-600 text-sm">Subscribe to our newsletter for mental wellness tips and updates.</p>
              <form className="mt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm flex-grow"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-100 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">© {currentYear} ZenPath. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <ul className="flex space-x-6">
                  <li>
                    <Link to="/privacy" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">Terms of Service</Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">FAQ</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
