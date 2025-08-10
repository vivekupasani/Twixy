import React, { useEffect } from 'react';
import { AppColors } from '../theme/colors';
import SideBar from '../components/SideBar';
import SearchSection from '../components/SearchSection';
import ConnectionStatus from '../components/ConnectionStatus';
import chatWebService from '../services/chatWebService';

const HomePage: React.FC = () => {
  useEffect(() => {
    chatWebService.connect();

    // Handle browser close/refresh
    const handleBeforeUnload = () => {
      chatWebService.disconnect();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to disconnect when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      chatWebService.disconnect();
    };
  }, []);

  const footerItems = ['Pro', 'Enterprise', 'Store', 'Blog', 'Careers', 'English (English)'];

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: AppColors.background
      }}
    >
      <ConnectionStatus />
      <SideBar />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: window.innerWidth <= 768 ? '8px' : '0'
        }}
      >
        <div style={{ flex: 1 }}>
          <SearchSection />
        </div>

        <footer
          style={{
            padding: '16px 0',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          {footerItems.map((item, index) => (
            <span
              key={index}
              style={{
                fontSize: '14px',
                color: AppColors.footerGrey,
                cursor: 'pointer'
              }}
            >
              {item}
            </span>
          ))}
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
