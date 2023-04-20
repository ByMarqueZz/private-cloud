import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Document, Page } from 'react-pdf';
import {marked} from 'marked';
import './edit-file.css';
import Alert from '@mui/material/Alert';

const EditFile = (props) => {
    const [fileContent, setFileContent] = useState(null);
    const [readme, setReadme] = useState(null);
    const [i, setI] = useState(0);
    const [isInset, setIsInset] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [canEditArray, setCanEditArray] = useState(['text/markdown', 'md', 'txt', 'html', 'css', 'js', 'json', 'py', 'java', 'c', 'cpp', 'cs', 'go', 'php', 'rb', 'sh', 'swift', 'ts', 'xml', 'yaml', 'yml', 'md', 'markdown', 'rtf']);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if(window.innerWidth < 768){
                setIsInset(true);
            } else {
                setIsInset(false);
            }
        })
        if (i == 2) {
            return;
        }
        if (props.file.type === 'text/markdown' || props.file.type === 'md' || props.file.type === 'txt') {
            let path;
            if (props.file.path.includes('/')) {
                //    reemplaza la / por -
                path = props.file.path.replace(/\//g, '-')
            } else {
                path = props.file.path
            }
            fetch(props.url+'/api/getFileToRead/'+path+'/'+props.file.name)
                .then((response) => response.text())
                .then((data) => {
                    setReadme(marked(data));
                    setFileContent(<div dangerouslySetInnerHTML={{__html: readme}}></div>);
                    setI(i+1)
                })

        } else {
            setFileContent(<p>This file type is not supported for preview.</p>);
        }

        let fileUrl = props.file.url;
    }, [i]);

    function handleChangeTextArea(event) {
        setReadme(event.target.value);
    }

    function handleSaveFile() {
        fetch(props.url+'/api/saveFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: readme,
                path: props.file.path,
                name: props.file.name,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            setIsSaved(true);
            setTimeout(() => {setIsSaved(false)}, 3000);
        })
    }

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.closeModal}
                contentLabel="Preview Modal"
                ariaHideApp={false}
                style={{
                    content: {
                        inset: isInset ? '0px' : '40px',
                        zIndex:'9999',
                    }
                }}
            >
                <div className="preview-modal-content-file">
                    <h2>{props.file.name}</h2>

                        <textarea className='textarea-edit-file' value={readme} onChange={(e) => {handleChangeTextArea(e)}}></textarea>
                    <div className='buttonClosePreview edit-file-modal'>
                        {
                            canEditArray.includes(props.file.type) ?
                                <img src='/assets/save.png' alt='Editar' onClick={() => {
                                    handleSaveFile();
                                }}/>
                                : null
                        }
                        <img src='/assets/close.png' alt='Boton cerrar' onClick={props.closeModal}/>
                    </div>
                </div>
            </Modal>
            {
                isSaved ? <div className='alert-success'><Alert severity="success">Archivo guardado correctamente</Alert></div> : null
            }
        </>
    );
};

export default EditFile;
