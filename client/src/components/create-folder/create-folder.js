import {useEffect, useState} from 'react';
import './create-folder.css';
import {Link} from 'react-router-dom';

function CreateFolder(props) {
    const [name, setName] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        props.show(false);
        fetch(props.url+'/api/createFolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, path: props.path}),
        })
        .then((response) => response.json())
        .then((data) => {
            props.reload();
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='form-input-file'>
                <div className='divInputLogin'>
                    <img src='/assets/expediente.png' className='iconLogin'/>
                    <div className="form-floating inputLogin">
                        <input type="text" className="form-control" id="floatingInput" onChange={(event) => setName(event.target.value)}/>
                        <label htmlFor="floatingInput">Nombre de la carpeta</label>
                    </div>
                </div>

                <button type="submit" className='btn btn-primary'>Subir</button>
            </form>
        </>
    );
}

export default CreateFolder;
