 import { useState } from "react";
 export function Post({ post }) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
  
    const handleLike = () => {
      setLiked(!liked);
      setLikes(prevLikes => (liked ? prevLikes - 1 : prevLikes + 1));
    };
  
    const fechaPublicacion = new Date(post.fecha_publicacion);
    const fechaActual = new Date();
    const diffMs = fechaActual - fechaPublicacion;
    let diff = 0;
    let unidad = '';
  
    if (diffMs < 60000) {
      diff = Math.round(diffMs / 1000);
      unidad = 'segundos';
    } else if (diffMs < 3600000) {
      diff = Math.round(diffMs / 60000);
      unidad = 'minutos';
    } else if (diffMs < 86400000) {
      diff = Math.round(diffMs / 3600000);
      unidad = 'hora/s';
    }
  
    const fechaFormateada = diff > 0 ? `|Hace ${diff} ${unidad}` : fechaPublicacion.toLocaleDateString();
  
    let perfil;
  
    if (post.imagen === "") {
      perfil = (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user perfil svg-main" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
      );
    } else {
      perfil = (
        <img className="foto" src={`${post.imagen}`} alt="Perfil" />
      );
    }
  
    return (
      <div className="caja amigo1">
        
        <div className="cabeza">
            {perfil}
          <div className="alias">
            <b>{post.alias}</b>
          </div>
          <div className="fecha">{fechaFormateada}</div>
        </div>
        <div className="texto">{post.des_publicacion}</div>
        <div className="like-container">
          <button className="btn btn-danger p-1 like" type="button" onClick={handleLike}>
            {liked ? 'Liked' : 'Like'}
          </button>
          <div className="contador">{likes}</div>
        </div>
      </div>
    );
  }