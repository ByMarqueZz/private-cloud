import {React, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * Componente login se muestra cuando el usuario no está logueado
 * @param {Object} props
 * @returns {JSX.Element}
 */
function Recovery(props) {
    const [user, setUser] = useState('');
    const [userIncorrect, setUserIncorrect] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        fetch(props.url + '/api/recovery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user, email})
        })
            .then((response) => response.json())
            .then((data) => {
                if (data == true) {
                    setSuccess(true);
                } else {
                    setUserIncorrect(true);
                }
            })
    }

    if (success) {
        return (
            <div className="container">
                <div className='close-modal'>
                    <button type="button" className="btn-close" aria-label="Close"
                            onClick={() => navigate('/')}></button>
                </div>
                <h2 className="tituloLogin">Recuperar contraseña</h2>
                <div className='divInputLogin'>
                    <div className="form-floating inputLogin">
                        <p>Se ha enviado un correo con las instrucciones para restablecer la contraseña</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className='close-modal'>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => navigate('/')}></button>
            </div>
            <h2 className="tituloLogin">Recuperar contraseña</h2>
            <form className='formLogin'>
                <div className='divInputLogin'>
                    <div className="form-floating inputLogin">
                        <input required type="text" className="form-control" id="floatingName"
                               placeholder="Nombre de usuario" value={user}
                               onChange={(event) => setUser(event.target.value)}/>
                        <label htmlFor="floatingPassword">Nombre de usuario</label>
                    </div>
                </div>
                <div className='divInputLogin'>
                    <div className="form-floating inputLogin">
                        <input required type="text" className="form-control" id="floatingName"
                               placeholder="Correo electrónico" value={email}
                               onChange={(event) => setEmail(event.target.value)}/>
                        <label htmlFor="floatingPassword">Correo electrónico</label>
                    </div>
                </div>

                {
                    userIncorrect ?
                        <p className="alert alert-danger" role="alert">El usuario o correo introducido no forma parte de nuestra
                            aplicación</p> : null
                }

                <button onClick={handleSubmit} type="submit" className='loginButton btn btn-primary'>Restablecer
                    contraseña
                </button>
            </form>
        </div>
    );
}

export default Recovery;