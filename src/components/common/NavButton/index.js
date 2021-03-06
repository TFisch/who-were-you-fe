import React from 'react';
import './styles.css';

const NavButton = ({ buttonText, handleClick }) => {
  return (
    <button className="nav-button" onClick={handleClick}>
      <h3 className="button-text">{buttonText}</h3>
    </button>
  );
};

export default NavButton;
