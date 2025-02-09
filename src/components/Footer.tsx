import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <Logo className="scale-75" />
              <span className="text-lg font-bold">
                <span className="text-[#cc73f8]">Action</span>
                <span className="text-white">Leads</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-[#cc73f8] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-[#cc73f8] transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-[#cc73f8] transition-colors">
              Cookie Policy
            </Link>
          </div>

          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} ActionLeads.io. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;