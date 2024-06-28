import React, { useState } from 'react';

const AboutPortfolio = () => {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleAddClick = () => {
    setDisplayText(inputText);
  };

  return (
    <div>
      <input 
        placeholder='Please type here' 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleAddClick}>Add</button>
      <p>{displayText}</p>
    </div>
  );
}

export default AboutPortfolio;
