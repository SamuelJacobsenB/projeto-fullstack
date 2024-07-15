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
import Button from '../../../components/button/Button';
//----------------------------------------------------------
import './AdminCreate.css';
//----------------------------------------------------------
const AdminCreate = () => {

    const [name, setName] = useState(); 
    const [content, setContent] = useState(); 
    const [description, setDescription] = useState(); 
    const [technologies, setTechnologies] = useState(); 

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
    <div className='admin-create'>

        <h1>Criar novo projeto:</h1>

        <form>

        <div className="form-control">
          <label htmlFor="name">Nome:</label>
            <input type="text" name="name" id="name" placeholder='Digite o nome do projeto' maxLength={'60'} value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>

        <div className="form-control">
          <label htmlFor="content">Conteúdo:</label>
            <textarea name="content" id="content" onChange={(e)=>setContent(e.target.value)} placeholder='Digite o contúdo do projeto' required>{content}</textarea>
        </div>

        <div className="form-control">
          <label htmlFor="description">Descrição:</label>
            <input type="text" name="description" id="description" placeholder='Digite o conteúdo' value={description} onChange={(e)=>setDescription(e.target.value)} required/>
        </div>

        <div className="form-control">
          <label htmlFor="technologies">Tecnologias:</label>
            <input type="text" name="technologies" id="technologies" placeholder='Digite as tecnologias que serão usadas' value={technologies} onChange={(e)=>setTechnologies(e.target.value)} required/>
        </div>

        <Button type={'Submit'}>Criar projeto</Button>

      </form>

    </div>
  );
};
//----------------------------------------------------------
export default AdminCreate;