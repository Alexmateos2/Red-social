import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export function Formulario({isDarkMode}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
    rememberMe: false
  });
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);
  
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { correo, password } = formData;
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    })
    .then(response => {
      if (response.status === 400) {
        response.text().then(error => {
          toast.error(error);
        });
      } else if (!response.ok) {
        toast.error('Error en el servidor');
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data && data.logueado) {
      const admin = data.admin;
      const token = data.token
        sessionStorage.setItem('usuario', correo);
        sessionStorage.setItem('logueado', 'true');
        sessionStorage.setItem('admin',admin);
        sessionStorage.setItem('token',token)
        navigate('/Home');
      } 
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al iniciar sesión');
    });
    
  }

  return (
    <div className='login'>
      <header className={`container-xxl caja ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1>Bienvenid@ a Twicla</h1>
      </header>
      <form className={`caja formulario ${isDarkMode ? 'dark-mode' : ''}`} onSubmit={handleSubmit}>
        <div className="mb-3 form-group">
          <label className='form-label' htmlFor='correo'> Correo electrónico</label>
           <input
              type="email"
              className="form-control"
              id="email"
              name="correo"
              aria-describedby="emailHelp"
              value={formData.correo}
              onChange={handleInputChange}
              required
            />
            <div id="emailHelp" className="form-text">No compartiremos tu email con nadie.</div>
        </div>
        <div className="mb-3 form-group">
        <label htmlFor="exampleInputPassword1" className='form-label'>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 form-check">
        <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Recuérdame</label>
          <a href="" className='recuerdameLink'>¿Has olvidado tu password?</a>
        </div>
        <div className="enviar">
          <button type="submit" className="raw">Enviar</button>
        </div>
      </form>
     
    </div>
  );
}
