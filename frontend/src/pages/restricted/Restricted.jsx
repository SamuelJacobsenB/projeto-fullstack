import React from 'react';
import { useState, useEffect } from 'react';
//----------------------------------------------------------
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//----------------------------------------------------------
import { useCookies } from 'react-cookie';
//----------------------------------------------------------
import Messages from '../../components/layout/messages/Messages';
import { IoChevronUp } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
//----------------------------------------------------------
import api from '../../services/api';
//----------------------------------------------------------
import './Restricted.css';
//----------------------------------------------------------
const Restricted = () => {

  const location = useLocation();
  let message = '';

  if(location.state){
    message = location.state.message;
  };

  const handleViewMore = (evt)=>{
    const moreInformations = evt.target.parentNode.nextSibling.lastChild.lastChild.style;
    moreInformations.display = 'none';

    const upDisplay = evt.target.style;
    const downDisplay = evt.target.nextSibling.style;

    upDisplay.display = 'flex';
    downDisplay.display = 'none';

    if(upDisplay.display == 'flex'){
      upDisplay.display = 'none';
      downDisplay.display = 'flex';
      moreInformations.display = 'block';
    };
  };

  const handleViewLess = (evt)=>{
    const moreInformations = evt.target.parentNode.nextSibling.lastChild.lastChild.style;
    moreInformations.display = 'block';

    const downDisplay = evt.target.style;
    const upDisplay = evt.target.previousSibling.style ;

    downDisplay.display = 'flex';
    upDisplay.display = 'none';

    if(downDisplay.display == 'flex'){
      upDisplay.display = 'flex';
      downDisplay.display = 'none';
      moreInformations.display = 'none';
    };
  };

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const listResponse = async()=>{
    const response = await api.get('/admin/list');
    setProjects(response.data);
  }; 

  const [cookie, setCookie, removeCookie] = useCookies(['token']);

  const verifyToken = async()=>{
    try {
      const token = cookie.token;
      
      const response = await api.post('/user/verify', {token});
      if(response.data){
        removeCookie('token');
        navigate('/', {state: {message: 'Você deve estar logado para entrar nesta área'}});
      };
    } catch(err){
      removeCookie('token');
      navigate('/', {state: {message: 'Você deve estar logado para entrar nesta área'}});
    };
  };

  useEffect(()=>{
    verifyToken();
    listResponse();
  }, []);

  return (
    <div className='restricted'>
      {message && (
        <Messages type={'success'}>{message}</Messages>
      )}
      <h1>Veja os projetos listados abaixo:</h1>
      <div className='userProject-list'>
        {
          projects.map((project)=>(
            <div className="project" key={project._id}>  
              <div className="more-informations">
                  <div className="close-icon icon" onClick={(evt)=>handleViewMore(evt)}>
                    <IoChevronUp/>
                  </div>
                  <div className="open-icon icon" onClick={(evt)=>handleViewLess(evt)}>
                    <IoChevronDown/>
                  </div>
              </div>
              <div className="sp-informations">
                <h3>{project.name}</h3>
                <hr/>
                <div className="info">
                  <p>{project.description}</p>
                  <div className="more">
                    <p>{project.content}</p>
                    <p>{project.technologies}</p>
                  </div>
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
export default Restricted;