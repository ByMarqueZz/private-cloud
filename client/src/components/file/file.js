import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./file.css";
import PopoverOption from "../popover/popover";
import PopoverPublic from "../popoverpublic/popoverpublic";
import PreviewModal from "../preview/preview";

function File(props) {
    const [imageUrl, setImageUrl] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
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
        if (props.file.name.match(/\.(png|jpe?g)$/i)) {
            fetch(`${props.url}/api/image/${props.path}/${props.file.name}`)
                .then((res) => res.blob())
                .then((blob) => {
                    setImageUrl(URL.createObjectURL(blob));
                })
                .catch((err) => console.error(err));
        }
    }, [props.file.name, props.path]);

    return (
        <div className='div-component-file'>
            <Link className="link">
                <div className="parent-directory-button-div">
                    <div className="content-clickable-directory" onClick={
                        () => {
                            setShowPreview(!showPreview)
                        }
                    }>
                        {imageUrl ? (
                            <img className="parent-directory-button-div-image" src={imageUrl}></img>
                        ) : props.file.name.match(/\.(png|jpe?g)$/i) ? (
                            <div className="parent-directory-button-div-image-loading">Loading...</div>
                        ) : (
                            <>
                                <img className="parent-directory-button-div-image" src="/assets/expediente.png"></img>
                            </>
                        )}
                        <span>{props.file.name}</span>
                    </div>

                    {
                        props.isPublic == false ?
                            <PopoverOption sendModal={props.sendModal} renameModal={props.renameModal} showPass3={props.showPass3} url={props.url} renameModal={props.renameModal} file={props.file} type={'file'} modalDelete={props.modalDelete} path={props.path} download={props.download}/>
                            : <PopoverPublic url={props.url} file={props.file} type='file' path={props.path} download={props.download}/>
                    }

                </div>
            </Link>
            {
                showPreview ?
                    <PreviewModal isOpen={showPreview} type={'file'} closeModal={() => setShowPreview(false)} file={props.file} url={props.url} path={props.path} download={props.download}/>
                    : null
            }
            {
                !isLoading && imageSharedBy ? <div className='imagen-shared-by-top'>
                    <span>Compartido por: </span>
                    <img src={imageSharedBy}/>
                    <span className='span-username'>{props.file.shared_username}</span>
                </div> : null
            }
        </div>
    );
}

export default File;
