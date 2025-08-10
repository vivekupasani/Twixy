import React, { useState } from 'react';
import { AppColors } from '../theme/colors';

interface SearchBarButtonProps {
  icon: string;
  text: string;
}

const SearchBarButton: React.FC<SearchBarButtonProps> = ({ icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '4px 8px',
        borderRadius: '6px',
        backgroundColor: isHovered ? AppColors.proButton : 'transparent',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
      }}
    >
      <span 
        style={{
          color: AppColors.iconGrey,
          fontSize: '20px',
          marginRight: '8px'
        }}
      >
        {icon}
      </span>
      <span 
        style={{
          color: AppColors.textGrey,
          fontSize: '14px'
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default SearchBarButton;
