import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Register from './form/register'
import Login from './form/login'
import {BrowserRouter,Route,Routes} from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
   <Routes>
    <Route path="Register" element= {<Register/>} />
    <Route path="Login" element= {<Login/>} />
   </Routes>
  </BrowserRouter>
);


