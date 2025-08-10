import React, { useState } from 'react';
import { AppColors } from '../theme/colors';
import SideBarButton from './SideBarButton';

const SideBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div 
      style={{
        width: isCollapsed ? '64px' : '150px',
        backgroundColor: AppColors.sideNav,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.1s ease'
      }}
    >
      <div style={{ height: '16px' }} />
      
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <span 
          style={{
            color: AppColors.whiteColor,
            fontSize: isCollapsed ? '30px' : '60px',
            transition: 'font-size 0.1s ease'
          }}
        >
          ⚡
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '24px' }} />
        
        <SideBarButton
          isCollapsed={isCollapsed}
          icon="+"
          text="Home"
        />
        <SideBarButton
          isCollapsed={isCollapsed}
          icon="🔍"
          text="Search"
        />
        <SideBarButton
          isCollapsed={isCollapsed}
          icon="🌐"
          text="Spaces"
        />
        <SideBarButton
          isCollapsed={isCollapsed}
          icon="✨"
          text="Discover"
        />
        <SideBarButton
          isCollapsed={isCollapsed}
          icon="☁️"
          text="Library"
        />
        
        <div style={{ flex: 1 }} />
        
        <div 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            margin: '14px',
            textAlign: 'center',
            cursor: 'pointer',
            color: AppColors.iconGrey,
            fontSize: '22px'
          }}
        >
          {isCollapsed ? '▶' : '◀'}
        </div>
        
        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
};

export default SideBar;
