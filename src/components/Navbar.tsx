import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="fixed w-full z-50 p-6">
      <nav className="max-w-7xl mx-auto backdrop-blur-sm bg-black/5 rounded-2xl border border-[#cc73f8]/10 px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <Logo />
            <span className="text-xl font-bold">
              <span className="text-[#cc73f8]">Action</span>
              <span className="text-white">Leads</span>
            </span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors text-sm font-medium ${
                location.pathname === '/' ? 'text-[#cc73f8]' : 'text-gray-200 hover:text-[#cc73f8]'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/pricing" 
              className={`transition-colors text-sm font-medium ${
                location.pathname === '/pricing' ? 'text-[#cc73f8]' : 'text-gray-200 hover:text-[#cc73f8]'
              }`}
            >
              Pricing
            </Link>
            
            <Link 
              to="/contact" 
              className={`transition-colors text-sm font-medium ${
                location.pathname === '/contact' ? 'text-[#cc73f8]' : 'text-gray-200 hover:text-[#cc73f8]'
              }`}
            >
              Contact
            </Link>
            <Link 
              to="/check-status" 
              className={`transition-colors text-sm font-medium ${
                location.pathname === '/check-status' ? 'text-[#cc73f8]' : 'text-gray-200 hover:text-[#cc73f8]'
              }`}
            >
              Check Status
            </Link>
            <Link 
              to="/request-leads" 
              className={`px-5 py-2 rounded-lg font-medium transition-all border ${
                location.pathname === '/request-leads'
                  ? 'bg-[#cc73f8] text-white border-[#cc73f8]'
                  : 'bg-gradient-to-r from-[#cc73f8] to-[#b44fe0] text-white border-[#cc73f8]/20 hover:shadow-lg hover:shadow-[#cc73f8]/20 hover:scale-105'
              }`}
            >
              Request Leads
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;