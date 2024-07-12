import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import Button from '../../components/button/Button';
//----------------------------------------------------------
import './Register.css';
//----------------------------------------------------------
const Register = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className='register'>

      <h2>Regitre-se aqui:</h2>

      <form action="" method='post'>

        <div className="form-control">
          <label htmlFor="name">Nome:</label>
            <input type="text" name="name" id="name" placeholder='Digite seu nome completo' maxLength={'60'} value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>

        <div className="form-control">
          <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder='Digite seu email' maxLength={'60'} value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>

        <div className="form-control">
          <label htmlFor="password">Senha:</label>
            <input type="password" name="password" id="password" placeholder='Digite sua senha' minLength={'8'} maxLength={'15'} value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>

        <Button type='Submit'>Registrar usuário</Button>

      </form>
    </div>
  );
};
//----------------------------------------------------------
export default Register;