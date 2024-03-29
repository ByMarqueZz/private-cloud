import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./file.css";
import PopoverOption from "../popover/popover";
import PopoverPublic from "../popoverpublic/popoverpublic";
import PreviewModal from "../preview/preview";
import EditFile from "../edit-file/edit-file";

function File(props) {
    const [imageUrl, setImageUrl] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [imageSharedBy, setImageSharedBy] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showEditFile, setShowEditFile] = useState(false);
    const [imageDefault, setImageDefault] = useState(null);

    useEffect(() => {
        setIcons();
        if(props.file.shared_by_id) {
            fetch(props.url+'/api/image/'+props.file.shared_profile_picture)
                .then((res) => res.blob())
                .then((blob) => {
                    setImageSharedBy(URL.createObjectURL(blob));
                    setIsLoading(false);
                })
        }
        if (/\.(png|jpe?g)$/i.test(props.file.name)) {
            let url = `${props.url}/api/image/${props.path}/${props.file.name}`;
            if(props.isPublic) {
                url = `${props.url}/api/image/${props.publicPath}/${props.file.name}`;
            }
            fetch(url)
                .then((res) => res.blob())
                .then((blob) => {
                    setImageUrl(URL.createObjectURL(blob));
                    setIsLoading(false);
                })
                .catch((err) => console.error(err));
        }
    }, [props.file.name, props.path]);

    function setIcons() {
        fetch(props.url+'/api/icons/'+props.file.type)
            .then((res) => res.json())
            .then((data) => {
                setImageDefault(data[0].path);
            })
    }

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
                        ) : (
                            <>
                                <img className="parent-directory-button-div-image" src={imageDefault}></img>
                            </>
                        )}
                        {
                            props.file.name.length > 20 ? <span className="span-file-name">{props.file.name.substring(0, 20)}...</span> : <span className="span-file-name">{props.file.name}</span>
                        }
                    </div>

                    {
                        props.isPublic == false ?
                            <PopoverOption sendModal={props.sendModal} renameModal={props.renameModal} showPass3={props.showPass3} url={props.url} file={props.file} type={'file'} modalDelete={props.modalDelete} path={props.path} download={props.download}/>
                            : <PopoverPublic url={props.url} file={props.file} type='file' path={props.path} download={props.download}/>
                    }

                </div>
            </Link>
            {
                showPreview ?
                    <PreviewModal isOpen={showPreview} type={'file'} closeModal={() => setShowPreview(false)} file={props.file} url={props.url} path={props.path} download={props.download} showEdit={setShowEditFile}/>
                    : null
            }
            {
                showEditFile ?
                      <EditFile isOpen={showEditFile} closeModal={() => setShowEditFile(false)} file={props.file} url={props.url} path={props.path}/>
                    : null
            }
            {
                !isLoading && imageSharedBy ? <Link className='link-shared-by' to={'/profile/'+props.file.shared_by_id}>
                    <div className='imagen-shared-by' >
                        <span>Compartido por: </span>
                        <img src={imageSharedBy}/>
                        <span className='span-username'>{props.file.shared_username}</span>
                    </div>
                </Link> : null
            }
        </div>
    );
}

export default File;
