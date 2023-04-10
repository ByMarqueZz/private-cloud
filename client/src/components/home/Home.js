import './Home.css';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Upload from '../upload/upload';
import CreateFolder from '../create-folder/create-folder';
import Delete from '../delete/delete';

function Home(props) {
  const [path, setPath] = useState(props.path);
  const [files, setFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [fileDelete, setFileDelete] = useState(null);
  const [type, setType] = useState(null);

    useEffect(() => {
        getPath();
    }, [path]);

    function getPath() {
        fetch(props.url + '/api/getPath/'+path)
        .then(response => response.json())
        .then(data => {
            let files = orderFiles(data);
            setFiles(files);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function orderFiles(data) {
        let filesOrdered = [];
        data.forEach((file) => {
        //    si incluye el punto es un archivo y añadimos al final, primero los archivos y luego las carpetas
            if (file.includes('.')) {
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
      <>
        <div className='button-uplaod-files'>
              <button className='btn btn-primary' onClick={() => {
                  setShowUpload(!showUpload)
              }}><img src='/assets/upload.png' className="logo-upload-button"/></button>
              <button className='btn btn-primary' onClick={() => {
                  setShowCreateFolder(!showCreateFolder)
              }}><img src='/assets/add-folder.png' className="logo-upload-button"/></button>
          </div>
          <div className='path-div'>
              {
                  path.includes('-') ?
                    <Link className='link' to={'/'+path.split('-').slice(0, -1).join('-')} onClick={() => {
                        setPath(path.split('-').slice(0, -1).join('-'))}
                    }>
                        <div className='parent-directory-button-div'>
                            <img className='parent-directory-button-div-image' src='/assets/carpeta_padre.png'></img>
                            <span>Directorio anterior</span>
                        </div>
                    </Link>
                  : ''
              }
              {
                  files.map((file, index) => {
                      if (file.includes('.')) {
                            return (
                                <Link className='link' key={index}>
                                    <div className='parent-directory-button-div'>
                                        <div className='content-clickable-directory' onClick={() => {
                                            download(path, file)
                                        }}>
                                            {
                                                file.includes('.png') || file.includes('.jpg') || file.includes('.jpeg') ? <img className='parent-directory-button-div-image' src='/assets/imagen.png'></img>
                                                    : <img className='parent-directory-button-div-image' src='/assets/expediente.png'></img>
                                            }
                                            <span>{file}</span>
                                        </div>

                                        <img className='logo' src='/assets/options.png' onClick={() => {
                                            modalDelete(file, 'file')
                                        }}></img>
                                    </div>
                                </Link>
                            )
                      } else {
                            return (
                                <Link className='link' to={'/'+path+'-'+file}
                                 key={index}>
                                    <div className='parent-directory-button-div'>
                                        <div className='content-clickable-directory' onClick={() => {setPath(path+'-'+file)}}>
                                            <img className='parent-directory-button-div-image' src='/assets/carpeta.png'></img>
                                            <span>{file}</span>
                                        </div>
                                        <img className='logo' src='/assets/options.png' onClick={() => {
                                            modalDelete(file, 'folder')
                                        }}></img>
                                    </div>
                                </Link>
                            )
                      }
                  })
              }
          </div>

          {
                showUpload ? <Upload show={setShowUpload} path={path} url={props.url} reload={getPath}/> : ''
          }

          {
                showCreateFolder ? <CreateFolder show={setShowCreateFolder} path={path} url={props.url} reload={getPath}/> : ''
          }

          {
                showDelete ? <Delete show={setShowDelete} type={type} file={fileDelete} path={path} url={props.url} reload={getPath}/> : ''
          }
    </>
  );
}

export default Home;
