import {React, useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './register.css';

/**
 * Componente login se muestra cuando el usuario no está logueado
 * @param {Object} props 
 * @returns {JSX.Element}
 */
function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [verification, setVerification] = useState('');
  const [sendVerification, setSendVerification] = useState(false);
  const [correctVerification, setCorrectVerification] = useState('');
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [registerCorrect, setRegisterCorrect] = useState(false);
  const [usersAlreadyRegistered, setUsersAlreadyRegistered] = useState([]);
  const [nameAlreadyRegistered, setNameAlreadyRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if(usersAlreadyRegistered.includes(username)) {
      setNameAlreadyRegistered(true);
      return;
    } else {
      setNameAlreadyRegistered(false);
    }
    if (username && password && name && surname && email && verification === correctVerification) {
      fetch(props.url+'/api/solicitudRegistro/'+email+'/'+name+'/'+surname+'/'+password+'/'+username)
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          setRegisterCorrect(true);
        } else {
          setIsIncorrect(true);
          setTimeout(() => {
            setIsIncorrect(false);
          }, 10000);
        }
      })
    } else {
      setIsIncorrect(true);
      setTimeout(() => {
        setIsIncorrect(false);
      }, 10000);
    }

  }

  function getUsers() {
    fetch(props.url+'/api/getUsersNames')
    .then((response) => response.json())
    .then((data) => {
      let dataLowerCase = data.map((user) => user.username.toLowerCase());
      setUsersAlreadyRegistered(dataLowerCase);
    })
  }

  function enviarFake(event) {
    event.preventDefault();
  }

  function sendMail() {
    if (username && password && name && surname && email) {
      setSendVerification(true);
      setTimeout(() => {
        setSendVerification(false);
      }, 60000);

      fetch(props.url+'/api/sendMailVerification/'+email)
      .then((response) => response.json())
      .then((data) => {
        setCorrectVerification(data.toString());
      })
    } else {
      setIsIncorrect(true);
      setTimeout(() => {
        setIsIncorrect(false);
      }, 10000);
    }
  }

  if (isIncorrect) {
    return (
      <div className="container">
        <div className='close-modal'>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => navigate('/')}></button>
        </div>
        <h2 className="tituloLogin">Registrarse</h2>
        <form onSubmit={enviarFake} className='formLogin'>
          <div className='divInputLogin'>
            <div className="form-floating inputLogin">
              <input required type="text" className="form-control" id="floatingName" placeholder="Password" value={name} onChange={(event) => setName(event.target.value)}/>
              <label htmlFor="floatingPassword">Nombre</label>
            </div>
          </div>

          <div className='divInputLogin'>
            <div className="form-floating inputLogin">
              <input required type="text" className="form-control" id="floatingSurname" placeholder="Password" value={surname} onChange={(event) => setSurname(event.target.value)}/>
              <label htmlFor="floatingPassword">Apellidos</label>
            </div>
          </div>

          <div className='divInputLogin'>
            <div className="form-floating inputLogin">
              <input required type="email" className="form-control" id="floatingEmail" placeholder="Password" value={email} onChange={(event) => setEmail(event.target.value)}/>
              <label htmlFor="floatingPassword">Correo electrónico</label>
            </div>
          </div>

          <div className='divInputLogin'>
            <div className="form-floating inputLogin">
              <input required type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={username} onChange={(event) => setUsername(event.target.value)}/>
              <label htmlFor="floatingInput">Usuario</label>
            </div>
          </div>
          
          <div className='divInputLogin'>
            <div className="form-floating inputLogin">
              <input required type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
              <label htmlFor="floatingPassword">Contraseña</label>
            </div>
          </div>

          <div className='divInputLoginVerification'>
            {
              sendVerification ? <>
                <button disabled onClick={sendMail} className='btn btn-success'>...</button>
                <p>Correo electrónico enviado correctamente. <b className='miraSpam'>¡MIRA EN LA BANDEJA DE SPAM!</b> Espera un minuto para volver a enviar un correo</p>
              </> : <>
                <button onClick={sendMail} className='btn btn-success'>Enviar código</button>
                <p>Se enviará un código por correo para que deberá introducir para completar el registro</p>
              </>
            }
            
            <div className="form-floating inputLogin">
              <input type="text" className="form-control" id="floatingVerification" placeholder="Password" value={verification} onChange={(event) => setVerification(event.target.value)}/>
              <label htmlFor="floatingPassword">Código de verificación</label>
            </div>
          </div>

          <div className="alert alert-danger" role="alert">
            Introduce bien todos los campos del registro
          </div>

          <button onClick={handleSubmit} type="submit" className='loginButton btn btn-primary'>Registrarse</button>
        </form>
      </div>
    );
  }

  if(registerCorrect) {
    return (
      <div className="container">
        <div className='close-modal'>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => navigate('/')}></button>
        </div>
        <h2 className="tituloLogin">Registro exitoso</h2>
        <p>
          ¡Enhorabuena! Te has registrado correctamente.
        </p>
        <Link className='btn btn-primary' to={'/'}>Iniciar sesión</Link>
      </div>
    );
  }
  
    return (
      <div className="container">
        <div className='close-modal'>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => navigate('/')}></button>
        </div>
        <h2 className="tituloLogin">Registrarse</h2>
        <form onSubmit={enviarFake} className='formLogin'>
          <div className='divInputLogin'>
            <div className="form-floating inputLogin">
              <input required type="text" className="form-control" id="floatingName" placeholder="Password" value={name} onChange={(event) => setName(event.target.value)}/>
              <label htmlFor="floatingPassword">Nombre</label>
            </div>
          </div>

          <div className='divInputLogin'>
            <div className="form-floating inputLogin">
              <input required type="text" className="form-control" id="floatingSurname" placeholder="Password" value={surname} onChange={(event) => setSurname(event.target.value)}/>
              <label htmlFor="floatingPassword">Apellidos</label>
            </div>
          </div>

          <div className='divInputLogin'>
            <div className="form-floating inputLogin">
              <input required type="email" className="form-control" id="floatingEmail" placeholder="Password" value={email} onChange={(event) => setEmail(event.target.value)}/>
              <label htmlFor="floatingPassword">Correo electrónico</label>
            </div>
          </div>

          <div className='divInputLogin'>
            <div className="form-floating inputLogin">
              <input required type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={username} onChange={(event) => setUsername(event.target.value)}/>
              <label htmlFor="floatingInput">Usuario</label>
              {
                nameAlreadyRegistered ? <p className='error'>El nombre de usuario ya está registrado</p> : null
              }
            </div>
          </div>
          
          <div className='divInputLogin'>
            <div className="form-floating inputLogin">
              <input required type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
              <label htmlFor="floatingPassword">Contraseña</label>
            </div>
          </div>

          <div className='divInputLoginVerification'>
            {
              sendVerification ? <>
                <button disabled onClick={sendMail} className='btn btn-success'>...</button>
                <p>Correo electrónico enviado correctamente. <b className='miraSpam'>¡MIRA EN LA BANDEJA DE SPAM!</b> Espera un minuto para volver a enviar un correo</p>
              </> : <>
                <button onClick={sendMail} className='btn btn-success'>Enviar código</button>
                <p>Se enviará un código por correo para que deberá introducir para completar el registro</p>
              </>
            }
            
            <div className="form-floating inputLogin">
              <input type="text" className="form-control" id="floatingVerification" placeholder="Password" value={verification} onChange={(event) => setVerification(event.target.value)}/>
              <label htmlFor="floatingPassword">Código de verificación</label>
            </div>
          </div>

          <button onClick={handleSubmit} type="submit" className='loginButton btn btn-primary'>Registrarse</button>
        </form>
      </div>
    );
  }
  
  export default Register;