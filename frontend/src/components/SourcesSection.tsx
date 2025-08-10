import React, { useState, useEffect } from 'react';
import { AppColors } from '../theme/colors';
import chatWebService from '../services/chatWebService';

interface SearchResult {
  title: string;
  url: string;
}

const SourcesSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      title: 'Ind vs Aus Live Score 4th Test',
      url: 'https://www.moneycontrol.com/sports/cricket/ind-vs-aus-live-score-4th-test-shubman-gill-dropped-australia-win-toss-opt-to-bat-liveblog-12897631.html',
    },
    {
      title: 'Ind vs Aus Live Boxing Day Test',
      url: 'https://timesofindia.indiatimes.com/sports/cricket/india-vs-australia-live-score-boxing-day-test-2024-ind-vs-aus-4th-test-day-1-live-streaming-online/liveblog/116663401.cms',
    },
    {
      title: 'Ind vs Aus - 4 Australian Batters Score Half Centuries',
      url: 'https://economictimes.indiatimes.com/news/sports/ind-vs-aus-four-australian-batters-score-half-centuries-in-boxing-day-test-jasprit-bumrah-leads-indias-fightback/articleshow/116674365.cms',
    },
  ]);

  useEffect(() => {
    const unsubscribe = chatWebService.onSearchResult((data) => {
      setSearchResults(data.data);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const SkeletonCard = () => (
    <div 
      style={{
        width: '150px',
        padding: '16px',
        backgroundColor: AppColors.cardColor,
        borderRadius: '8px',
        opacity: 0.6
      }}
    >
      <div 
        style={{
          height: '40px',
          backgroundColor: '#333',
          borderRadius: '4px',
          marginBottom: '8px'
        }}
      />
      <div 
        style={{
          height: '20px',
          backgroundColor: '#333',
          borderRadius: '4px'
        }}
      />
    </div>
  );

  return (
    <div>
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <span 
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            marginRight: '8px',
            fontSize: '18px'
          }}
        >
          📄
        </span>
        <span 
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: AppColors.whiteColor
          }}
        >
          Sources
        </span>
      </div>

      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          searchResults.map((result, index) => (
            <div
              key={index}
              style={{
                width: '150px',
                padding: '16px',
                backgroundColor: AppColors.cardColor,
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              onClick={() => window.open(result.url, '_blank')}
            >
              <div 
                style={{
                  fontWeight: '500',
                  color: AppColors.whiteColor,
                  fontSize: '14px',
                  marginBottom: '8px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {result.title}
              </div>
              <div 
                style={{
                  color: '#888',
                  fontSize: '12px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}
              >
                {result.url}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SourcesSection;
