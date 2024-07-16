import React from 'react';
import './Button.css';
//----------------------------------------------------------
const Button = (props) => {
  return (
    <button className={`btn ${props.className}`} type={props.type} >
      {props.children}
    </button>
  );
};
//----------------------------------------------------------
export default Button;