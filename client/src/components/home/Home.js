import './Home.css';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Upload from '../upload/upload';
import CreateFolder from '../create-folder/create-folder';
import Delete from '../delete/delete';
import File from '../file/file';
import Grid from '@mui/material/Grid';

function Home(props) {
  const [path, setPath] = useState(props.path);
  const [files, setFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [fileDelete, setFileDelete] = useState(null);
  const [type, setType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

    function download(path, file) {
        fetch(props.url+'/api/download/'+path+'/'+file, {
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

    function modalDelete(file, type) {
        setFileDelete(file);
        setType(type)
        setShowDelete(!showDelete);
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
                            props.isPublic == false ? <Grid item xs={12} sm={6} md={6} lg={6} xl={6}><Link className='link' to={'/'+path.split('-').slice(0, -1).join('-')} onClick={() => {
                              setPath(path.split('-').slice(0, -1).join('-'))}
                          }>
                              <div className='parent-directory-button-div'>
                                  <div className='content-clickable-directory'>
                                      <img className='parent-directory-button-div-image' src='/assets/carpeta_padre.png'></img>
                                      <span>Directorio anterior</span>
                                  </div>
                              </div>
                                </Link></Grid> :
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
                              files.length == 0 ? props.isPublic ? <div className='container-home'><div className='loading'>NO HAY ARCHIVOS PÚBLICOS</div></div> : <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
                                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                                                    <File isPublic={props.isPublic} url={props.url} file={file} path={path} modalDelete={modalDelete} download={download}></File>
                                                </Grid>
                                          )
                                      } else {
                                          return(
                                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                                                  <div className='parent-directory-button-div'>
                                                      {
                                                            props.isPublic == false ? <Link className='link' to={'/'+path+'-'+file.name}>
                                                                <div className='content-clickable-directory' onClick={() => {
                                                                    setPath(path+'-'+file.name);
                                                                }}>
                                                                    <img className='parent-directory-button-div-image' src='/assets/carpeta.png'></img>
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
                                                              <img className='options-files-home' src='/assets/options.png' onClick={() => {
                                                                  modalDelete(file.name, 'folder')
                                                              }}></img>
                                                              : ''
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
    </div>
  );
}

export default Home;
