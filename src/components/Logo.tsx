import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <span className="material-symbols-outlined text-4xl text-[#cc73f8] transform hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
          diversity_2
        </span>
        <div className="absolute inset-0 bg-[#cc73f8]/20 blur-xl rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Logo;