import { useState, useEffect } from "react";
//----------------------------------------------------------
import { Outlet } from 'react-router-dom';
//----------------------------------------------------------
import NavBar from './components/layout/navbar/NavBar';
import Footer from './components/layout/footer/Footer';
//----------------------------------------------------------
import './index.css';
//----------------------------------------------------------
function App() {

  return (
    <>
      <NavBar/>
      <div className="content">
        <Outlet/>
      </div>
      <Footer/>
    </>
  );
};
//----------------------------------------------------------
export default App;