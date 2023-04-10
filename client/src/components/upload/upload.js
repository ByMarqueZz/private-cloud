import {useEffect, useState} from 'react';
import './upload.css';
import {Link} from 'react-router-dom';

function Upload(props) {
    const [file, setFile] = useState(null);

    function handleSubmit(event) {
        console.log(file)
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
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

    return (
        <>
            <form onSubmit={handleSubmit} className='form-input-file'>
                <div className='divInputLogin'>
                    <img src='/assets/expediente.png' className='iconLogin'/>
                    <div className="form-floating inputLogin">
                        <input type="file" className="form-control" id="floatingInput" onChange={(event) => setFile(event.target.files[0])}/>
                        <label htmlFor="floatingInput">Archivos a subir</label>
                    </div>
                </div>

                <button type="submit" className='btn btn-primary'>Subir</button>
            </form>
        </>
    );
}

export default Upload;
