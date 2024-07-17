import React from 'react'
//----------------------------------------------------------
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//----------------------------------------------------------
import Messages from '../../components/layout/messages/Messages';
import Button from '../../components/button/Button';
//----------------------------------------------------------
import './Home.css';
//----------------------------------------------------------
const Home = () => {

  const location = useLocation();
  let message = '';
  let success_message = ''

  if(location.state){
    message = location.state.message;
    success_message = location.state.success_message;
  };

  return (
    <div className="home">
      {message && (
        <Messages type={'error'}>{message}</Messages>
      )}
      {success_message && (
        <Messages type={'success'}>{success_message}</Messages>
      )}
      <h1>Seja bem vindo</h1>
      <div className="button">
        <Button className={'success'}>
          <Link to={'/register'} className='btn-link'>Registre-se aqui</Link>
        </Button>
      </div>
      <div className="button">
        <Button className={'success'}>
          <Link to={'/login'} className='btn-link'>Entre aqui</Link>
        </Button>
      </div>
    </div>
  );
};
//----------------------------------------------------------
export default Home;