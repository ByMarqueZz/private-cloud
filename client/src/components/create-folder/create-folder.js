import {useEffect, useState} from 'react';
import './create-folder.css';
import {Link} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

function CreateFolder(props) {
    const [name, setName] = useState(null);
    const [labelSwitch, setLabelSwitch] = useState('Público');
    const [labelSwitchPass, setLabelSwitchPass] = useState('Sin contraseña');
    const [permission, setPermission] = useState(true);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        props.show(false);
        let body = JSON.stringify({name, path: props.path, user_id: props.user.id, permissions: permission});
        if(password && password != '') {
            body = JSON.stringify({name, path: props.path, user_id: props.user.id, permissions: permission, password: password})
        }
        if(name == null || name == '') return;
        fetch(props.url+'/api/createFolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        })
            .then((response) => response.json())
            .then((data) => {
                props.reload();
                props.success(true);
                setTimeout(() => {props.success(false)}, 3000);
            })
    }

    function onChangeSwitch(e) {
        if(e.target.checked) {
            setLabelSwitch('Público');
            setPermission(true);
        }else {
            setLabelSwitch('Público');
            setPermission(false);
        }
    }

    function onChangeSwitchPass(e) {
        if(e.target.checked) {
            setLabelSwitchPass('Con contraseña');
            setShowPassword(true);
        } else {
            setLabelSwitchPass('Sin contraseña');
            setShowPassword(false);
        }
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className='div-create-folder'>
            <div className='close-modal'>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => props.show(false)}></button>
            </div>
            <form onSubmit={handleSubmit} className='form-input-file'>
                <h3 className='tittle-modal'>Crear carpeta</h3>
                <div className='divInputLogin'>
                    <img src='/assets/carpeta.png' className='iconLogin'/>
                    <div className="form-floating inputLogin">
                        <input type="text" className="form-control" id="floatingInput" onChange={(event) => {
                                if (event.target.value.length > 20) return;
                                setName(event.target.value)
                            }}/>
                        <label htmlFor="floatingInput">Nombre de la carpeta</label>
                    </div>
                </div>

                <div className='divCheckedPermissionsFolder'>
                    <FormGroup>
                        <FormControlLabel control={<Switch onChange={(e) => {onChangeSwitch(e)}} defaultChecked id='switch-private-public'/>} label={labelSwitch} />
                    </FormGroup>
                    {
                        !permission ?
                            <FormGroup>
                                <FormControlLabel control={<Switch onChange={(e) => {onChangeSwitchPass(e)}} id='switch-password'/>} label={labelSwitchPass} />
                                {
                                    showPassword ? <TextField type='password' id="outlined-basic" label="Contraseña" variant="outlined" onChange={(e) => {onChangePassword(e)}}/> : null
                                }
                            </FormGroup>
                            : null
                    }
                </div>

                <button type="submit" className='btn btn-primary'>Subir</button>
            </form>
        </div>
    );
}

export default CreateFolder;
