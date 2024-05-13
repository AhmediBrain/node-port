// ContactPortfolio

import React, { useState, useEffect } from 'react';

const ContactPortfolio = () => {
  const [text, setText] = useState("a Developer.");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText("a Professional Coder.");
      setTimeout(() => {
        setText("a Full Stack Developer.");
      }, 2000);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p className='intro_title'>{text}</p>
    </div>
  );
}

export default ContactPortfolio;
