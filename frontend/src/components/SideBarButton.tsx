import React from 'react';
import { AppColors } from '../theme/colors';

interface SideBarButtonProps {
  isCollapsed: boolean;
  icon: string;
  text: string;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ isCollapsed, icon, text }) => {
  return (
    <div 
      className="side-bar-button"
      style={{
        display: 'flex',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        alignItems: 'center',
        margin: '14px 10px',
        cursor: 'pointer'
      }}
    >
      <span 
        style={{
          color: AppColors.iconGrey,
          fontSize: '22px',
          marginRight: isCollapsed ? 0 : '10px'
        }}
      >
        {icon}
      </span>
      {!isCollapsed && (
        <span 
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: AppColors.whiteColor
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default SideBarButton;
