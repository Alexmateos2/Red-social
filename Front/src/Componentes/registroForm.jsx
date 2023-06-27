import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function RegistroFormulario({isDarkMode}) {
  const navigate = useNavigate();
  const [dataFormulario, setDataFormulario] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    fechaNac: '',
    alias: '',
    password: ''
  });
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setDataFormulario({
      ...dataFormulario,
      [name]: value
    });
  }

  const handleSubmitChange = (event) => {
    event.preventDefault();
    const { nombre, apellidos, correo, fechaNac, alias, password } = dataFormulario;
    console.log(fechaNac)

    fetch('http://localhost:3000/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellidos, correo, fechaNac, alias, password })
    })
      .then(response => {
        if (response.ok) {
          response.text().then(message => {
            toast.success(message);
            navigate("/");
          });
        } else {
          response.text().then(errorMessage => {
            toast.error(errorMessage);
          });
        }
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
      });
  }

  return (
    <div className='Registro'>
      <div className='contenedor-registra container'>
        <div className='divtitulo container'>
          <h2 className='titulo'>Registra tu perfil de Twicla</h2>
        </div>

        <form className='Ingresa container form-group' onSubmit={handleSubmitChange}>
          <div className='row uno'>
            <div className='col-6 col-md-6'>
              <label htmlFor="exampleInputName2" className='form-label'>
                <b>Ingresa tu nombre</b>
              </label>
            </div>
            <div className='col-6 col-md-6'>
              <input type="text" id="exampleInputName2" className="form-control" required placeholder="Escribe tu nombre" name="nombre" value={dataFormulario.nombre} onChange={handleInputChange} />
            </div>
          </div>

          <div className='row uno'>
            <div className='col-6 col-md-6'>
              <label htmlFor="exampleInputApellidos" className='form-label'>
                <b>Ingresa tus apellidos</b>
              </label>
            </div>
            <div className='col-6 col-md-6'>
              <input type="text" id="exampleInputApellidos" className="form-control" required placeholder="Escribe tus apellidos" name="apellidos" value={dataFormulario.apellidos} onChange={handleInputChange} />
            </div>
          </div>

          <div className='row uno'>
            <div className='col-6 col-md-6'>
              <label htmlFor="exampleInputEmail" className='form-label'>
                <b>Ingresa tu email</b>
              </label>
            </div>
            <div className='col-6 col-md-6'>
              <input type="email" id="exampleInputEmail" className="form-control" required placeholder="Escribe tu email" name="correo" value={dataFormulario.correo} onChange={handleInputChange} />
            </div>
          </div>

          <div className='row uno'>
            <div className='col-6 col-md-6'>
              <label htmlFor="exampleInputFechaNac" className='form-label'>
                <b>Fecha de nacimiento</b>
              </label>
            </div>
            <div className='col-6 col-md-6'>
              <input type="date" id="exampleInputFechaNac" className="form-control" required name="fechaNac" value={dataFormulario.fechaNac} onChange={handleInputChange} />
            </div>
          </div>

          <div className='row uno'>
            <div className='col-6 col-md-6'>
              <label htmlFor="exampleInputAlias" className='form-label'>
                <b>Crea tu alias</b>
              </label>
            </div>
            <div className='col-6 col-md-6'>
              <input type="text" id="exampleIexampleAlias" className="form-control" required placeholder="Alias o username" name="alias" value={dataFormulario.alias} onChange={handleInputChange} />
            </div>
          </div>

          <div className='row uno'>
            <div className='col-6 col-md-6'>
              <label htmlFor="exampleInputPassword" className='form-label'>
                <b>Crea tu contraseña</b>
              </label>
            </div>
            <div className='col-6 col-md-6'>
              <input type="password" id="exampleIexamplePassword" className="form-control" required placeholder="Mínimo 8 letras" name="password" value={dataFormulario.password} onChange={handleInputChange} />
            </div>
          </div>

          <div className='row dos'>
            <Link to="/">¿Ya tienes cuenta? ¡Haz click aquí!</Link>
          </div>

          <div className='row tres'>
            <div className='col-12 col-md-6 col-sm-12'>
              <button className="btn btn-primary reset" type="reset">Vaciar formulario</button>
            </div>
            <div className='col-12 col-md-6 col-sm-12 '>
              <button className="btn btn-primary submit" type='submit'>Regístrate</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
