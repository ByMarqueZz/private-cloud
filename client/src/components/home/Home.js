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

function Home(props) {
  const [path, setPath] = useState(props.path);
  const [files, setFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
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

    useEffect(() => {
        getPath();
    }, [path]);

    function getPath() {
        setFiles([]);
        setIsLoading(true);
        fetch(props.url + '/api/getPath/'+path)
        .then(response => response.json())
        .then(data => {
            let files = orderFiles(data.rows);
            setFiles(files);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function orderFiles(data) {
        let filesOrdered = [];
        data.forEach((file) => {
        //    si incluye el punto es un archivo y añadimos al final, primero los archivos y luego las carpetas
            if (file.name.includes('.')) {
                filesOrdered.push(file);
            } else {
                filesOrdered.unshift(file);
            }
        })
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
            setPath(path);
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

  return (
      <div className='container-home'>
          {
              props.isPublic == false ? <p className='path-home-show'>{path}</p> : ''
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
                      </> : ''
              }
          </div>
          <div className='path-div'>
              <Grid container spacing={2}>
              {
                  path.includes('-') ?
                            props.isPublic == false ? <Grid item className='grid-item-home' xs={12} sm={6} md={4} lg={4} xl={4}><Link className='link' onClick={() => {
                              setPath(path.split('-').slice(0, -1).join('-'))}
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

                                  setPath(path.split('-').slice(0, -1).join('-'));
                                  //quita el ultimo directorio del path
                                    let pathArray = path.split('-');
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
                                      if (file.name.includes('.')) {
                                          return (
                                                <Grid item className='grid-item-home' xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                                                    <File sendModal={sendToModal} renameModal={renameModal} showPass3={showPass3} renameModal={renameModal} isPublic={props.isPublic} url={props.url} file={file} path={path} modalDelete={modalDelete} download={download}></File>
                                                </Grid>
                                          )
                                      } else {
                                          return(
                                                <Grid item className='grid-item-home' xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                                                  <div className='parent-directory-button-div'>
                                                      {
                                                            props.isPublic == false ? <Link className='link'>
                                                                <div className='content-clickable-directory' onClick={() => {
                                                                    settingPath(path+'-'+file.name, file.password);
                                                                }}>
                                                                    {
                                                                        file.password != null ? <img className='parent-directory-button-div-image' src='/assets/carpeta_candado.png'></img> :
                                                                            <img className='parent-directory-button-div-image' src='/assets/carpeta.png'></img>
                                                                    }
                                                                    <span>{file.name}</span>
                                                                </div>
                                                            </Link> :
                                                                <div className='content-clickable-directory' onClick={() => {
                                                                    setPath(path+'-'+file.name)
                                                                    props.setDetails(path+'-'+file.name);
                                                                }}>
                                                                    <img className='parent-directory-button-div-image' src='/assets/carpeta.png'></img>
                                                                    <span>{file.name}</span>
                                                                </div>
                                                      }

                                                      {
                                                          props.isPublic == false ?
                                                                <PopoverOption url={props.url} sendModal={sendToModal} renameModal={renameModal} showPass3={showPass3} modalDelete={modalDelete} file={file} type='folder' path={props.path} download={download}/>
                                                              : <PopoverPublic url={props.url} file={file} type='folder' path={props.path} download={download}/>
                                                      }
                                                  </div>
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

          {
                showUpload ? <Upload user={props.user} show={setShowUpload} path={path} url={props.url} reload={() => {
                    setTimeout(() => {
                        getPath();
                    }, 500);
                }}/> : ''
          }
          {
                showCreateFolder ? <CreateFolder user={props.user} show={setShowCreateFolder} path={path} url={props.url} reload={getPath}/> : ''
          }
          {
                showDelete ? <Delete show={setShowDelete} type={type} file={fileDelete} path={path} url={props.url} reload={getPath}/> : ''
          }
          {
              // Entrar al archivo
              showModalPassword ? <ModalPassword newPath={newPath} setPath={setPath} show={setShowModalPassword} type={type} pass={passwords} path={path} url={props.url} reload={getPath}/> : ''
          }
          {
              // Descargar el archivo
              showModalPassword2 ? <ModalPassword canBeDownloaded={true} file={fileCanDownload} newPath={newPath} setPath={setPath} show={setShowModalPassword2} pathCanDownload={pathCanDownload} type={type} pass={passwords} path={path} url={props.url} reload={getPath}/> : ''
          }
          {
              // Renombrar el archivo
              showModalPassword3 ? <ModalPassword canBeEdit={true} showRename={setShowRename} file={fileRename} newPath={newPath} setPath={setPath} show={setShowModalPassword3} pathCanDownload={pathCanDownload} type={typeRename} pass={passwords} path={path} url={props.url} reload={getPath}/> : ''
          }
          {
              showRename ? <Rename show={setShowRename} type={typeRename} file={fileRename} path={path} url={props.url} reload={getPath}/> : ''
          }
          {
              showSendModal ? <Send show={setShowSendModal} type={typeSend} file={fileSend} path={path} url={props.url} reload={getPath}/> : ''
          }
    </div>
  );
}

export default Home;
