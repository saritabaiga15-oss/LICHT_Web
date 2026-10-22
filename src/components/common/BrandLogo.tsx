import React from 'react';
import './BrandLogo.css';

export interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'dark', className = '' }) => {
  const isLight = variant === 'light';

  return (
    <div className={`brand-logo brand-logo--${variant} ${className}`}>
      <img 
        src={isLight ? '/assets/licht_logo_full_light.png' : '/assets/licht_logo_full_clean.png'} 
        alt="LICHT Recruitment Services Limited" 
        className="brand-logo__img"
        height="44"
      />
    </div>
  );
};

