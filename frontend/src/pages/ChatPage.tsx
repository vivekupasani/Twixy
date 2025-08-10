import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppColors } from '../theme/colors';
import SideBar from '../components/SideBar';
import SourcesSection from '../components/SourcesSection';
import AnswerSection from '../components/AnswerSection';
import ConnectionStatus from '../components/ConnectionStatus';
import chatWebService from '../services/chatWebService';

const ChatPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const question = searchParams.get('q') || '';

  useEffect(() => {
    // Ensure connection is established when viewing chat page
    if (!chatWebService.isConnected()) {
      chatWebService.connect();
    }

    // Cleanup function
    return () => {
      // Don't disconnect here as user might navigate back
      // The connection will be managed by the HomePage
    };
  }, []);

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
      
      <div style={{ width: window.innerWidth <= 768 ? '0' : '100px' }} />
      
      <div 
        style={{
          flex: 1,
          height: '100vh',
          overflowY: 'auto'
        }}
      >
        <div 
          style={{
            padding: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <h1 
            style={{
              fontSize: '40px',
              fontWeight: 'bold',
              color: AppColors.whiteColor,
              marginBottom: '24px',
              lineHeight: '1.2'
            }}
          >
            {question}
          </h1>
          
          <div style={{ marginBottom: '24px' }}>
            <SourcesSection />
          </div>
          
          <AnswerSection />
        </div>
      </div>
      
      <div 
        style={{
          width: window.innerWidth <= 768 ? '0' : '100px',
          backgroundColor: AppColors.background
        }}
      />
    </div>
  );
};

export default ChatPage;
