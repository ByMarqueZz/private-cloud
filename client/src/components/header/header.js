import {useEffect, useState} from 'react';
import './header.css';
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {Navigate, useNavigate} from 'react-router-dom';

function Header(props) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const [imageProfile, setImageProfile] = useState('');

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

    function getUsers() {
        fetch(props.url+'/api/getUsersNames')
        .then((response) => response.json())
        .then((data) => {
            setUsers(data);
            setIsLoading(false);
        })
    }

    const handleInputChange = (event, newValue) => {
        if (newValue !== null && newValue !== '') {
            setValue(newValue);
            let user = users.filter(user => user.username === newValue)
            if (user[0]) {
                navigate('/profile/' + user[0].id);
                props.setId(user[0].id)
                setValue('');
                newValue = '';
            }
        }
        setValue('');
        newValue = '';
    };

  return (
      <>
          <nav className="header navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                  <Link to='/' className="navbar-brand"><span className="titulo"><img src='/assets/cloud-logo.png' className='logo-header'/></span></Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                          aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0 list-header-content">
                          <li className="nav-item">
                              <div className="buscador">
                                  <Stack spacing={2} className='search-usernames-header'>
                                      <Autocomplete
                                          freeSolo
                                          id="free-solo-2-demo"
                                          disableClearable
                                          value={value}
                                          onInputChange={handleInputChange}
                                          options={users.map((user) => user.username)}
                                          renderInput={(params) => (
                                              <TextField
                                                  {...params}
                                                  label="Buscar usuario"
                                                  InputProps={{
                                                      ...params.InputProps,
                                                      type: 'search',
                                                  }}
                                                  style={{zIndex:0}}
                                              />
                                          )}
                                      />
                                  </Stack>
                              </div>
                          </li>

                      </ul>
                      <div className="botones">
                          <ul className="listaBotonesHeader">
                              <li>
                                  <Link to={"/profile/"+props.user.id} onClick={()=>{props.setId(props.user.id)}} className="nav-link active" aria-current="page" ><img src={imageProfile} className="logo logo-with-border"/></Link>
                              </li>
                              <li>
                                  <img src='/assets/logout.png' className='img-logout-header' onClick={props.logout} />
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </nav>

      </>
  );
}

export default Header;
