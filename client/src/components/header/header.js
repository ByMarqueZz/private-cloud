import {useEffect, useState} from 'react';
import './header.css';
import {Link} from 'react-router-dom';

function Header(props) {

  return (
      <>
          <div className="header">
              <div className="titulo">
                  <Link to="/" className="nav-link active"><span className="titulo"><img src='/assets/cloud-logo.png' className='logo-header'/></span></Link>
              </div>
              <div className="botones">
                  <ul className="listaBotonesHeader">
                      <li>
                          <Link to={"/profile/"+props.user.id} className="nav-link active" aria-current="page" ><img src={props.user.profile_picture} className="logo logo-with-border"/></Link>
                      </li>
                      <li>
                          <button className='btn btn-primary' onClick={props.logout}>Cerrar sesión</button>
                      </li>
                  </ul>
              </div>
          </div>
      </>
  );
}

export default Header;
