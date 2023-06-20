import { Link } from "react-router-dom";
import { useEffect } from "react";
export function MenuIzq ({isDarkMode}){
  const admin = sessionStorage.getItem('admin')
  console.log(admin)
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);
  const id_logueado = sessionStorage.getItem("id_usuario")
    return (
        <div className="d-grid gap-2 col-6 mx-auto">
                         
                    <button className="btn a col-12 btn-lg btn-primary mainButton disabled" type="button">Opciones</button>
                    <button className="btn a col-12 btn-lg btn-primary mainButton disabled" type="button">Explorar</button>
                    <button className="btn a col-12  btn-lg btn-primary mainButton disabled" type="button">Noticias</button>
                    <button type="button" class="btn a col-12 btn-lg btn-primary position-relative  mainButton disabled">
                        Mensajes
                      </button>
                      <Link to={`/perfil/${id_logueado}`}><button className="btn a col-12 btn-lg btn-primary"type="button">Profile</button></Link>
                      {admin === '1' && (
                     <Link to = {'/Admin'}><button className="btn a col-12  btn-lg btn-primary" type="button">Admin</button></Link>
                  )}  
                  </div>
    )
}