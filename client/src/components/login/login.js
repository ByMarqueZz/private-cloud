import {useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './login.css'

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userIncorrect, setUserIncorrect] = useState('');
    const navigate = useNavigate();

    function isLogged() {
        if(props.user) {
            navigate('/')
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch(props.url+'/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.message) {
                    setUserIncorrect(data.message);
                } else {
                    document.cookie = `id=${data[0].hash}; path=/`;
                    props.functionLogged(data[0].hash);
                    isLogged();
                }
            })
    }

  return (
      <>
          <div className="container">
              <h2 className="tituloLogin">Login</h2>
              <form onSubmit={handleSubmit} className='formLogin'>
                  <div className='divInputLogin'>
                      <img src='/assets/userLoginIcon.png' className='iconLogin'/>
                      <div className="form-floating inputLogin">
                          <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={username} onChange={(event) => setUsername(event.target.value)}/>
                          <label htmlFor="floatingInput">Usuario</label>
                      </div>
                  </div>

                  <div className='divInputLogin'>
                      <img src='/assets/userPasswordIcon.png' className='iconLogin'/>
                      <div className="form-floating inputLogin">
                          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                          <label htmlFor="floatingPassword">Contraseña</label>
                      </div>
                  </div>

                  <div className='divLinkRegister'>
                      <Link to='/register' className='linkRegister'>¿No tienes cuenta? Regístrate</Link>
                  </div>

                  <button type="submit" className='loginButton'><img src='/assets/loginButton.png' className='loginButtonImg'/></button>
              </form>
          </div>
      </>
  );
}

export default Login;
