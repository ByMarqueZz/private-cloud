import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './edit-profile.css'

function EditProfile(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [usersAlreadyRegistered, setUsersAlreadyRegistered] = useState([]);
    const [nameAlreadyRegistered, setNameAlreadyRegistered] = useState(false);
    const [file, setFile] = useState(null);
    const [imageProfile, setImageProfile] = useState(null);

    useEffect(() => {
        getUsers();
        getProfilePicture();
    }, []);

    function getProfilePicture() {
        fetch(props.url+'/api/image/'+props.user.profile_picture)
            .then((res) => res.blob())
            .then((blob) => {
                setImageProfile(URL.createObjectURL(blob));
            })
            .catch((err) => console.error(err));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(usersAlreadyRegistered.includes(username.toLowerCase())) {
            setNameAlreadyRegistered(true);
            return;
        } else {
            setNameAlreadyRegistered(false);
        }
        const formData = new FormData();
        formData.append('hash', props.hash)
        if (file) {
            formData.append('file', file);
        }
        if(username) {
            formData.append('username', username);
        }
        if(password) {
            formData.append('password', password);
        }
        if(name) {
            formData.append('name', name);
        }
        if(surname) {
            formData.append('surname', surname);
        }
        fetch(props.url+'/api/editProfile', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if(data) {
                    window.location.reload();
                }
            })
    }

    function getUsers() {
        fetch(props.url+'/api/getUsersNames')
            .then((response) => response.json())
            .then((data) => {
                let dataLowerCase = data.map((user) => user.username.toLowerCase());
                setUsersAlreadyRegistered(dataLowerCase);
            })
    }

    function addEventPreview() {
        const imageUpload = document.getElementById('image-upload');
        const imagePreviewLabel = document.getElementById('image-preview-label');
        const imagePreview = document.getElementById('image-preview');

        imagePreviewLabel.addEventListener('click', function() {
            imageUpload.click();
        });

        imageUpload.addEventListener('change', function() {
            const file = this.files[0];

            if (file) {
                const reader = new FileReader();
                reader.addEventListener('load', function() {
                    imagePreview.src = reader.result;
                });

                reader.readAsDataURL(file);
            }
        });
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        var preview = event.target.parentNode.querySelector('.file-preview');
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function() {
            preview.innerHTML = '<img src="' + reader.result + '" class="filePreviewImg">';
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.innerHTML = '<i className="fas fa-plus"></i>';
        }
    };

    return (
        <div className='container-edit-profile'>
            <h3>Editar perfil</h3>
            <div className='container-edit-profile-form'>
                <form onSubmit={handleSubmit} className="form-edit-profile">
                    <div className="file-upload">
                        <label htmlFor="file-input">
                            <div className="file-preview">
                                <img src={imageProfile} className='fotoAddPhotoUpload' alt='profile picture'/>
                            </div>
                        </label>
                        <input id="file-input" type="file" onChange={handleFileChange} required hidden/>
                    </div>
                    <p className='indicative-text-edit-profile'>Pulsa en la foto para editar la foto de perfil</p>

                    <div className='divInputLogin'>
                        <div className="form-floating inputLogin">
                            <input type="text" className="form-control" id="floatingName" placeholder="Password" onChange={(event) => setName(event.target.value)}/>
                            <label htmlFor="floatingPassword">Nombre: {props.user.name}</label>
                        </div>
                    </div>

                    <div className='divInputLogin'>
                        <div className="form-floating inputLogin">
                            <input type="text" className="form-control" id="floatingSurname" placeholder="Password" onChange={(event) => setSurname(event.target.value)}/>
                            <label htmlFor="floatingPassword">Apellidos: {props.user.surname}</label>
                        </div>
                    </div>

                    <div className='divInputLogin'>
                        <div className="form-floating inputLogin">
                            <input disabled type="email" className="form-control input-emaill-edit-profile" id="floatingEmail" placeholder="Password" onChange={(event) => setEmail(event.target.value)}/>
                            <label htmlFor="floatingPassword">Correo: deshabilitado</label>
                        </div>
                    </div>

                    <div className='divInputLogin'>
                        <div className="form-floating inputLogin">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(event) => setUsername(event.target.value)}/>
                            <label htmlFor="floatingInput">Usuario: {props.user.username}</label>
                            {
                                nameAlreadyRegistered ? <p className='error'>El nombre de usuario ya está registrado</p> : null
                            }
                        </div>
                    </div>

                    <div className='divInputLogin'>
                        <div className="form-floating inputLogin">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                            <label htmlFor="floatingPassword">Contraseña</label>
                        </div>
                    </div>

                    <button onClick={handleSubmit} type="submit" className='loginButtons btn'>Editar</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
