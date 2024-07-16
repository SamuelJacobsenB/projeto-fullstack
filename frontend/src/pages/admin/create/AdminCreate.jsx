import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//----------------------------------------------------------
import { useCookies } from 'react-cookie';
//----------------------------------------------------------
import api from '../../../services/api';
//----------------------------------------------------------
import Messages from '../../../components/layout/messages/Messages';
import Button from '../../../components/button/Button';
//----------------------------------------------------------
import './AdminCreate.css';
//----------------------------------------------------------
const AdminCreate = () => {

    const location = useLocation();
    let message = '';

    if(location.state){
      message = location.state.message;
    };

    const navigate = useNavigate();

        //Create new project ---------------------------------------------
        const [name, setName] = useState(); 
        const [content, setContent] = useState(); 
        const [description, setDescription] = useState(); 
        const [technologies, setTechnologies] = useState(); 
    
        const handleNewProject = async(evt)=>{
          try {
            evt.preventDefault();
            const project = {
              name: name,
              content: content,
              description: description,
              technologies: technologies
            };
        
            const response = await api.post('/admin/new',project);

            if(response.data.success_message){
              navigate('/admin', {state: {success_message: response.data.success_message}});
            } else {
              navigate('/admin/create', {state: {message: response.data.message}});
            };
          } catch (error) {
            navigate('/admin/create', {state: {message: 'Erro ao tentar criar projeto'}});
          };
      
          setName('');
          setContent('');
          setDescription('');
          setTechnologies('');
        };

    //Verify cookies -------------------------------------------------
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
  
    const verifyToken = async()=>{
      try {
        const token = cookie.token;
        
        const response = await api.post('/admin/verify', {token});
        if(response.data.message){
          navigate('/', {state: {message: response.data.message}});
        };
      } catch(err){
        navigate('/', {state: {message: 'Erro ao tentar acessar esta área'}});
      };
    };
  
    useEffect(()=>{
      verifyToken();
    }, []);

  return (
    <div className='admin-create'>
      {message && (
        <Messages type={'error'}>{message}</Messages>
      )}

        <p className='link'>
          <Link to={'/admin'}>Voltar a página principal</Link>
        </p>

        <h1>Criar novo projeto:</h1>

        <form onSubmit={handleNewProject}>

        <div className="form-control">
          <label htmlFor="name">Nome:</label>
            <input type="text" name="name" id="name" placeholder='Digite o nome do projeto' maxLength={'60'} value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>

        <div className="form-control">
          <label htmlFor="content">Conteúdo:</label>
            <textarea name="content" id="content" value={content} onChange={(e)=>setContent(e.target.value)} placeholder='Digite o contúdo do projeto' required></textarea>
        </div>

        <div className="form-control">
          <label htmlFor="description">Descrição:</label>
            <input type="text" name="description" id="description" placeholder='Digite o conteúdo' value={description} onChange={(e)=>setDescription(e.target.value)} maxLength={'30'} required/>
        </div>

        <div className="form-control">
          <label htmlFor="technologies">Tecnologias:</label>
            <input type="text" name="technologies" id="technologies" placeholder='Digite as tecnologias que serão usadas' value={technologies} onChange={(e)=>setTechnologies(e.target.value)} required/>
        </div>

        <Button type={'Submit'} className={'success'}>Criar projeto</Button>

      </form>

    </div>
  );
};
//----------------------------------------------------------
export default AdminCreate;