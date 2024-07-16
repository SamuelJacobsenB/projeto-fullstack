import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//----------------------------------------------------------
import { useCookies } from 'react-cookie';
//----------------------------------------------------------
import Messages from '../../../components/layout/messages/Messages';
import Button from '../../../components/button/Button';
//----------------------------------------------------------
import api from '../../../services/api';
//----------------------------------------------------------
import './AdminMain.css';
//----------------------------------------------------------
const AdminMain = () => {

  const location = useLocation();
  let message = '';
  let success_message = '';

  if(location.state){
    message = location.state.message;
    success_message = location.state.success_message;
  };

  const navigate = useNavigate();

  //Verify cookies -------------------------------------------------
  const [cookie, setCookie, removeCookie] = useCookies(['token']);

  const verifyToken = async()=>{
    try {
      const token = cookie.token;
      
      const response = await api.post('/admin/verify', {token});
      if(response.data.message){
        navigate('/', {state: {message: response.data.message}});
      };
    } catch(err){
      navigate('/', {state: {message: 'Erro ao tentar acessar esta área'}});
    };
  };

  useEffect(()=>{
    verifyToken();
  }, []);

  return (
    <div className='admin-main'>
      {message && (
        <Messages type={'error'}>{message}</Messages>
      )}
      {success_message && (
        <Messages type={'success'}>{success_message}</Messages>
      )}
      
      <h1>Bem-vindo administrador</h1>
      <div className="button">
        <Button className={'success'}>
          <Link to={'/admin/create'} className='btn-link'>Crie um projeto</Link>
        </Button>
      </div>
      <div className="button">
        <Button className={'success'}>
          <Link to={'/admin/modify'} className='btn-link'>Gerencie seus projetos</Link>
        </Button>
      </div>
    </div>
  );
};
//----------------------------------------------------------
export default AdminMain;