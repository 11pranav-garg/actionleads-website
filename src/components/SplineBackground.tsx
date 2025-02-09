import React from 'react';

const SplineBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div className="absolute inset-0 bg-[#030007]">
        {/* Grid pattern with increased opacity and size */}
        <div 
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(204, 115, 248, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(204, 115, 248, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(3, 0, 7, 0.95) 100%)',
          }}
        />

        {/* Additional ambient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#cc73f8]/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b44fe0]/5 rounded-full blur-[128px]" />
        </div>
      </div>
    </div>
  );
};

export default SplineBackground;