import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//----------------------------------------------------------
import { useCookies } from 'react-cookie';
//----------------------------------------------------------
import Messages from '../../components/layout/messages/Messages';
import Button from '../../components/button/Button';
//----------------------------------------------------------
import usersFetch from '../../services/config';
//----------------------------------------------------------
import './Restricted.css';
//----------------------------------------------------------
const Restricted = () => {

  const location = useLocation();
  let message = '';
  console.log(location.state)

  if(location.state){
    message = location.state.message;
  };

  const navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies(['token']);

  const verifyToken = async()=>{
    try {
      const token = cookie.token;
      
      const response = await usersFetch.post('/user/verify', {token});
      if(response.data){
        removeCookie('token');
        navigate('/', {state: {message: 'Você deve estar logado para entrar nesta área'}});
      };
    } catch(err){
      removeCookie('token');
      navigate('/', {state: {message: 'Você deve estar logado para entrar nesta área'}});
    };
  };

  useEffect(()=>{
    verifyToken();
  }, []);

  return (
    <div className='restricted'>
      {message && (
        <Messages type={'success'}>{message}</Messages>
      )}
      <h1>Rota restrita</h1>
      <div></div>
    </div>
  );
};
//----------------------------------------------------------
export default Restricted;