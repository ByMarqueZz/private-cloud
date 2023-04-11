import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './components/home/Home';
import Login from './components/login/login';
import Header from './components/header/header';
import Register from './components/register/register';
import Profile from './components/profile/profile';
import EditProfile from './components/edit-profile/edit-profile';

function App() {
    const [userHash, setUserHash] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // URL de la API
    const [url, setUrl] = useState('http://localhost:8282');
    // const [url, setUrl] = useState('https://jointscounter.com:8282');

    useEffect(() => {
        isLogged();
    }, []);

    function isLogged(hashPasado=null) {
        const cookie = document.cookie.split(';').find(c => c.trim().startsWith('id='));
        if(hashPasado) {
            let hash = hashPasado;
            fetch(url+'/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({hash}),
            })
                .then((response) => response.json())
                .then((data) => {
                    if(data[0]) {
                        setUserHash(hashPasado);
                        setUser(data[0]);
                        setIsLoading(false);
                        return <Navigate to={'/'+data[0].username}/>
                    }
                })
        } else if (cookie) {
            // coge cookie y partelo en dos por el igual y guarda en una variable lo de la derecha del igual
            let hash = cookie.split('=')[1];
            fetch(url+'/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({hash}),
            })
                .then((response) => response.json())
                .then((data) => {
                    if(data[0]) {
                        setUserHash(cookie.split('=')[1]);
                        setUser(data[0]);
                        setIsLoading(false);
                        return <Navigate to={'/'+data[0].username}/>
                    } else {
                        setUserHash(null)
                    }
                })
        } else {
            setUserHash(null);
        }
    }

    function logout() {
        document.cookie = 'id=; Max-Age=-99999999;';
        window.location.reload();
        return <Navigate to="/login"/>
    }

    const RequireAuth = ({hash, children}) => {
        // función que comprueba el estado de la sesión y si no existe, redirige a la página de login
        if (hash == null) {
            return <Navigate to="/login"/>
        }
        return children
    };

    if(isLoading) {
        return (
            <>
                <BrowserRouter>
                    <div className='main'>
                        <Routes>
                            <Route path="/" element={<Login user={null} functionLogged={isLogged} url={url}/>}></Route>
                            <Route path="/register" element={<Register user={null} functionLogged={isLogged} url={url}/>}></Route>
                            **<Route path="*" element={<Login user={null} functionLogged={isLogged} url={url}/>}></Route>**
                        </Routes>
                    </div>
                </BrowserRouter>
            </>
        )
    }
      return (
        <>
          <BrowserRouter>
            <Header user={user} logout={logout}/>
              <div className='main'>
                  <Routes>
                      <Route path="/:path?" element={<RequireAuth hash={userHash}><Home url={url} path={user.username} logout={logout}/></RequireAuth>}/>
                      <Route path="/profile/:id" element={<RequireAuth hash={userHash}><Profile url={url} userHash={userHash} logout={logout}></Profile></RequireAuth>}></Route>
                      <Route path="/editProfile" element={<RequireAuth hash={userHash}><EditProfile url={url} user={user}></EditProfile></RequireAuth>}></Route>
                      **<Route path="*" element={<RequireAuth hash={userHash}><Home url={url} path={user.username} logout={logout}/></RequireAuth>}></Route>**
                  </Routes>
              </div>
          </BrowserRouter>
        </>
      );
}

export default App;
