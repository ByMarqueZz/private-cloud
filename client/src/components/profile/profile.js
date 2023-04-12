import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {marked} from 'marked';
import './profile.css'
import Home from '../home/Home';

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

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        fetch(props.url+'/api/getUser/'+id)
            .then((response) => response.json())
            .then((data) => {
                if(data[0]) {
                    getReadme(data[0].username);
                    setUser(data[0]);
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
                } else {
                    setIsFollowing(false);
                }
            })
    }

    function unfollow(id) {
        fetch(props.url+'/api/unfollow/'+id+'/'+props.userHash)
            .then((response) => response.text())
            .then((data) => {
                if(data) {
                    setIsFollowing(false);
                } else {
                    setIsFollowing(true);
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
                <div className='profile-picture-div'>
                    <img src={user.profile_picture} className='profile-picture'></img>
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
                    <h3 className='profile-followers-number'><span>{followers}</span> followers</h3>
                    <img className='profile-follows-image-point' src='/assets/point.png'></img>
                    <h3 className='profile-following-number'><span>{following}</span> following</h3>
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
                                <ul className="navbar-nav">
                                    <li className="nav-item li-nav-bar-profile" onClick={() => {
                                        setShowOverview(true);
                                        setShowFiles(false);
                                    }}>
                                        <img src='/assets/book.png' className='icon-nav-bar-profile'></img>
                                        <Link className={showOverview ? 'nav-link active': 'nav-link'} aria-current="page">Overview</Link>
                                    </li>
                                    <li className="nav-item li-nav-bar-profile" onClick={() => {
                                        setShowOverview(false);
                                        setShowFiles(true);
                                    }}>
                                        <img src='/assets/expediente.png' className='icon-nav-bar-profile'></img>
                                        <Link className={showFiles ? 'nav-link active': 'nav-link'}>Files</Link>
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
                                    <p>Si quieres crear un archivo que se muestre en tu perfil en modo presentación, tienes que crear un archivo titulado `README.md` en la raíz de tus archivos. Ten en cuenta las mayúsculas.</p>
                            }
                        </div> : null
                    }

                    {
                        showFiles ? <div>
                            <p>{pathDetails}</p>
                            <Home setDetails={setPathDetails} isPublic={true} url={props.url} path={user.username} logout={props.logout}></Home>
                        </div> : null
                    }

                </div>
            </div>
        </div>
    );
}

export default Profile;