
import { IonIcon } from '@ionic/react';
import { timeOutline,paperPlaneOutline} from 'ionicons/icons';
import { Link } from 'react-router-dom';
import {AccountMenu} from './Account'
import { useState,useEffect } from 'react';
function Amigos(props) {
  const usuarioLogueado = sessionStorage.getItem('usuario');
 const [solicitudesPendientes, setSolicitudesPendientes] = useState([]);
 const usuarioLogueadoId = sessionStorage.getItem('usuarioId');
  const { amigos, setAmigos, searchResults, isDarkMode} = props;
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);
  const datosAMostrar = searchResults.length > 0 ? amigos.filter(amigo => searchResults.some(result => result.id_usuario === amigo.id_usuario)) : amigos;
  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:3000/solicitudes_pendientes/${usuarioLogueadoId}`)
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          if (data && data.amigosEnviados && data.amigosRecibidos) {
            setSolicitudesPendientes(data);
            const updatedAmigos = amigos.map(amigo => {
              if (data.amigosEnviados.includes(amigo.id_usuario) && amigo.esAmigo !== 'solicitud_pendiente') {
                return {
                  ...amigo,
                  esAmigo: 'solicitud_pendiente'
                };
              } else if (data.amigosRecibidos.includes(amigo.id_usuario) && amigo.esAmigo !== 'ha_enviado_solicitud') {
                return {
                  ...amigo,
                  esAmigo: 'ha_enviado_solicitud'
                };
              }
              return amigo;
            });
            setAmigos(updatedAmigos);
          } else {
            console.error('Error en la estructura de datos de las solicitudes pendientes:', data);
          }
        }
      })
      .catch(error => {
        console.error('Error al obtener las solicitudes pendientes:', error);
      });
    return () => {
      isMounted = false;
    };
  }, [usuarioLogueadoId, amigos, setAmigos]);
  const handleAgregarAmigo = (amigoId) => {
    console.log(sessionStorage);
    // Primer fetch: Obtener el estado de la solicitud de amistad o enviar solicitud de amistad si no existe
    fetch(`http://localhost:3000/solicitudes_amistad/${usuarioLogueadoId}/${amigoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener el estado de la solicitud de amistad');
        }
        return response.json();
      })
      .then(data => {
        console.log('Estado de la solicitud de amistad:', data.estado);
        if (data.estado === 'solicitud_pendiente') {
          alert ("Tienes una solicitud de este amigo")
          const amigoIndex = amigos.findIndex(a => a.id_usuario === amigoId);
          if (amigoIndex !== -1) {
            const updatedAmigos = [...amigos];
            updatedAmigos[amigoIndex].esAmigo = 'solicitud_pendiente';
            setAmigos(updatedAmigos);
          }
        } else {
          // Segundo fetch: Enviar solicitud de amistad
          console.log('Enviando solicitud POST:', {
            id_logueado: usuarioLogueadoId,
            amigoId: amigoId
          });
          fetch('http://localhost:3000/solicitudes_amistad', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id_logueado: usuarioLogueadoId,
              amigoId: amigoId
            })
          })
            .then(response => {
              console.log('Respuesta del servidor recibida:', response);
              if (response.status === 400) {
                response.text().then(error => {
                  alert(error);
                });
              } else if (!response.ok) {
                alert('Error en el servidor');
              } else {
                const amigoIndex = amigos.findIndex(a => a.id_usuario === amigoId);
                if (amigoIndex !== -1) {
                  const updatedAmigos = [...amigos];
                  updatedAmigos[amigoIndex].esAmigo = 'solicitud_pendiente';
                  setAmigos(updatedAmigos);
                }
              }
            })
            .catch(error => {
              console.log('Error al agregar amigo:', error);
            });
        }
      })
      .catch(error => {
        console.log('Error al obtener el estado de la solicitud de amistad:', error);
      });
  };
  const handleBorrarAmigo = (amigoId) => {
    const usuarioLogueadoId = sessionStorage.getItem('usuarioId');
    console.log(sessionStorage);
    console.log('Enviando solicitud DELETE:', {
      id_logueado: usuarioLogueadoId,
      amigoId: amigoId
    });
    fetch(`http://localhost:3000/amigos/${amigoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_logueado: usuarioLogueadoId
      })
    })
      .then(response => {
        console.log('Respuesta del servidor recibida:', response);
        if (!response.ok) {
          alert('Error en el servidor');
        } else {
          console.log('Amigo borrado exitosamente');
          const amigoIndex = amigos.findIndex(a => a.id_usuario === amigoId);
          if (amigoIndex !== -1) {
            const updatedAmigos = [...amigos]; // Crear una copia del array amigos
            updatedAmigos[amigoIndex].esAmigo = false; // Actualizar el estado del amigo
            setAmigos(updatedAmigos); // Actualizar el estado de amigos con el nuevo array
          }
        }
      })
      .catch(error => {
        console.log('Error al borrar amigo:', error);
      });
  };
  return (
    <div>
     
      <div className="container-fluid amigos-caja-general">
      <AccountMenu usuarioLogueadoId={usuarioLogueadoId} />
        <div className="central-amigos row h-100">
          <div className="col-lg-2 izquierda-amigos">
            <div className="caja-amigos feed">
              <h2 className="feed-account-amigos">Feed</h2>
              <div className="botones-amigos">
                <button className="btn btn-primary boton-friends feedButton disabled" type="button">Settings</button>
                <button className="btn btn-primary boton-friends feedButton disabled" type="button">Explore</button>
                <button className="btn btn-primary boton-friends feedButton disabled" type="button">Trends</button>
                <button className="btn btn-primary boton-friends feedButton disabled" type="button">Opciones</button>
              </div>
            </div>
            <div className="caja-amigos account">
              <h2 className="feed-account-amigos">Account</h2>
              <div className="cuenta">
                <button className="btn btn-primary boton-friends feedButton disabled" type="button">Edit</button>
                <button className="btn btn-primary boton-friends feedButton disabled" type="button">Chat</button>
                <Link to={`/perfil/${usuarioLogueadoId}`}><button className="btn btn-primary boton-friends1" type="button">Profile</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-9 derecha-amigos aceptarAmigos">
      <div className="row amigos-caja-central" id="grid">
{ amigos.sort((a, b) => (datosAMostrar.includes(a) ? -1 : 1) - (datosAMostrar.includes(b) ? -1 : 1))
  .map((amigo, index) => (
    <div
      key={amigo.id}
      className={`col-lg-4 ${!datosAMostrar.includes(amigo) ? 'invisible' : ''}`}
  >
      <div className="caja-amigos amigo">
        <div>
          <i className="fas fa-user-circle"></i>
         <img className='fotos-amigos' src={amigo.imagen} alt="" />
        </div>
        <div className='nombre-amigos'>
          <b>{amigo.nombre}</b> <b>{amigo.apellidos}</b>
        </div>
        {amigo.esAmigo === 'solicitud_pendiente' ? (
 <button className="btn btn-primary boton-friends feedButton solicitud-pendiente" type="button" disabled>
 <span className='pendienteButton'>
   Pendiente <IonIcon icon={timeOutline} style={{ width: '20px', height: '20px' }} />
 </span>
</button>
   ) : amigo.esAmigo === 'ha_enviado_solicitud' ? (
    <button className="btn btn-primary boton-friends ha-enviado-solicitud" type="button" >
      <span className='pendienteButton'>
      <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
        Solicitud recibida <IonIcon icon={paperPlaneOutline} style={{ width: '20px', height: '20px' }}/>
      </Link>
   </span>
  </button>
) : amigo.esAmigo ? (
  <button className="btn btn-primary boton-friends borrar-amigo" type="button" onClick={() => handleBorrarAmigo(amigo.id_usuario)} style={{ backgroundColor: 'red' }}>
    Borrar amigo
  </button>
) : (
  <button className="btn btn-primary boton-friends agregar-amigo" type="button" onClick={() => handleAgregarAmigo(amigo.id_usuario)}>
    Agregar amigo
  </button>
)}
        <Link to={`/perfil/${amigo.id_usuario}`}><button className="btn btn-primary boton-friends ver-perfil" type="button">Ver perfil</button></Link>
      </div>
    </div>
  ))}
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { Amigos };