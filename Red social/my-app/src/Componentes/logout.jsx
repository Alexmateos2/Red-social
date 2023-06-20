export const HandleLogOut = ()=>{
    console.log('Cierre de sesión ejecutado');
    sessionStorage.removeItem('logueado');
    sessionStorage.removeItem('id_usuario');
 
  
}