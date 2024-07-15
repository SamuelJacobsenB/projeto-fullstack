import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import { useNavigate } from 'react-router-dom';
//----------------------------------------------------------
import { useCookies } from 'react-cookie';
//----------------------------------------------------------
import usersFetch from '../../../services/config';
import projects from '../../../services/projects';
//----------------------------------------------------------
import './AdminCreate.css';
//----------------------------------------------------------
const AdminCreate = () => {

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
    <div>Criar novo projeto:</div>
  );
};
//----------------------------------------------------------
export default AdminCreate;