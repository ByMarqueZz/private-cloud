import './Home.css';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Upload from '../upload/upload';
import CreateFolder from '../create-folder/create-folder';
import Delete from '../delete/delete';
import File from '../file/file';
import Grid from '@mui/material/Grid';
import PopoverOption from '../popover/popover';
import PopoverPublic from '../popoverpublic/popoverpublic';
import ModalPassword from '../modal-password/modal-password';
import Rename from '../rename/rename';
import Send from '../send/send';
import Folder from '../folder/folder';
import Alert from '@mui/material/Alert';
import CreateFile from '../create-file/create-file';

function Home(props) {
  const [files, setFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showCreateFile, setShowCreateFile] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [fileDelete, setFileDelete] = useState(null);
  const [type, setType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [showModalPassword2, setShowModalPassword2] = useState(false);
  const [showModalPassword3, setShowModalPassword3] = useState(false);
  const [passwords, setPasswords] = useState('');
  const [newPath, setNewPath] = useState('');
  const [showRename, setShowRename] = useState(false);
  const [fileRename, setFileRename] = useState(null);
  const [typeRename, setTypeRename] = useState(null);
  const [fileCanDownload, setFileCanDownload] = useState(null);
  const [pathCanDownload, setPathCanDownload] = useState(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [fileSend, setFileSend] = useState(null);
  const [typeSend, setTypeSend] = useState(null);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [createFolderSuccess, setCreateFolderSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [renameSuccess, setRenameSuccess] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [createFileSuccess, setCreateFileSuccess] = useState(false);
  const [notDirectoryState, setNotDirectoryState] = useState(false);

    useEffect(() => {
        getPath();
    }, [props.path]);

    function getPath() {
        setFiles([]);
        setIsLoading(true);
        fetch(props.url + '/api/getPath/'+props.path)
        .then(response => response.json())
        .then(data => {
            if(data.messageError) {
                setNotDirectoryState(true)
            } else {
                let files = orderFiles(data.rows);
                setFiles(files);
                setIsLoading(false);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function orderFiles(data) {
        let filesOrdered = [];
        let sharedFile = null;
        data.forEach((file) => {
            if (file.name === 'Compartido') {
                sharedFile = file; // Si encontramos el archivo "Compartido", lo guardamos para añadirlo al principio del array después
            } else if (file.name.includes('.')) {
                filesOrdered.push(file);
            } else {
                filesOrdered.unshift(file);
            }
        });
        if (sharedFile) {
            filesOrdered.unshift(sharedFile); // Añadimos el archivo "Compartido" al principio del array
        }
        return filesOrdered;
    }

    function download(path, file, mode, type='file') {
        if (type == 'folder') {
            if(file.password) {
                setPasswords(file.password);
                setFileCanDownload(file);
                setPathCanDownload(path);
                setShowModalPassword2(true);
            } else {
                fetch(props.url+'/api/downloadFolder/'+path+'/'+file.name+'/'+mode, {
                    method: 'GET',
                    responseType: 'blob'
                })
                    .then((response) => {return response.blob()})
                    .then((blob) => {
                        const url = window.URL.createObjectURL(new Blob([blob]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', file.name + '.zip');
                        document.body.appendChild(link);
                        link.click();
                        setDownloadSuccess(true);
                        setTimeout(() => {setDownloadSuccess(false)}, 3000);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            fetch(props.url+'/api/download/'+path+'/'+file.name, {
                method: 'GET',
                responseType: 'blob'
            })
                .then((response) => {return response.blob()})
                .then((blob) => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', file.name);
                    document.body.appendChild(link);
                    link.click();
                    setDownloadSuccess(true);
                    setTimeout(() => {setDownloadSuccess(false)}, 3000);
                }).catch((error) => {
                console.log(error);
            });
        }
    }

    function modalDelete(file, type) {
        setFileDelete(file);
        setType(type)
        setShowDelete(!showDelete);
    }

    function settingPath(path, password) {
        if(password != null) {
            setPasswords(password)
            setNewPath(path);
            setShowModalPassword(true);
        } else {
            props.setPath(path);
        }
    }

    function renameModal(file, type) {
        setFileRename(file);
        setTypeRename(type);
        setShowRename(!showRename);
    }

    function showPass3(file, type) {
        setPasswords(file.password);
        setShowModalPassword3(true);
    }

    function sendToModal(file, type) {
        setFileSend(file);
        setTypeSend(type);
        setShowSendModal(!showSendModal);
    }

    if(isLoading && !notDirectoryState) {
        return (
            <div className='container-home'>
                <div className='loading'>
                    <img src='/assets/loading.gif'/>
                </div>
            </div>
        )
    }

    if (notDirectoryState) {
        return (
            <div className='container-home'>
                <div className='not-directory'>
                    <h1>Error 404</h1>
                    <img src='/assets/empty.png'/>
                    <p>El directorio {props.path} no existe. Está intentando acceder a una carpeta que no está registrada en nuestro sistema vuelva atrás para continuar</p>
                    <button className='btn btn-primary' onClick={() => {props.setPath(props.path.split('-').slice(0, -1).join('-'))}}>Volver atrás</button>
                </div>
            </div>
        )
    }

  return (
      <div className='container-home'>
          {
              props.isPublic == false ? <p className='path-home-show'>{props.path}</p> : ''
          }
          <div className='button-upload-no-buttons'>
              {
                  props.isPublic == false ?
                      <>
                          <button className='btn btn-upload' onClick={() => {
                              setShowUpload(!showUpload)
                          }}><img src='/assets/upload.png' className="logo-upload-button"/></button>
                          <button className='btn btn-upload' onClick={() => {
                              setShowCreateFolder(!showCreateFolder)
                          }}><img src='/assets/add-folder.png' className="logo-upload-button"/></button>
                          <button className='btn btn-upload' onClick={() => {
                              setShowCreateFile(!showCreateFile)
                          }}><img className='logo-upload-button' src='/assets/create-file.png'/></button>
                      </> : ''
              }
          </div>
          <div className='path-div'>
              <Grid container spacing={2}>
              {
                  props.path.includes('-') ?
                            props.isPublic == false ? <Grid item className='grid-item-home' xs={12} sm={6} md={4} lg={4} xl={4}><Link className='link' onClick={() => {
                              props.setPath(props.path.split('-').slice(0, -1).join('-'))}
                          }>
                              <div className='parent-directory-button-div'>
                                  <div className='content-clickable-directory'>
                                      <img className='parent-directory-button-div-image' src='/assets/carpeta_padre.png'></img>
                                      <span>Directorio anterior</span>
                                  </div>
                              </div>
                                </Link></Grid> :
                                <Grid item className='grid-item-home' xs={12} sm={6} md={4} lg={4} xl={4}>
                              <div className='parent-directory-button-div' onClick={() => {
                                  props.setPath(props.path.split('-').slice(0, -1).join('-'));
                                  //quita el ultimo directorio del path
                                    let pathArray = props.path.split('-');
                                    pathArray.pop();
                                    pathArray = pathArray.join('-');
                                    props.setDetails(pathArray+'-');
                              }}>
                                  <div className='content-clickable-directory'>
                                      <img className='parent-directory-button-div-image' src='/assets/carpeta_padre.png'></img>
                                      <span>Directorio anterior</span>
                                    </div>
                              </div></Grid>
                  : ''
              }
              {
                  isLoading == false ?
                      <>
                          {
                              files.length == 0 ? props.isPublic ? <div className='container-home'><div className='loading'>NO HAY ARCHIVOS PÚBLICOS</div></div> : <Grid item className='grid-item-home' xs={12} sm={6} md={4} lg={4} xl={4}>
                                      <div className='parent-directory-button-div'>
                                          <div className='content-clickable-directory'>
                                              <img className='parent-directory-button-div-image' src='/assets/empty.png'></img>
                                              <span>Directorio vacío</span>
                                          </div>
                                      </div>
                                  </Grid> :
                                  files.map((file, index) => {
                                      if(props.isPublic == true && file.permissions == 0) {
                                            return '';
                                      }
                                      if (file.type != 'folder') {
                                          return (
                                                <Grid item className='grid-item-home' xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                                                    <File sendModal={sendToModal} renameModal={renameModal} showPass3={showPass3} isPublic={props.isPublic} url={props.url} file={file} path={props.path} modalDelete={modalDelete} download={download}></File>
                                                </Grid>
                                          )
                                      } else {
                                          return(
                                                <Grid item className='grid-item-home' xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                                                    <Folder download={download} setPath={props.setPath} sendModal={sendToModal} renameModal={renameModal} showPass3={showPass3}  isPublic={props.isPublic} url={props.url} file={file} path={props.path} modalDelete={modalDelete} settingPath={settingPath}></Folder>
                                                </Grid>
                                              )

                                          }
                                  })
                            }
                      </>
                      : <div className='container-home'><div className='loading'>CARGANDO</div></div>
              }
                </Grid>
          </div>

          {/*MODALS*/}
          {
                showUpload ? <Upload success={setUploadSuccess} user={props.user} show={setShowUpload} path={props.path} url={props.url} reload={() => {
                    setTimeout(() => {
                        getPath();
                    }, 500);
                }}/> : ''
          }
          {
                showCreateFolder ? <CreateFolder success={setCreateFolderSuccess} user={props.user} show={setShowCreateFolder} path={props.path} url={props.url} reload={getPath}/> : ''
          }
          {
                showCreateFile ? <CreateFile success={setCreateFileSuccess} user={props.user} show={setShowCreateFile} path={props.path} url={props.url} reload={getPath}/> : ''
          }
          {
                showDelete ? <Delete success={setDeleteSuccess} show={setShowDelete} type={type} file={fileDelete} path={props.path} url={props.url} reload={getPath}/> : ''
          }
          {
              // Entrar al archivo
              showModalPassword ? <ModalPassword newPath={newPath} setPath={props.setPath} show={setShowModalPassword} type={type} pass={passwords} path={props.path} url={props.url} reload={getPath}/> : ''
          }
          {
              // Descargar el archivo
              showModalPassword2 ? <ModalPassword canBeDownloaded={true} file={fileCanDownload} newPath={newPath} setPath={props.setPath} show={setShowModalPassword2} pathCanDownload={pathCanDownload} type={type} pass={passwords} path={props.path} url={props.url} reload={getPath}/> : ''
          }
          {
              // Renombrar el archivo
              showModalPassword3 ? <ModalPassword canBeEdit={true} showRename={setShowRename} file={fileRename} newPath={newPath} setPath={props.setPath} show={setShowModalPassword3} pathCanDownload={pathCanDownload} type={typeRename} pass={passwords} path={props.path} url={props.url} reload={getPath}/> : ''
          }
          {
              showRename ? <Rename success={setRenameSuccess} show={setShowRename} type={typeRename} file={fileRename} path={props.path} url={props.url} reload={getPath} user={props.user}/> : ''
          }
          {
              showSendModal ? <Send show={setShowSendModal} type={typeSend} success={setSendSuccess} file={fileSend} path={props.path} url={props.url} reload={getPath}/> : ''
          }

          {/*ALERTS*/}
          {
              sendSuccess ? <div className='alert-success'><Alert severity="success">Enviado correctamente</Alert></div> : ''
          }
          {
              createFolderSuccess ? <div className='alert-success'><Alert severity="success">Enviado correctamente</Alert></div> : ''
          }
          {
              deleteSuccess ? <div className='alert-success'><Alert severity="success">Eliminado correctamente</Alert></div> : ''
          }
          {
              renameSuccess ? <div className='alert-success'><Alert severity="success">Renombrado correctamente</Alert></div> : ''
          }
          {
              uploadSuccess ? <div className='alert-success'><Alert severity="success">Subido correctamente</Alert></div> : ''
          }
          {
              downloadSuccess ? <div className='alert-success'><Alert severity="success">Descargado correctamente</Alert></div> : ''
          }
          {
              createFileSuccess ? <div className='alert-success'><Alert severity="success">Creado correctamente</Alert></div> : ''
          }
    </div>
  );
}

export default Home;
