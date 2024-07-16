import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//----------------------------------------------------------
import { useCookies } from 'react-cookie';
//----------------------------------------------------------
import Messages from '../../../components/layout/messages/Messages';
import Button from '../../../components/button/Button';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
//----------------------------------------------------------
import api from '../../../services/api';
//----------------------------------------------------------
import './AdminModify.css';
//----------------------------------------------------------
const AdminModify = () => {

  const navigate = useNavigate();

  //Messages -------------------------------------------------
  const location = useLocation();
  let message = '';
  let success_message = '';

  if(location.state){
    message = location.state.message;
    success_message = location.state.success_message;
  };
  //----------------------------------------------------------

  //Get projects list-----------------------------------------
  const [projects, setProjects] = useState([]);
  const listResponse = async()=>{
    const response = await api.get('/admin/list');
    setProjects(response.data);
  }; 
  //----------------------------------------------------------

  //Verify cookies -------------------------------------------
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
    listResponse();
  }, []);
  //----------------------------------------------------------

  //Deleting project -------------------------------------------
  const handleDelete = async(evt)=>{
    evt.preventDefault();

    try {
      const response = await api.post('/admin/delete', {id: evt.target.firstChild.value});
      if(response.data.success_message){
        navigate('/admin/modify', {state: {success_message: response.data.success_message}});
      } else {
        navigate('/admin/modify', {state: {message: response.data.message}});
      }
    } catch (error){
      navigate('/admin/modify', {state: {message: 'Erro ao tentar deletar projeto'}});
    };

    window.location.reload();
  };
  //----------------------------------------------------------

  //Editing the project --------------------------------------
  const handleEdit = async(evt)=>{
    evt.preventDefault();
    const id = evt.target.firstChild.value;
    navigate(`/admin/modify/${id}`, {state: {id: id}});
  };
  //----------------------------------------------------------
  
  return (
    <div className='admin-modify'>
      {message && (
        <Messages type={'error'}>{message}</Messages>
      )}
      {success_message && (
        <Messages type={'success'}>{success_message}</Messages>
      )}

      <p className='link'>
        <Link to={'/admin'}>Voltar a página principal</Link>
      </p>

      <h2>Veja todos os projetos listados abaixo:</h2>
      <div className="project-list">
        {
          projects.map((project)=>(
            <div className="project" key={project._id}>
              

              <h3>{project.name}</h3>

              <hr/>

              <div className="info">
                <p>{project.description}</p>

                <div className="button-area">

                  <form onSubmit={(evt)=>handleDelete(evt)}>
                    <input type="hidden" name="id" value={project._id}/>
                    <div className="button">
                      <Button type={'Submit'} className={'danger btn-modify'}>
                        <FaRegTrashCan/>
                      </Button>
                    </div>
                  </form>


                  <form onSubmit={(evt)=>handleEdit(evt)}>
                    <input type="hidden" name="id" value={project._id}/>
                    <Button type={'Submit'} className={'edit btn-modify'} onClick={(evt)=>handleEdit(evt)}>
                        <FaPen/>
                    </Button>
                  </form>
            
                </div>

              </div>

            </div>
          ))
        }
      </div>
    </div>
  );
};
//----------------------------------------------------------
export default AdminModify;