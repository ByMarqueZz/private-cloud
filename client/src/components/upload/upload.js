import {useEffect, useState} from 'react';
import './upload.css';
import {Link} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function Upload(props) {
    const [files, setFiles] = useState([]);
    const [labelSwitch, setLabelSwitch] = useState('Public');
    const [permission, setPermission] = useState(true);

    useEffect(() => {
        load();
    }, []);

    function handleSubmit(event) {
        props.show(false);
        event.preventDefault();
        const formData = new FormData();
        formData.append('user_id', props.user.id)
        formData.append('permissions', permission)
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
          }
        formData.append('path', props.path);
        fetch(props.url+'/api/upload', {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            props.reload();
        })
    }

    function onChangeSwitch(e) {
        if(e.target.checked) {
            setLabelSwitch('Public');
            setPermission(true);
        } else {
            setLabelSwitch('Private');
            setPermission(false);
        }
    }

    function load() {
        const input = document.getElementById('file');
        const namesList = document.getElementById('file-names-list');

        input.addEventListener('change', () => {
        const files = input.files;
        if (files.length > 0) {
            namesList.innerHTML = '';
            for (let i = 0; i < files.length; i++) {
            const li = document.createElement('li');
            li.textContent = files[i].name;
            li.style.textAlign = 'left'
            namesList.appendChild(li);
            }
        } else {
            namesList.innerHTML = 'Ningún archivo seleccionado';
        }
        });
    }

    return (
        <div className='div-upload-files'>
            <div className='close-modal'>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => props.show(false)}></button>
            </div>
            <form onSubmit={handleSubmit} className='form-input-file'>
                <div className='divInputLogin'>
                    <img src='/assets/expediente.png' className='iconLogin'/>
                    <div className="file-input">
                        <input type="file" className="form-control" id="file" hidden onChange={(event) => {
                            setFiles(event.target.files)
                        }} multiple />
                        <label htmlFor="file">Seleccionar archivo</label>
                        <span id="file-names-list">Ningún archivo seleccionado</span>
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

export default Upload;
