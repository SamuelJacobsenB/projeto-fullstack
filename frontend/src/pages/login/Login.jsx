import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import { useNavigate } from 'react-router-dom';
//----------------------------------------------------------
import { useCookies } from 'react-cookie';
//----------------------------------------------------------
import Button from '../../components/button/Button';
//----------------------------------------------------------
import usersFetch from '../../services/config';
//----------------------------------------------------------
import './Login.css';
//----------------------------------------------------------
const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(['token']);

  const handleLoginUser = async(evt)=>{
    try {
      evt.preventDefault();
      const user = {
        email: email,
        password: password
      };
  
      const response = await usersFetch.post('/login',user);
      const token = response.data;

      setCookie('token', token);

      navigate('/restrictedroute', {state: {message: 'Usuário logado com sucesso'}});
    } catch (error) {
      console.log(error)
    };

    setEmail('');
    setPassword('');
  };
  
  return (
    <div className='login'>

    <h2>Entre aqui:</h2>

    <form onSubmit={handleLoginUser}>

      <div className="form-control">
        <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" placeholder='Digite seu email' maxLength={'60'} value={email} onChange={(e)=>setEmail(e.target.value)} required/>
      </div>

      <div className="form-control">
        <label htmlFor="password">Senha:</label>
          <input type="password" name="password" id="password" placeholder='Digite sua senha' minLength={'8'} maxLength={'15'} value={password} onChange={(e)=>setPassword(e.target.value)} required/>
      </div>

      <Button type='Submit'>Entrar</Button>

    </form>
  </div>
  );
};
//----------------------------------------------------------
export default Login;