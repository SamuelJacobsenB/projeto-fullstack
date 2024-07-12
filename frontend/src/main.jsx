import React from 'react';
import ReactDOM from 'react-dom/client';
//----------------------------------------------------------
import App from './App.jsx';
import Home from './pages/home/Home.jsx';
import Register from './pages/register/Register.jsx';
import Login from './pages/login/Login.jsx';
import Restricted from './pages/restricted/Restricted.jsx';
//----------------------------------------------------------
import './css/globalStyles.css';
//----------------------------------------------------------
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/restrictedroute',
        element: <Restricted/>
      }
    ]
  }
]);
//----------------------------------------------------------
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);