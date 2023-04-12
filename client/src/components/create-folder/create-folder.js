import {useEffect, useState} from 'react';
import './create-folder.css';
import {Link} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function CreateFolder(props) {
    const [name, setName] = useState(null);
    const [labelSwitch, setLabelSwitch] = useState('Público');
    const [permission, setPermission] = useState(true);

    function handleSubmit(event) {
        event.preventDefault();
        props.show(false);
        fetch(props.url+'/api/createFolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, path: props.path, user_id: props.user.id, permissions: permission}),
        })
        .then((response) => response.json())
        .then((data) => {
            props.reload();
        })
    }
    function onChangeSwitch(e) {
        if(e.target.checked) {
            setLabelSwitch('Público');
            setPermission(true);
        } else {
            setLabelSwitch('Privado');
            setPermission(false);
        }
    }

    return (
        <div className='div-create-folder'>
            <div className='close-modal'>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => props.show(false)}></button>
            </div>
            <form onSubmit={handleSubmit} className='form-input-file'>
                <div className='divInputLogin'>
                    <img src='/assets/expediente.png' className='iconLogin'/>
                    <div className="form-floating inputLogin">
                        <input type="text" className="form-control" id="floatingInput" onChange={(event) => {
                                if (event.target.value.length > 20) return;
                                setName(event.target.value)
                            }}/>
                        <label htmlFor="floatingInput">Nombre de la carpeta</label>
                    </div>
                </div>

                <div className='divInputLogin'>
                    <FormGroup>
                        <FormControlLabel control={<Switch onChange={(e) => {onChangeSwitch(e)}} defaultChecked />} label={labelSwitch} />
                    </FormGroup>
                </div>

                <button type="submit" className='btn btn-primary'>Subir</button>
            </form>
        </div>
    );
}

export default CreateFolder;
