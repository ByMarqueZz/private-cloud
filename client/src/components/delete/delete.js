import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './delete.css'

function Delete(props) {

    function handleSubmit(event) {
        event.preventDefault();
        props.show(false);
        const formData = new FormData();
        formData.append('file', props.file);
        formData.append('path', props.path);
        formData.append('type', props.type)
        fetch(props.url+'/api/delete', {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                props.reload();
            })
    }

    return (
        <div className='div-form-delete'>
            <form onSubmit={handleSubmit} className='form-input-file'>
                {
                    props.type == 'folder' ? <p>¿Estás seguro de borrar el directorio {props.file} completo?</p> : <p>¿Estás seguro de borrar el archivo {props.file}?</p>
                }

                <button type="submit" className='btn btn-primary'>Borrar</button>
            </form>
        </div>
    );
}

export default Delete;
