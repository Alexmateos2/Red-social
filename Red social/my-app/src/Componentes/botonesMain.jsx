import { useState } from "react"
export function BotonesMain ({ setPosts }){
    const [botonParaTiDisabled, setBotonParaTiDisabled] = useState(false);
    const [botonSiguiendoDisabled, setBotonSiguiendoDisabled] = useState(true);
    const token = sessionStorage.getItem('token')

    const publicacionesUsuarios =() =>{
        fetch('http://localhost:3000/publicaciones-usuarios',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          }
        }) 
        .then(response => response.json())
        .then(data => {
          setPosts(data);
          setBotonParaTiDisabled(true);
          setBotonSiguiendoDisabled(false);
      })
    }
    
      const handleObtenerPublicaciones = async () => {
        const id = sessionStorage.getItem('id_usuario')
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
        setBotonParaTiDisabled(false);
        setBotonSiguiendoDisabled(true);
      };
    return (
        <>
    <button onClick={publicacionesUsuarios} className='btn btn-primary menuPosts' type="button" disabled={botonParaTiDisabled}>Para ti</button>
    <button onClick={handleObtenerPublicaciones} className="btn btn-primary menuPosts" type="button" disabled={botonSiguiendoDisabled}>Siguiendo</button>
    </>
    )
}