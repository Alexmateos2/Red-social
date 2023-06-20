import { Nav } from "../../Componentes/nav";
import { Footer } from "../../Componentes/footer";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../Componentes/darkmode";
import { HandleLogOut } from '../../Componentes/logout.jsx';
import { Ticket } from "../../Componentes/ticketUsuarios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Admin() {
  const { isDarkMode } = useContext(DarkModeContext);
  const admin = sessionStorage.getItem('admin')
  const [usuarios, setUsuarios] = useState([]);
  const handleRedirect = () => {
    if (!toast.isActive("adminError")) {
        toast.error("Acceso restringido", { toastId: "adminError" });
      }
      return <Navigate to="/Home" replace />;
    }
    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
      }, [isDarkMode]);
  useEffect(() => {
    fetch('http://localhost:3000/usuario')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
    {admin == '1'?<>
       <Nav>
            <li className="nav-item">
                    <Link to = "/Amigos" className="nav-link">Amigos</Link>
            </li>
            <li className="nav-item">
                    <Link to = "/" onClick={HandleLogOut} className="nav-link">Cerrar sesión</Link>
            </li>
        </Nav>
      <div>
        <h1 className="usuarios">Usuarios</h1>
        <div className="table-container">
        <div className="table-responsive">
          <table className="table table-sm  table-hover" >
            <thead >
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Email</th>
                <th scope="col">Fecha de registro</th>
                <th scope="col">Fecha de nacimiento</th>
                <th scope="col">Link de imagen</th>
                <th scope="col">Ciudad</th>
                <th scope="col">Experiencia Laboral</th>
                <th scope="col">Formación</th>
                <th scope="col">Idiomas</th>
                <th scope="col">Hobbies</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Admin</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.id_usuario}>
                  <td>{usuario.id_usuario}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellidos}</td>
                  <td>{usuario.correo_electronico}</td>
                  <td>{new Date(usuario.fecha_registro).toLocaleDateString()}</td>
                  <td>{new Date(usuario.fecha_nac).toLocaleDateString()}</td>
                  <td>{usuario.imagen}</td>
                  <td>{usuario.ciudad}</td>
                  <td>{usuario.experiencia_lab}</td>
                  <td>{usuario.formacion}</td>
                  <td>{usuario.idiomas}</td>
                  <td>{usuario.hobbies}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.admin === '1' ? 'Sí' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Ticket usuarios={usuarios}/>
        </div>
      </div>

      <Footer />
    </> : handleRedirect()}
    
    </>)
}