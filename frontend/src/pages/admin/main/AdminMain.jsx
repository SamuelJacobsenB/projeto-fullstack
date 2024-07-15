import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//----------------------------------------------------------
import { useCookies } from 'react-cookie';
//----------------------------------------------------------
import Button from '../../../components/button/Button';
//----------------------------------------------------------
import usersFetch from '../../../services/config';
//----------------------------------------------------------
import './AdminMain.css';
//----------------------------------------------------------
const AdminMain = () => {

  const navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies(['token']);

  const verifyToken = async()=>{
    try {
      const token = cookie.token;
      
      const response = await usersFetch.post('/admin/verify', {token});
      if(response.data){
        navigate('/', {state: {message: 'Você não pode entrar nesta área'}});
      };
    } catch(err){
      navigate('/', {state: {message: 'Você não pode entrar nesta área'}});
    };
  };

  useEffect(()=>{
    verifyToken();
  }, []);

  return (
    <div className='admin-main'>
        <h1>Bem-vindo administrador</h1>
        <div className="button">
        <Button>
          <Link to={'/admin/create'} className='btn-link'>Crie um projeto</Link>
        </Button>
      </div>
      <div className="button">
        <Button>
          <Link to={'/admin/modify'} className='btn-link'>Gerencie seus projetos</Link>
        </Button>
      </div>
    </div>
  );
};
//----------------------------------------------------------
export default AdminMain;