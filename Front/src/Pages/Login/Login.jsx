import {Formulario} from "../../Componentes/form"
import {Nav} from '../../Componentes/nav'
import {Footer} from "../../Componentes/footer"
import {Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../Componentes/darkmode";
 export function Login() {
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <>
      <Nav isDarkMode={isDarkMode}>
        <li className="nav-item">
                <Link to = "/Registro" className="nav-link">Registrarse</Link>
        </li>
      </Nav>
      <Formulario isDarkMode={isDarkMode} />
      <Footer />
    </>
  )
}


