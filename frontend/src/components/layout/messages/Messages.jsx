import React from 'react'
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import './Messages.css';
//----------------------------------------------------------
const Messages = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(()=>{
    if(!props.children){
        setVisible(false);
        return
    };

    setVisible(true);

    const timer = setTimeout(()=>{
        setVisible(false);
    }, 5000);

    return ()=>clearTimeout(timer);
  }, [props.children]);

  return (
    <>
        {visible && (
            <div className={`msg ${props.type}`}>
                {props.children}
            </div>
        )}
    </>
  );
};
//----------------------------------------------------------
export default Messages;