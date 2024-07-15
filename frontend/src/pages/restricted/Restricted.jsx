import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import { useNavigate } from 'react-router-dom';
//----------------------------------------------------------
import { useCookies } from 'react-cookie';
//----------------------------------------------------------
import Button from '../../components/button/Button';
//----------------------------------------------------------
import usersFetch from '../../services/config';
//----------------------------------------------------------
import './Restricted.css';
//----------------------------------------------------------
const Restricted = () => {

  const navigate = useNavigate();

  useEffect()

  return (
    <div className='restricted'>
      <h1>Rota restrita</h1>
      <div></div>
    </div>
  );
};
//----------------------------------------------------------
export default Restricted;