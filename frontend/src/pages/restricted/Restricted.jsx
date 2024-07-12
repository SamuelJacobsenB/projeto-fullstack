import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import Button from '../../components/button/Button';
//----------------------------------------------------------
import usersFetch from '../../services/config';
//----------------------------------------------------------
import './Restricted.css';
//----------------------------------------------------------
const Restricted = () => {

  const [users, setUsers] = useState([]);

  const getUsers = async()=>{
    try {
      const response = await usersFetch.get('/');
      setUsers(response.data);
    } catch (error) {
      alert(error);
    };
  };

  useEffect(()=>{
    getUsers();
  }, []);

  return (
    <div className='restricted'>
      <h1>Rota restrita</h1>
      <div>
        {users.length == 0 ? <h1>Carregando...</h1> : users.map((user)=>(
          <div>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
//----------------------------------------------------------
export default Restricted;