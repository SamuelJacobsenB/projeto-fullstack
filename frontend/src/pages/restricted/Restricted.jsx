import React from 'react'
//----------------------------------------------------------
import Button from '../../components/button/Button';
//----------------------------------------------------------
import usersFetch from '../../services/config';
//----------------------------------------------------------
import './Restricted.css';
//----------------------------------------------------------
const Restricted = () => {

  const getUsers = async()=>{
    const response = await usersFetch.get('/');
    console.log(response.data);
  };
  getUsers();

  return (
    <div className='restricted'>
      <h1>Rota restrita</h1>
      
    </div>
  );
};
//----------------------------------------------------------
export default Restricted;