import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {marked} from 'marked';
import './profile.css'
import Home from '../home/Home';
import Mission from '../mission/mission';

function Profile(props) {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(window.location.pathname.split('/')[2]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasReadme, setHasReadme] = useState(false);
    const [readme, setReadme] = useState(null);
    const [showOverview, setShowOverview] = useState(true);
    const [showFiles, setShowFiles] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);
    const [pathDetails, setPathDetails] = useState(null);
    const [imageProfile, setImageProfile] = useState(null);
    const [styleSpan, setStyleSpan] = useState('');
    const [namePng, setNamePng] = useState('');
    const [missions, setMissions] = useState(null);
    const [showMissions, setShowMissions] = useState(false);

    useEffect(() => {
        getUser();
        setTimeout(() => {getUser()}, 1000);
    }, [props.id_profile]);

    function getProfilePicture(image) {
        fetch(props.url+'/api/image/'+image)
            .then((res) => res.blob())
            .then((blob) => {
                setImageProfile(URL.createObjectURL(blob));
            })
            .catch((err) => console.error(err));
    }

    function getUser() {
        fetch(props.url+'/api/getUser/'+id)
            .then((response) => response.json())
            .then((data) => {
                if(data[0]) {
                    getReadme(data[0].username);
                    setUser(data[0]);
                    getProfilePicture(data[0].profile_picture);
                    getFrame(data[0].level);
                    getMissions(data[0].level);
                    setIsLoading(false);
                    getFollowers(data[0].id)
                    setPathDetails(data[0].username+'-');
                    if (data[0].hash === props.userHash) {
                        setIsOwner(true);
                    } else {
                        getFollow(data[0].id);
                    }
                }
            })
    }

    function getMissions(level) {
        fetch(props.url+'/api/getMissions/'+level)
            .then((response) => response.json())
            .then((data) => {
                setMissions(data);
                setShowMissions(true);
            })
    }

    function getFrame(level) {
        fetch(props.url+'/api/profileFrame/'+props.user.id+'/'+level)
            .then((response) => response.json())
            .then((data) => {
                setStyleSpan(data.style);
                setNamePng(data.level);
            })
    }

    function getFollow(id) {
        fetch(props.url+'/api/getifFollow/'+id+'/'+props.userHash)
            .then((response) => response.text())
            .then((data) => {
                //comprueba si data es un array vacio
                if(data != '[]') {
                    setIsFollowing(true);
                } else {
                    setIsFollowing(false);
                }
            })
    }

    function getReadme(path) {
        fetch(props.url+'/api/getReadme/'+path)
            .then((response) => response.text())
            .then((data) => {
                setHasReadme(true);
                setReadme(marked(data));
            })
    }

    function follow(id) {
        fetch(props.url+'/api/follow/'+id+'/'+props.userHash)
            .then((response) => response.text())
            .then((data) => {
                if(data) {
                    setIsFollowing(true);
                    setFollowers(followers+1);
                } else {
                    setIsFollowing(false);
                    setFollowers(followers-1);
                }
            })
    }

    function unfollow(id) {
        fetch(props.url+'/api/unfollow/'+id+'/'+props.userHash)
            .then((response) => response.text())
            .then((data) => {
                if(data) {
                    setIsFollowing(false);
                    setFollowers(followers-1);
                } else {
                    setIsFollowing(true);
                    setFollowers(followers+1);
                }
            })
    }

    function getFollowers(id) {
        fetch(props.url+'/api/getFollowers/'+id)
            .then((response) => response.json())
            .then((data) => {
                setFollowers(data.followers);
                setFollowing(data.following);
            })
    }

    if(isLoading) return <div className='loading-div'><img className='loading-image' src='/assets/loading.gif'></img></div>

    return (
        <div className='main-profile'>
            <div className='first-part-profile-div'>
                <div className='div-marco'>
                    <div className='profile-name-div'>
                        <img src={imageProfile} className='profile-picture'></img>
                    </div>
                    <div className='div-child-marco'>
                        <img src={namePng} className='foto-marco'></img>
                    </div>
                    <span className={'level-number '+styleSpan}>{user.level}</span>
                </div>
                <div className='profile-data-div'>
                    <h1 className='profile-name'>{user.name+' '+user.surname}</h1>
                    <h3 className='profile-username'>{user.username}</h3>
                    <p className='profile-description'>{user.description}</p>
                </div>
                <div className='profile-edit-div'>
                    {
                        isOwner == false ?
                            isFollowing == true ? <button className='profile-edit-button btn' onClick={() => {unfollow(user.id)}}>Dejar de seguir</button>:
                            <button className='profile-edit-button btn' onClick={() => {follow(user.id)}}>Seguir</button>
                             : <Link to={'/editProfile'}><button className='profile-edit-button btn'>Editar perfil</button></Link>

                    }
                </div>
                <div className='profile-follows-div'>
                    <img className='profile-follows-image' src='/assets/follows.png'></img>
                    <h3 className='profile-followers-number'><span>{followers}</span> seguidores</h3>
                    <img className='profile-follows-image-point' src='/assets/point.png'></img>
                    <h3 className='profile-following-number'><span>{following}</span> siguiendo</h3>
                </div>
                <div className='div-missions'>
                    {
                        showMissions && isOwner ? 
                        missions.map((mission, index) => {
                            return <Mission key={index} mission={mission} user={props.user} url={props.url}/>
                        })
                        : null
                    }
                </div>
            </div>

            <div className='second-part-profile-div'>
                <div className='profile-menu-div'>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav nav-bar-routes-profile">
                                    <li className="nav-item li-nav-bar-profile" onClick={() => {
                                        setShowOverview(true);
                                        setShowFiles(false);
                                    }}>
                                        <img src='/assets/book.png' className='icon-nav-bar-profile'></img>
                                        <Link className={showOverview ? 'nav-link active': 'nav-link'} aria-current="page">Descripción general</Link>
                                    </li>
                                    <li className="nav-item li-nav-bar-profile" onClick={() => {
                                        setShowOverview(false);
                                        setShowFiles(true);
                                    }}>
                                        <img src='/assets/expediente.png' className='icon-nav-bar-profile'></img>
                                        <Link className={showFiles ? 'nav-link active': 'nav-link'}>Archivos</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className='profile-content-div'>
                    {
                        showOverview ? <div>
                            {
                                hasReadme ? <div className='has-readme-profile'>
                                        <p>{user.username}/README.md</p>
                                        <div dangerouslySetInnerHTML={{__html: readme}}></div>
                                    </div> :
                                    props.id_profile == props.user.id ?
                                    <p>Si quieres crear un archivo que se muestre en tu perfil en modo presentación, tienes que crear un archivo titulado `README.md` en la raíz de tus archivos. Ten en cuenta las mayúsculas.</p> :
                                        <p>El usuario no tiene ningún archivo de presentación</p>
                            }
                        </div> : null
                    }

                    {
                        showFiles ? <div>
                            <p>{pathDetails}</p>
                            <Home setDetails={setPathDetails} setPath={props.setPath} isPublic={true} url={props.url} path={user.username} logout={props.logout} user={props.user}></Home>
                        </div> : null
                    }

                </div>
            </div>
        </div>
    );
}

export default Profile;
