import React from 'react';
import './NavBar.css';
//----------------------------------------------------------
import { Link } from 'react-router-dom';
//----------------------------------------------------------
import { IoReorderThreeSharp } from "react-icons/io5";
const Burguer = IoReorderThreeSharp;
//----------------------------------------------------------
const NavBar = () => {

  const handleBurguerClick=()=>{
    let ulList = document.querySelector('ul');
    if(ulList.style.display == 'none'){
      ulList.style.display = 'block';
    } else {
      ulList.style.display = 'none';
    };
  };

  return (
    <nav className="navbar">
      <div className="burguer-space">
        <h1>Site</h1>
        <div onClick={()=>handleBurguerClick()} className="burguer-container">
          <Burguer className='burguer'/>
        </div>
      </div>
      <ul>
        <li>
          <Link to={'/'} className='nav-link'>Home</Link>
        </li>
        <li>
          <Link to={'/register'} className='nav-link'>Registrar</Link>
        </li>
        <li>
          <Link to={'/login'} className='nav-link'>Entrar</Link>
        </li>
        <li>
          <Link to={'/restrictedroute'} className='nav-link'>Acesse</Link>
        </li>
      </ul>
    </nav>
  );
};
//----------------------------------------------------------
export default NavBar;