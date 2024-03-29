import {useEffect, useState} from 'react';
import './upload.css';
import {Link} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function Upload(props) {
    const [files, setFiles] = useState([]);
    const [labelSwitch, setLabelSwitch] = useState('Público');
    const [permission, setPermission] = useState(true);

    // useEffect(() => {
    //     console.log(files)
    // }, []);

    function handleSubmit(event) {
        let sizes = 0;
        for(let i = 0; i < files.length; i++) {
            sizes += files[i].size;
        }
        if(sizes > 209715200) {
            props.setMaxSize(true);
            setTimeout(() => {
                props.setMaxSize(false);
            }, 3000);
            return;
        }
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
            console.log(data)
            if(data.level_up == true) {
                props.newLevelUp(props.user.level+1)
                props.success(true);
                setTimeout(() => {
                    props.success(false);
                    props.levelUp(true);
                    setTimeout(() => {
                        props.levelUp(false);
                    }, 3000);
                }, 3000);
            } else {
                props.success(true);
                setTimeout(() => {
                    props.success(false);
                }, 3000);
            }
        })
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        for(let i = 0; i < event.dataTransfer.files.length; i++) {
            setFiles((files) => [...files, event.dataTransfer.files[i]]);
        }
    };

    function onChangeSwitch(e) {
        if(e.target.checked) {
            setLabelSwitch('Público');
            setPermission(true);
        } else {
            setLabelSwitch('Privado');
            setPermission(false);
        }
    }

    // function load() {
    //     const input = document.getElementById('file');
    //     const namesList = document.getElementById('file-names-list');
    //
    //     input.addEventListener('change', () => {
    //     const files = input.files;
    //     if (files.length > 0) {
    //         namesList.innerHTML = '';
    //         for (let i = 0; i < files.length; i++) {
    //         const li = document.createElement('li');
    //         li.textContent = files[i].name;
    //         li.style.textAlign = 'left'
    //         namesList.appendChild(li);
    //         }
    //     } else {
    //         namesList.innerHTML = 'Ningún archivo seleccionado';
    //     }
    //     });
    // }

    return (
        <div className='div-upload-files'>
            <div className='close-modal'>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => props.show(false)}></button>
            </div>
            <form onSubmit={handleSubmit} className='form-input-file'>
                <h3 className='tittle-modal'>Subir archivo</h3>
                <div className='divInputLogin'>
                    <img src='/assets/expediente.png' className='iconLogin'/>
                    <div className="file-input" onDragOver={handleDragOver} onDrop={handleDrop}>
                        <input type="file" className="form-control" id="file" hidden onChange={(event) => {
                            if(event.target.files.length > 0) {
                                for(let i = 0; i < event.target.files.length; i++) {
                                    setFiles((files) => [...files, event.target.files[0]]);
                                }
                            }
                        }} multiple />
                        <label htmlFor="file">Seleccionar archivo</label>
                        <ul id="file-names-list">
                            {
                                files.length > 0 ? files.map((file, index) => {
                                    return (
                                        <li key={index} style={{textAlign: 'left'}}>{file.name}</li>
                                    )
                                }): 'Ningún archivo seleccionado'
                            }
                        </ul>
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
