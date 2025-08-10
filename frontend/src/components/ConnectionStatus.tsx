import React, { useState, useEffect } from 'react';
import { AppColors } from '../theme/colors';
import chatWebService from '../services/chatWebService';

const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = chatWebService.onConnectionState((connected) => {
      setIsConnected(connected);
    });

    // Check initial connection state
    setIsConnected(chatWebService.isConnected());

    return unsubscribe;
  }, []);

  if (isConnected) {
    return null; // Don't show anything when connected
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '8px 16px',
        backgroundColor: '#ff4d4f',
        color: 'white',
        borderRadius: '4px',
        fontSize: '14px',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
      }}
    >
      <span style={{ marginRight: '8px' }}>🔴</span>
      Connection Lost
    </div>
  );
};

export default ConnectionStatus;
