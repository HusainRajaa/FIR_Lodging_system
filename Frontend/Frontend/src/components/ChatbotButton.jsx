import React from 'react';
import './ChatbotButton.css'; // Import the CSS file for styling

const ChatbotButton = ({ onToggleBot }) => {
  const handleClick = () => {
    onToggleBot(); // Trigger the bot toggle on click
  };

  return (
    <div className="chatbot-button" onClick={handleClick}>
     <h1>🤖</h1> 
    </div>
  );
};

export default ChatbotButton;
