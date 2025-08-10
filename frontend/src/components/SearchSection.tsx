import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppColors } from '../theme/colors';
import SearchBarButton from './SearchBarButton';
import chatWebService from '../services/chatWebService';

const SearchSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      chatWebService.chat(trimmedQuery);
      navigate(`/chat?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <h1 
        style={{
          fontSize: '40px',
          fontWeight: '400',
          lineHeight: '1.2',
          letterSpacing: '-0.5px',
          color: AppColors.whiteColor,
          marginBottom: '32px',
          fontFamily: '"IBM Plex Mono", monospace'
        }}
      >
        Where knowledge begins
      </h1>

      <div 
        style={{
          width: '700px',
          backgroundColor: AppColors.searchBar,
          borderRadius: '8px',
          border: `1.5px solid ${AppColors.searchBarBorder}`
        }}
      >
        <div style={{ padding: '16px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search anything..."
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: AppColors.whiteColor,
              fontSize: '16px',
              padding: 0
            }}
          />
        </div>

        <div 
          style={{
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <SearchBarButton icon="✨" text="Focus" />
          <SearchBarButton icon="📎" text="Attach" />
          
          <div style={{ flex: 1 }} />
          
          <div
            onClick={handleSubmit}
            style={{
              padding: '9px',
              backgroundColor: AppColors.submitButton,
              borderRadius: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span 
              style={{
                color: AppColors.background,
                fontSize: '16px'
              }}
            >
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
