import {RegistroFormulario} from "../../Componentes/registroForm"
import {Nav} from '../../Componentes/nav'
import{Footer} from "../../Componentes/footer"
import {Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../Componentes/darkmode";
 export function Registro() {
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <>
      <Nav>
        <li className="nav-item">
                <Link to = "/Registro" className="nav-link active">Registrarse</Link>
        </li>
      </Nav> 
      <RegistroFormulario isDarkMode={isDarkMode} />
      <Footer />
    </>
  )
}


