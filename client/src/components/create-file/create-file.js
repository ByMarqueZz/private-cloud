import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

function CreateFile(props) {
    const [name, setName] = useState(null);
    const [labelSwitch, setLabelSwitch] = useState('Público');
    const [permission, setPermission] = useState(true);
    const [imageDefault, setImageDefault] = useState('/assets/create-file.png');
    const [icons, setIcons] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        props.show(false);

        fetch(props.url+'/api/createFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, permission, path: props.path, user_id: props.user.id}),
        })
            .then((response) => response.json())
            .then((data) => {
                props.reload();
                props.success(true);
                setTimeout(() => {
                    props.success(false);
                }, 3000);
            })
    }

    useEffect(() => {
        getIcons();
    }, []);

    function getIcons() {
        fetch(props.url+'/api/getAllIcons')
            .then((response) => response.json())
            .then((data) => {
                setIcons(data);
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
            setImageDefault('/assets/create-file.png');
        }
    }

    return (
        <div className='div-create-folder'>
            <div className='close-modal'>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => props.show(false)}></button>
            </div>
            <form onSubmit={handleSubmit} className='form-input-file'>
                <h3 className='tittle-modal'>Crear archivo</h3>
                <div className='divInputLogin'>
                    <img src={imageDefault} className='iconLogin'/>
                    <div className="form-floating inputLogin">
                        <input type="text" className="form-control" id="floatingInput" onChange={(event) => {
                            onChangeName(event);
                        }}/>
                        <label htmlFor="floatingInput">Nombre del archivo</label>
                    </div>
                </div>

                <div className='divCheckedPermissionsFolder'>
                    <FormGroup>
                        <FormControlLabel control={<Switch onChange={(e) => {onChangeSwitch(e)}} defaultChecked id='switch-private-public'/>} label={labelSwitch} />
                    </FormGroup>
                </div>

                <button type="submit" className='btn btn-primary'>Crear</button>
            </form>
        </div>
    );
}

export default CreateFile;
