import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Document, Page } from 'react-pdf';
import {marked} from 'marked';
import './preview.css';

// Modal.setAppElement('#root');

const PreviewModal = ({ isOpen, closeModal, file, url, path, download, type }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [fileContent, setFileContent] = useState(null);
    const [readme, setReadme] = useState(null);
    const [i, setI] = useState(0);
    const [isInset, setIsInset] = useState(false);

    const handleLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    function download(path, file, type='file') {
        console.log(path, file, type)
        if (type == 'folder') {
            fetch(url+'/api/downloadFolder/'+path+'/'+file, {
                method: 'GET',
                responseType: 'blob'
            })
                .then((response) => {return response.blob()})
                .then((blob) => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', file + '.zip');
                    document.body.appendChild(link);
                    link.click();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            fetch(url+'/api/download/'+path+'/'+file, {
                method: 'GET',
                responseType: 'blob'
            })
                .then((response) => {return response.blob()})
                .then((blob) => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', file);
                    document.body.appendChild(link);
                    link.click();
                }).catch((error) => {
                console.log(error);
            });
        }
    }

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
        if (file.type === 'text/markdown' || file.type === 'md' || file.type === 'txt') {
            let path;
            if (file.path.includes('/')) {
                //    reemplaza la / por -
                path = file.path.replace(/\//g, '-')
            } else {
                path = file.path
            }
            fetch(url+'/api/getFileToRead/'+path+'/'+file.name)
                .then((response) => response.text())
                .then((data) => {
                    setReadme(marked(data));
                    setFileContent(<div dangerouslySetInnerHTML={{__html: readme}}></div>);
                    setI(i+1)
                })

        } else if (file.type === 'application/pdf' || file.type === 'pdf') {
            fetch(url+'/api/getFileToRead/'+path+'/'+file.name)
                .then((response) => response.blob())
                .then((data) => {
                    const fileBlob = new Blob([data], { type: 'application/pdf' });
                    const fileUrl = URL.createObjectURL(fileBlob);
                    setFileContent(
                        <div className="pdf-preview-container">
                            <embed src={fileUrl} type="application/pdf" width="100%" height="600" />
                        </div>
                    );
                    setI(i+1);
                })
        } else if (file.type.startsWith('jpg') || file.type.startsWith('png') || file.type.startsWith('gif') || file.type.startsWith('jpeg')) {
            let path;
            if (file.path.includes('/')) {
                //    reemplaza la / por -
                path = file.path.replace(/\//g, '-')
            } else {
                path = file.path
            }

            fetch(url+'/api/image/'+path+'/'+file.name)
                .then((res) => res.blob())
                .then((blob) => {
                    setFileContent(<div className='preview-image-type-file'><img src={URL.createObjectURL(blob)} alt={file.name}/></div>);
                })
        } else {
            setFileContent(<p>This file type is not supported for preview.</p>);
        }

        let fileUrl = file.url;
        if (file.type === 'application/pdf') {
            fileUrl += `#page=${pageNumber}`;
        }
    }, [i]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Preview Modal"
            ariaHideApp={false}
            style={{
                content: {
                    inset: isInset ? '0px' : '40px',
                    zIndex:'9999',
                }
            }}
        >
            <div className="preview-modal-content">
                <h2>{file.name}</h2>
                {fileContent}
                <div className='buttonClosePreview'>
                    <img src='/assets/download.png' alt='Boton descargar' onClick={() => {
                        download(path, file.name, type)
                    }}/>
                    <img src='/assets/close.png' alt='Boton cerrar' onClick={closeModal}/>
                </div>
            </div>
        </Modal>
    );
};

export default PreviewModal;
