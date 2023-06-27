import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { personOutline} from 'ionicons/icons';

const AccountMenu = (props) => {
    const {usuarioLogueadoId} = props;
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
    
  };

  return (
    <div className="container-fluid" style={{ position: 'relative' ,marginBottom : "10px" }}>
      <button className="btn btn-default account-button" onClick={handleButtonClick}>
      <IonIcon icon={personOutline} style={{ width: '20px', height: '20px' }} />
      </button>
      {showMenu ? (
        <div className="cuenta menu-animado" onClick={handleButtonClick}>
          <button className="btn btn-primary boton-friends" type="button">Edit</button>
          <button className="btn btn-primary boton-friends" type="button">Chat</button>
          <Link to={`/perfil/${usuarioLogueadoId}`}><button className="btn btn-primary boton-friends1" type="button">Profile</button>
                </Link>
        </div>
      ) : null}
    </div>
  );
}

export {AccountMenu};
