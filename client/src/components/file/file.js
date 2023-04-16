import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./file.css";

function File(props) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
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
        <>
            <Link className="link">
                <div className="parent-directory-button-div">
                    <div
                        className="content-clickable-directory"
                        onClick={() => {
                            props.download(props.path, props.file.name);
                        }}
                    >
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
                        props.isPublic == false ? <img
                            className="options-files-home"
                            src="/assets/options.png"
                            onClick={() => {
                                props.modalDelete(props.file.name, "file");
                            }}
                        ></img> : ''
                    }

                </div>
            </Link>
        </>
    );
}

export default File;
