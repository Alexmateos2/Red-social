import {toast} from "react-toastify"
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


export function Perfil({isDarkMode}){
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);
const [data, setData] = useState([]);
const [editMode, setEditMode] = useState(false);
const [editedData, setEditedData] = useState({});
const [id_usuario, setIdUsuario] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);
const [review, setReview] = useState('');
const [reviews, setReviews] = useState([]);
const [isAddingReview, setIsAddingReview] = useState(false);
const [recommendations, setRecommendations] = useState([]);
const id_logueado = sessionStorage.getItem('id_usuario');
const log = sessionStorage.getItem('logueado')
const  {id} = useParams();
const token = sessionStorage.getItem("token")
  useEffect(() => {
    fetch(`http://localhost:3000/perfil/${id}`)
    .then(response => response.json())
    .then(data => {
      setData(data);
      setEditedData(data);
      setIdUsuario(data.id_usuario); 
    
    });
}, []);

const enableEditMode = () => {
  setEditMode(true);
  setEditedData(data);
};

const saveChanges = () => {
  fetch(`http://localhost:3000/perfil/${id_usuario}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedData)
  })
  .then(response => response.json())
  .then(() => {
    fetch(`http://localhost:3000/perfil/${id}`)
      .then(response => response.json())
      .then(updatedData => {
        setData(updatedData);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error al cargar los datos actualizados:', error);
      });
  })
  .catch(error => {
    console.error('Error al guardar los cambios:', error);
  });


  setData(editedData);
  setEditMode(false);
};

const cancelChanges = () => {
  setEditMode(false);
};

const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0]);
};

function handleUpload () {
  if (selectedFile) {
    const formData = new FormData();
    formData.append('imagen', selectedFile);
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      actualizarImagenEnBaseDeDatos(data.nombreArchivo, id_usuario);
    })
    .catch((error) => {
      console.error(error);
    });
  }
};

function actualizarImagenEnBaseDeDatos(nombreArchivo, id_usuario) {
  fetch('http://localhost:3000/actualizarImagen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombreArchivo, id_usuario })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error al actualizar la ruta de imagen en la base de datos:', error);
    });
}

const handleReviewChange = (event) => {
  setReview(event.target.value);
};



useEffect(() => {
  fetch(`http://localhost:3000/recomendaciones/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    }
  }) 
    .then(response => response.json())
    .then(data => {
      setRecommendations(data);
    })
    .catch(error => {
      console.error('Error al obtener las recomendaciones del servidor:', error);
    });
}, []);


const addReview = () => {
  const recomendador = id_logueado;
  const recomendado = id;
  const recomendacion = `${review}`;
  

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recomendador, recomendado, recomendacion })
  };

  fetch('http://localhost:3000/recomendaciones', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token,
  },
  body: JSON.stringify({ recomendador, recomendado, recomendacion })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const newReview = { comment: recomendacion, recomendador: { id: recomendador }, recomendado: { id: recomendado } };
    setReviews([...reviews, newReview]);
    setReview('');
    setIsAddingReview(false);
    toast.success("Reseña puesta con éxito");
  })
    .catch(error => {
      console.error('Error al enviar la recomendación al servidor:', error);
      
    });
}; 



return (
  <div>
      
        <div className="container text-center perfilPagina">
        <img src={data.imagen} className='imagenPerfil' alt="perfil" />
        <div>
          {id == id_logueado ? (
            <div>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload}>Subir imagen</button>
            </div>
          ) : null}
        </div>
          <h1 className="mb-4">{data.nombre} {data.apellidos}</h1>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Ciudad y país de residencia</h3>
              <h6>{editMode ? <textarea value={editedData.ciudad} onChange={e => setEditedData({ ...editedData, ciudad: e.target.value })} /> : data.ciudad}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Estudios universitarios / Certificaciones</h3>
              <h6>{editMode ? <textarea value={editedData.formacion} onChange={e => setEditedData({ ...editedData, formacion: e.target.value })} /> : data.formacion}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Idiomas</h3>
              <h6>{editMode ? <textarea value={editedData.idiomas} onChange={e => setEditedData({ ...editedData, idiomas: e.target.value })} /> : data.idiomas}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Perfil de LinkedIn</h3>
              <h6>{editMode ? <textarea value={editedData.linkedin} onChange={e => setEditedData({ ...editedData, linkedin: e.target.value })} /> : data.linkedin}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Hobbies</h3>
              <h6>{editMode ? <textarea value={editedData.hobbies} onChange={e => setEditedData({ ...editedData, hobbies: e.target.value })} /> : data.hobbies}</h6>
              <ul>
              </ul>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Experiencia laboral</h3>
              <h6>{editMode ? <textarea value={editedData.experiencia_lab} onChange={e => setEditedData({ ...editedData, experiencia_lab: e.target.value })} /> : data.experiencia_lab}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Teléfono</h3>
              <h6>{editMode ? <textarea value={editedData.telefono} onChange={e => setEditedData({ ...editedData, telefono: e.target.value })} /> : data.telefono}</h6>
            </div>
          </div>
          <div className="panel panel-default shadow mb-4">
            <div className="panel-heading">
              <h3 className="panel-title">Reseñas</h3>
              {recommendations.map((usuario) => {
          return (
            <div key={usuario.id_recomendacion}>
              <div className='recomendacion'>Nombre: {usuario.nombre} {usuario.apellidos}</div>
              <div className='recomendacion-body'>{usuario.recomendacion}</div>
            </div>
          );
        })}
            {isAddingReview ? (
              <div>
                <textarea value={review} onChange={handleReviewChange} />
                <button onClick={addReview}>Aceptar</button>
                <button onClick={() => setIsAddingReview(false)}>Cancelar</button>
                </div>
            ) : (
              id !==id_logueado ?(
              <button disabled={id===id_logueado} onClick={() => setIsAddingReview(true)} >Añadir reseña</button>) : null
            )}
            </div>
          </div>
          {editMode ? (
        <div>
          <button onClick={saveChanges}>Guardar</button>
          <button onClick={cancelChanges}>Cancelar</button>
        </div>
      ) : (id ==id_logueado ?(
        <button disabled={id!==id_logueado} onClick={enableEditMode}>Editar</button>) : null
        
      )}
       
        </div>
        
      </div>
);
};

