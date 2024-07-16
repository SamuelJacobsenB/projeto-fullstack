import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//----------------------------------------------------------
import { useCookies } from 'react-cookie';
//----------------------------------------------------------
import Messages from '../../components/layout/messages/Messages';
import Button from '../../components/button/Button';
//----------------------------------------------------------
import api from '../../services/api';
//----------------------------------------------------------
import './Register.css';
//----------------------------------------------------------
const Register = () => {

  const location = useLocation();
  let message = '';

  if(location.state){
    message = location.state.message;
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(['token']);

  //Create new User
  const handleNewUser = async(evt)=>{
    try {
      evt.preventDefault();
      const user = {
        name: name,
        email: email,
        password: password
      };
  
      const response = await api.post('/new',user);
      if(response.data.message){

        navigate('/register', {state: {message: response.data.message}});
        
      } else {

        const token = response.data;

        setCookie('token', token);
  
        navigate('/restrictedroute', {state: {message: 'Usuário logado com sucesso'}});

      };
    } catch (error) {
      navigate('/register', {state: {message: 'Houve um erro interno'}});
    };

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='register'>
      {message && (
        <Messages type={'error'}>{message}</Messages>
      )}

      <h2>Regitre-se aqui:</h2>

      <form onSubmit={handleNewUser}>

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

        <Button type={'Submit'} className={'success'}>Registrar usuário</Button>

      </form>
    </div>
  );
};
//----------------------------------------------------------
export default Register;