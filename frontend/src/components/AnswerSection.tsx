import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { AppColors } from '../theme/colors';
import chatWebService from '../services/chatWebService';

const AnswerSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fullResponse, setFullResponse] = useState(`As of the end of Day 1 in the fourth Test match between India and Australia, the score stands at **Australia 311/6**. The match is being held at the Melbourne Cricket Ground (MCG) on December 26, 2024.

## Match Overview
- **Toss**: Australia won the toss and opted to bat first.
- **Top Performers**:
  - **Steve Smith** is currently unbeaten on **68 runs** from **111 balls**.
  - **Sam Konstas**, making his Test debut, scored a significant **60 runs** from **65 balls**, contributing to a strong start for Australia.
  - Other notable contributions include Usman Khawaja and Marnus Labuschagne, both adding valuable runs to the total.

## Session Highlights
- In the first session, Australia reached **112 runs for the loss of one wicket**, with Konstas and Khawaja building an impressive opening partnership of **89 runs** before Konstas was dismissed by Ravindra Jadeja.
- After lunch, Australia maintained their momentum but faced a collapse as Jasprit Bumrah struck back, taking crucial wickets that brought India back into contention. Australia went from a strong position of **223/2** to **263/5** at one point, losing three wickets for just nine runs.

## Bowling Performance
- Indian bowlers had mixed success throughout the day. While Bumrah was effective in the latter stages, picking up key wickets, Jadeja also contributed by taking the first wicket of Konstas.
- Other bowlers like Akash Deep and Washington Sundar chipped in with one wicket each, helping to restrict Australia's scoring after a dominant start.

## Current Situation
As play concluded for the day, Australia stood at **311/6**, with Steve Smith holding firm as India looks to capitalize on their late breakthroughs on Day 2. The match remains finely balanced, with both teams having opportunities to seize control as they progress through this critical Test match in the Border-Gavaskar Trophy series[1][2][3][5].`);

  useEffect(() => {
    const unsubscribe = chatWebService.onContent((data) => {
      if (isLoading) {
        setFullResponse('');
      }
      setFullResponse(prev => prev + data.data);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [isLoading]);

  const SkeletonText = () => (
    <div style={{ opacity: 0.6 }}>
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          style={{
            height: '20px',
            backgroundColor: '#333',
            borderRadius: '4px',
            marginBottom: '8px',
            width: `${Math.random() * 40 + 60}%`
          }}
        />
      ))}
    </div>
  );

  return (
    <div>
      <div 
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: AppColors.whiteColor,
          marginBottom: '16px'
        }}
      >
        Twixy
      </div>

      {isLoading ? (
        <SkeletonText />
      ) : (
        <ReactMarkdown
          children={fullResponse}
          components={{
            code: ({ children, className }) => (
              <code
                className={className}
                style={{
                  backgroundColor: AppColors.cardColor,
                  padding: '2px 4px',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              >
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre
                style={{
                  backgroundColor: AppColors.cardColor,
                  padding: '16px',
                  borderRadius: '10px',
                  overflow: 'auto'
                }}
              >
                {children}
              </pre>
            ),
            h1: ({ children }) => (
              <h1 style={{ color: AppColors.whiteColor, marginTop: '24px', marginBottom: '16px' }}>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 style={{ color: AppColors.whiteColor, marginTop: '20px', marginBottom: '12px' }}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ color: AppColors.whiteColor, marginTop: '16px', marginBottom: '8px' }}>
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p style={{ color: AppColors.whiteColor, lineHeight: '1.6', marginBottom: '12px' }}>
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul style={{ color: AppColors.whiteColor, marginLeft: '20px', marginBottom: '12px' }}>
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li style={{ marginBottom: '4px' }}>
                {children}
              </li>
            )
          }}
        />
      )}
    </div>
  );
};

export default AnswerSection;
