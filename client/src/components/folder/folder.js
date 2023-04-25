import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PopoverOption from "../popover/popover";
import PopoverPublic from "../popoverpublic/popoverpublic";
import PreviewModal from "../preview/preview";

function Folder(props) {
    const [imageSharedBy, setImageSharedBy] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if(props.file.shared_by_id) {
            fetch(props.url+'/api/image/'+props.file.shared_profile_picture)
                .then((res) => res.blob())
                .then((blob) => {
                    setImageSharedBy(URL.createObjectURL(blob));
                    setIsLoading(false);
                })
        }
    }, [props.file.name, props.path]);

    return (
        <div className='div-component-file'>
                <div className='parent-directory-button-div'>
                    {
                        props.isPublic == false ? <Link className='link'>
                                <div className='content-clickable-directory' onClick={() => {
                                    props.settingPath(props.path+'-'+props.file.name, props.file.password);
                                }}>
                                    {
                                        props.file.password != null ? <img className='parent-directory-button-div-image' src='/assets/carpeta_candado.png'></img> :
                                            <img className='parent-directory-button-div-image' src='/assets/carpeta.png'></img>
                                    }
                                    <span>{props.file.name}</span>
                                </div>
                            </Link> :
                            <div className='content-clickable-directory' onClick={() => {
                                props.setPath(props.path+'-'+props.file.name)
                                // props.setDetails(props.path+'-'+props.file.name);
                            }}>
                                <img className='parent-directory-button-div-image' src='/assets/carpeta.png'></img>
                                <span>{props.file.name}</span>
                            </div>
                    }

                    {
                        props.isPublic == false ?
                            <PopoverOption sendModal={props.sendModal} renameModal={props.renameModal} showPass3={props.showPass3} url={props.url}  file={props.file} type={'folder'} modalDelete={props.modalDelete} path={props.path} download={props.download}/>
                            : <PopoverPublic url={props.url} file={props.file} type='folder' path={props.file.path} download={props.download}/>
                    }
                </div>
            {
                !isLoading && imageSharedBy ? <>

                    {
                        props.file.name != 'Compartido' ? <Link className='link-shared-by' to={'/profile/'+props.file.shared_by_id}>
                            <div className='imagen-shared-by' >
                                <span>Compartido por: </span>
                                <img src={imageSharedBy}/>
                                <span className='span-username'>{props.file.shared_username}</span>
                            </div>
                        </Link> : <>
                            <Link to={'/profile/'+props.file.shared_by_id} className='link-shared-by'>
                                <div className='imagen-shared-by' >
                                    <span>Compartido por: </span>
                                    <img src={imageSharedBy}/>
                                    <span className='span-username'>{props.file.shared_username}</span>
                                </div>
                            </Link>
                            <img src='/assets/chincheta.png' className='chincheta-absolute'/>
                        </>
                    }
                </> : null
            }
        </div>
    );
}

export default Folder;
