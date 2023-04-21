import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

function Rename(props) {
    const [name, setName] = useState(null);
    const [labelSwitch, setLabelSwitch] = useState('Público');
    const [labelSwitchPass, setLabelSwitchPass] = useState('Sin contraseña');
    const [permission, setPermission] = useState(true);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [imageDefault, setImageDefault] = useState('/assets/expediente.png');
    const [icons, setIcons] = useState([]);
    const [superDefault, setSuperDefault] = useState('');

    function setValues() {
        setName(props.file.name);
        setPermission(props.file.permissions);
        if(props.file.password) {
            setPassword(props.file.password);
            setShowPassword(true);
            setLabelSwitchPass('Con contraseña');
        }
    }

    useEffect(() => {
        setValues();
        getIcons();
    }, [props.file]);

    function onChangeName(event) {
        if (event.target.value.length > 20) return;
        setName(event.target.value)
        let extension = event.target.value.split('.').pop();
        let i = 0;
        icons.forEach((icon) => {
            if(icon.type == extension) {
                setImageDefault(icon.path);
                i++;
            }
        });
        if(i == 0) {
            setImageDefault(superDefault);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.show(false);
        let formData = new FormData();
        formData.append('path', props.path);
        formData.append('file', props.file);
        formData.append('type', props.file.type);
        formData.append('newName', name);
        formData.append('permission', permission);
        formData.append('user', props.user.id);
        if(permission) {
            formData.append('password', null);
        } else {
            formData.append('password', password);
        }
        formData.append('lastName', props.file.name)
        fetch(props.url+'/api/rename', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                props.reload();
                props.success(true);
                setTimeout(() => {props.success(false)}, 3000);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function getIcons() {
        fetch(props.url+'/api/getAllIcons')
            .then((response) => response.json())
            .then((data) => {
                setIcons(data);
                let extension = props.file.name.split('.').pop();
                data.forEach((icon) => {
                    if(icon.type == extension) {
                        setSuperDefault(icon.path);
                        setImageDefault(icon.path);
                    }
                });
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
            setPassword(null);
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
                <h3 className='tittle-modal'>Editar fichero</h3>
                <div className='divInputLogin'>
                    {
                        props.file.type == 'folder' ? <img src='/assets/carpeta.png' className='iconLogin'/> : <img src={imageDefault} className='iconLogin'/>
                    }

                    <div className="form-floating inputLogin">
                        <input type="text" className="form-control" id="floatingInput" onChange={(event) => {
                            onChangeName(event)
                        }}/>
                        <label htmlFor="floatingInput">{props.file.name}</label>
                    </div>
                </div>

                <div className='divCheckedPermissionsFolder'>
                    <FormGroup>
                        {
                            props.file.permissions ?
                                <FormControlLabel control={<Switch onChange={(e) => {onChangeSwitch(e)}} defaultChecked id='switch-private-public'/>} label={labelSwitch} />
                                : <FormControlLabel control={<Switch onChange={(e) => {onChangeSwitch(e)}} id='switch-private-public'/>} label={labelSwitch} />
                        }
                    </FormGroup>
                    {
                        props.file.type == 'folder' && !permission ?
                            <FormGroup>
                                {
                                    props.file.password ?
                                        <FormControlLabel control={<Switch onChange={(e) => {onChangeSwitchPass(e)}} defaultChecked id='switch-password'/>} label={labelSwitchPass} />
                                        : <FormControlLabel control={<Switch onChange={(e) => {onChangeSwitchPass(e)}} id='switch-password'/>} label={labelSwitchPass} />
                                }
                                {
                                    showPassword ? <TextField type='password' id="outlined-basic" label="Contraseña" placeholder={password} variant="outlined" onChange={(e) => {onChangePassword(e)}}/> : null
                                }
                            </FormGroup> : ''
                    }
                </div>

                <button type="submit" className='btn btn-primary'>Renombrar</button>
            </form>
        </div>
    );
}

export default Rename;
