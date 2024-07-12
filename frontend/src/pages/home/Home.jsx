import React from 'react'
//----------------------------------------------------------
import { Link } from 'react-router-dom';
//----------------------------------------------------------
import Button from '../../components/button/Button';
//----------------------------------------------------------
import './Home.css';
//----------------------------------------------------------
const Home = () => {
  return (
    <div className="home">
      <h1>Seja bem vindo</h1>
      <div className="button">
        <Button>
          <Link to={'/register'} className='btn-link'>Registre-se aqui</Link>
        </Button>
      </div>
      <div className="button">
        <Button>
          <Link to={'/login'} className='btn-link'>Entre aqui</Link>
        </Button>
      </div>
    </div>
  );
};
//----------------------------------------------------------
export default Home;