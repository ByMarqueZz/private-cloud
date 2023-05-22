import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import './modal-password.css'

function ModalPassword(props) {
    const [probablyPassword, setProbablyPassword] = useState(null);
    const [isIncorrect, setIsIncorrect] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        if(props.pass == probablyPassword) {
            props.show(false);
            if(props.canBeDownloaded) {
                fetch(props.url+'/api/downloadFolder/'+props.pathCanDownload+'/'+props.file.name, {
                    method: 'GET',
                    responseType: 'blob'
                })
                    .then((response) => {return response.blob()})
                    .then((blob) => {
                        const url = window.URL.createObjectURL(new Blob([blob]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', props.file.name + '.zip');
                        document.body.appendChild(link);
                        link.click();
                        props.show(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if(props.canBeEdit) {
                props.show(false);
                props.setFileRename(props.file)
                props.showRename(true);
            } else {
                props.setPath(props.newPath)
                props.reload();
            }
        } else {
            setIsIncorrect(true);
        }
    }

    return (
        <div className='div-create-folder'>
            <div className='close-modal'>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => {props.show(false)}}></button>
            </div>
            <form onSubmit={handleSubmit} className='form-input-file'>
                <h3 className='tittle-modal'>Carpeta protegida</h3>
                <div className='divInputLogin'>
                    <img src='/assets/carpeta_candado.png' className='iconLogin'/>
                    <div className="form-floating inputLogin">
                        <input type="password" autoComplete='on' className="form-control" id="floatingInput" onChange={(event) => {
                            setProbablyPassword(event.target.value)
                            }}/>
                        <label htmlFor="floatingInput">Contraseña</label>
                    </div>
                </div>

                {
                    isIncorrect ? <p className='incorrect'>Contraseña incorrecta</p> : null
                }

                <button type="submit" className='btn btn-primary'>Entrar</button>
            </form>
        </div>
    );
}

export default ModalPassword;
