import { Nav } from '../../Componentes/nav.jsx';
import { Footer } from '../../Componentes/footer.jsx';
import { MenuIzq } from '../../Componentes/menuMainIzquierdo.jsx';
import { MenuDerecho } from '../../Componentes/menuMainDerecho.jsx';
import { Posts } from '../../Componentes/posts.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { HandleLogOut } from '../../Componentes/logout.jsx';
import { toast } from 'react-toastify';
import { DarkModeContext } from "../../Componentes/darkmode";
import { BotonesMain } from '../../Componentes/botonesMain.jsx';
export function Main() {
  const { isDarkMode } = useContext(DarkModeContext);
  const [posts, setPosts] = useState([]);
  const [postNuevos, setPostNuevos] = useState('');
  const correo = sessionStorage.getItem('usuario');
  const [publicacion, setPublicacion] = useState('');
  const [id, setId] = useState('');
  const [alias, setAlias] = useState('');
  const [foto, setFoto] = useState('');
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:3000/main/${correo}`);
        const data = await response.json();
        setId(data.id_usuario);
        setAlias(data.alias);
        setFoto(data.imagen);
        sessionStorage.setItem('id_usuario', data.id_usuario);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatosUsuario();
  }, [correo]);

  useEffect(() => {
    const obtenerPublicaciones = async () => {
      try {
        const response = await fetch('http://localhost:3000/publicaciones', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
            'user-id': id
          }
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      obtenerPublicaciones();
    }
  }, [id]);

  useEffect(() => {
    if (postNuevos) {
      fetch('http://localhost:3000/publicaciones', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
          'user-id': id
        }
      })
        .then(response => response.json())
        .then(data => {
          setPosts(data);
          setPostNuevos(null);
        })
        .catch(error => console.log(error));
    }
  }, [postNuevos]);

  const handlePublicacionChange = (event) => {
    setPublicacion(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    publicacion === '' ? toast.error('No puedes enviar publicaciones vacías') :
      fetch('http://localhost:3000/publicaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `${token}` },
        body: JSON.stringify({ publicacion, id })
      })
        .then(response => response.json())
        .then(data => {
         
          setPostNuevos(data);
          setPublicacion('');
        })
        .catch(error => console.log(error));
  };
  
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleFormSubmit(event);
    }
  };
 
    return (
        <>
        
        <Nav>
            <li className="nav-item">
                    <Link to = "/Amigos" className="nav-link">Amigos</Link>
            </li>
            <li className="nav-item">
                    <Link to = "/" onClick={HandleLogOut} className="nav-link">Cerrar sesión</Link>
            </li>
        </Nav>
        <div className='container-fluid main'>
            <div class="col-lg-3 col-md-12 izquierda">
                <MenuIzq isDarkMode={isDarkMode}/>  
            </div>
            <div className="col-lg-4 col-md-12 central">
                <div className='botones'>
                <BotonesMain setPosts={setPosts} />
                </div>
                <div className="caja mensaje"> 
                  <img className="foto" id="1" src={`${foto}`} alt="Foto" />
                  <form id="publicacion-form" onSubmit={handleFormSubmit}>
                    <div className="form-floating">
                      <textarea 
                      id="publicacion" 
                      className="form-control"
                      placeholder="Leave a comment here" 
                      value={publicacion} 
                      onChange={handlePublicacionChange}
                      onKeyDown={handleKeyDown}>
                          
                      </textarea>
                      <label htmlFor="floatingTextarea">Whats in your mind</label>
                    </div>
                    <div>
                      <button className="btn enviar-main btn-primary" type="submit">Enviar</button>
                    </div>
                  </form>
                </div> 
                    <Posts posts={posts} />
            </div>
            <div className="col-lg-3 col-md-12 caja derecha"> 
                <MenuDerecho />
            </div>
        </div>
        <Footer />
        </>
    )
}