import React from 'react'
//----------------------------------------------------------
import Button from '../../components/button/Button';
//----------------------------------------------------------
import './Login.css';
//----------------------------------------------------------
const Login = () => {
  return (
    <div className='login'>

    <h2>Entre aqui:</h2>

    <form action="" method='post'>

      <div className="form-control">
        <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" placeholder='Digite seu email' required/>
      </div>

      <div className="form-control">
        <label htmlFor="password">Senha:</label>
          <input type="password" name="password" id="password" placeholder='Digite sua senha' required/>
      </div>

      <Button type='Submit'>Entrar</Button>

    </form>
  </div>
  );
};
//----------------------------------------------------------
export default Login;