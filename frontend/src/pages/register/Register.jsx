import React from 'react'
//----------------------------------------------------------
import Button from '../../components/button/Button';
//----------------------------------------------------------
import './Register.css';
//----------------------------------------------------------
const Register = () => {
  return (
    <div className='register'>

      <h2>Regitre-se aqui:</h2>

      <form action="" method='post'>

        <div className="form-control">
          <label htmlFor="name">Nome:</label>
            <input type="text" name="name" id="name" placeholder='Digite seu nome completo' required/>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder='Digite seu email' required/>
        </div>

        <div className="form-control">
          <label htmlFor="password">Senha:</label>
            <input type="password" name="password" id="password" placeholder='Digite sua senha' required/>
        </div>

        <Button type='Submit'>Registrar usuário</Button>

      </form>
    </div>
  );
};
//----------------------------------------------------------
export default Register;