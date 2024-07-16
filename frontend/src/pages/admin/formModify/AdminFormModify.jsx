import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
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
import './AdminFormModify.css';
//----------------------------------------------------------
const AdminFormModify = () => {

    const location = useLocation();
    let message = '';
    let id = '';

    if(location.state){
      message = location.state.message;
      id = location.state.id;
    };

    const navigate = useNavigate();
    //----------------------------------------------------------

        //Create new project ---------------------------------------------
        const [name, setName] = useState(''); 
        const [content, setContent] = useState(''); 
        const [description, setDescription] = useState(''); 
        const [technologies, setTechnologies] = useState(''); 
        
        
              const handleEditProject = async(evt)=>{
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

    //Get project-----------------------------------------------

    const getProject = async()=>{
      const response = await api.post('/admin/getproject', {id: id});

      if(response.data.message){
        navigate('/admin/modify', {state: {message: response.data.message}});
      } else {
        const project = response.data.project;

        setName(project.name);
        setContent(project.content);
        setDescription(project.description);
        setTechnologies(project.technologies);

        console.log(project.project.name)
      };
    }; 


    //Verify cookies -------------------------------------------------
    const [cookie, setCookie] = useCookies(['token']);
  
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
      getProject();
    }, []);



  return (
    <div className='admin-create'>
      {message && (
        <Messages type={'error'}>{message}</Messages>
      )}

        <h1>Editar projeto:</h1>

        <form onSubmit={handleEditProject}>

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
            <input type="text" name="description" id="description" placeholder='Digite o conteúdo' value={description} onChange={(e)=>setDescription(e.target.value)} required/>
        </div>

        <div className="form-control">
          <label htmlFor="technologies">Tecnologias:</label>
            <input type="text" name="technologies" id="technologies" placeholder='Digite as tecnologias que serão usadas' value={technologies} onChange={(e)=>setTechnologies(e.target.value)} required/>
        </div>

        <Button type={'Submit'} className={'success'}>Salvar alterações</Button>

      </form>

    </div>
  );
};
//----------------------------------------------------------
export default AdminFormModify;