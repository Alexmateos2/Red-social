import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/Pages/Registro/registro.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import '../src/Pages/Login/form.css'
import '../src/Pages/Main/main.css'
import '../src/Pages/Amigos/amigos.css'
import '../src/Pages/Perfil/perfil.css'
import '../src/Pages/Admin/Admin.css'
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
