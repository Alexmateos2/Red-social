import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { HandleLogOut } from '../../Componentes/logout';
import { DarkModeContext } from '../../Componentes/darkmode';
import { Nav } from '../../Componentes/nav';
import { Amigos } from "../../Componentes/Amigo"
import { Footer } from '../../Componentes/footer';

function AmigosPag() {
  const { isDarkMode } = useContext(DarkModeContext);
  const [amigos, setAmigos] = useState([]);
  const usuarioLogueado = sessionStorage.getItem('usuario');
 
  const idUsuario = sessionStorage.getItem('id_logueado');
  const [searchResults, setSearchResults] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/usuarios`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((results) => results.correo_electronico !== usuarioLogueado);
        const usuarioLogueadoData = data.find((results) => results.correo_electronico === usuarioLogueado);
        if (usuarioLogueadoData) {
          const usuarioLogueadoId = usuarioLogueadoData.id_usuario || '';
          const amigosWithStatus = filteredData.map((user) => {
            const esAmigo = false;
            return {
              ...user,
              esAmigo,
            };
          });
          console.log(amigosWithStatus); // Verificar la asignación de esAmigo
          setAmigos(amigosWithStatus);
          sessionStorage.setItem('usuarioId', usuarioLogueadoId);
          sessionStorage.getItem('usuarioId', usuarioLogueadoId);

          fetch(`http://localhost:3000/amigos/${usuarioLogueadoId}`)
            .then((response) => response.json())
            .then((amigosData) => {
              const numAmigos = amigosData.length;
              console.log(`Número de amigos del usuario logueado: ${numAmigos}`);
              console.log(amigosData); // Imprimir los amigos del usuario logueado en la consola
              console.log(usuarioLogueadoId);
              const updatedAmigos = amigosWithStatus.map((amigo) => {
                const esAmigo = amigosData.some((a) => a.id_amigo === amigo.id_usuario || a.id_usuario === amigo.id_usuario);
                return {
                  ...amigo,
                  esAmigo,
                };
              });
              console.log(updatedAmigos); // Verificar la actualización de esAmigo
              setAmigos(updatedAmigos);
            })
            .catch((error) => {
              console.log('Error al obtener los amigos desde amigos:', error);
            });
        } else {
          console.log('Usuario logueado no encontrado');
        }
      })
      .catch((error) => {
        console.log('Error al obtener los usuarios:', error);
      });
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetch(`http://localhost:3000/buscar?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <Nav>
        <li className="nav-item">
          <Link to="/Amigos" className="nav-link active">
            Amigos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={HandleLogOut} className="nav-link">
            Cerrar sesión
          </Link>
        </li>
      </Nav>
      <div className="caja-amigos col-lg-9 offset-lg-3 buscador-amigos">
        <div className="titulo">
          <h1 className="feed-account-amigos">Amigos</h1>
        </div>

        <div className="input-group mb-3 col-lg-8 offset-lg-4 amigos-barra">
          <span className="input-group-text">@</span>
          <div className="form-floating">
            <input
              id="floatingInputGroup1"
              type="text"
              className="form-control"
              value={username}
              placeholder="Username"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="floatingInputGroup1">Username</label>
          </div>
        </div>
      </div>

  

      <Amigos amigos={amigos} setAmigos={setAmigos} searchResults={searchResults} setSearchResults={setSearchResults} isDarkMode={isDarkMode} />

      <Footer />
    </>
  );
}

export { AmigosPag };
