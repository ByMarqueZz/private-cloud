import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';

function Send(props) {
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [arrayImages, setArrayImages] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        fetch(props.url+'/api/getUsersNames')
        .then(response => response.json())
        .then(data => {
            data.map((user, index) => {
                getProfilePicture(user.profile_picture, index);
            })
            setUsers(data);
        })
        .catch(error => console.log(error));
    }

    function getProfilePicture(route, index) {
        fetch(props.url+'/api/image/'+route)
            .then((res) => res.blob())
            .then((blob) => {
                arrayImages[index] = URL.createObjectURL(blob);
                setArrayImages(arrayImages);
                if(index === users.length) setIsLoading(false);
            })
            .catch((err) => console.error(err));
    }

    const handleChange = (event: SelectChangeEvent, newValue) => {
        setUserSelected(newValue);
    };

    function handleSubmit(event) {
        props.show(false);
        event.preventDefault();
        let user = users.filter(user => user.username === userSelected)
        fetch(props.url+'/api/sendFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.id,
                userSelected: user,
                file: props.file
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.message) {
                props.success(true);
                setTimeout(() => {props.success(false)}, 3000);
            }
        })
    }

    if(isLoading) return (<div>Loading...</div>);

    return (
        <div className='div-upload-files'>
            <div className='close-modal'>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => props.show(false)}></button>
            </div>
            <form onSubmit={handleSubmit} className='form-input-file'>
                <div className='divInputLogin'>
                    <FormControl fullWidth>
                        <Stack spacing={10} className='search-usernames-header' style={{alignSelf: 'center'}}>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                value={userSelected}
                                onInputChange={handleChange}
                                options={users.map((user) => user.username)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Enviar a"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                        style={{zIndex:0}}
                                    />
                                )}
                            />
                        </Stack>
                    </FormControl>
                </div>

                <button type="submit" className='btn btn-primary'>Enviar</button>
            </form>
        </div>
    );
}

export default Send;
