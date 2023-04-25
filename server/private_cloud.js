const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const cookieParser = require('cookie-parser')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const fileUpload = require('express-fileupload')
const nodemailer = require("nodemailer");
const https = require('https')
const archiver = require('archiver');
const path = require('path');
const streamBuffers = require('stream-buffers');
const port = 8282

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// UBUNTU PARA EL SERVIDOR DE PRODUCCIÓN
/**
 * ANTES DE SUBIR A PRODUCCIÓN HAY QUE DESCOMENTAR lAS LINEAS DEL FINAL
 */
const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/jointscounter.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/jointscounter.com/privkey.pem')
};
var db_config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'tY3rbpYG8&@W1l^t.a',
    database: 'private_cloud'
}

//SERVIDOR LOCAL
// const db_config = {
//   host: '127.0.0.1',
//   user: 'root',
//   password: '',
//   database: 'private_cloud'
// }

let connection
function handleDisconnect() {
    connection = mysql.createConnection(db_config);

    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        handleDisconnect();
    });
}
handleDisconnect();

app.get('/', (req, res) => {
    const salt = bcrypt.genSaltSync(13);
    res.send(salt)
})

app.post('/api/login', async (req, res) => {

    const { username, password } = req.body;
    connection.query('SELECT hash FROM users WHERE username = ? AND password = ?', [username, password], (err, rows, fields) => {
        if (err) throw err
        if(rows.length > 0){
            res.json(rows)
        } else {
            res.json({ message: 'Usuario o contraseña incorrectos.' })
        }
    })
});

app.post('/api/user', async (req, res) => {
    const { hash } = req.body;
    connection.query('SELECT * FROM users WHERE hash = ?', [hash], (err, rows, fields) => {
        if (err) throw err
        res.json(rows)
    })
});

app.get('/api/getUser/:id', async (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows, fields) => {
        if (err) throw err
        res.json(rows)
    })
})

app.get('/api/profileFrame/:id/:level', async (req, res) => {
    const { id, level } = req.params;
    let idLevel = getFrameIdLevel(level)
    connection.query('SELECT * FROM frames WHERE id = ?', [idLevel], (err, rows, fields) => {
        if (err) throw err
        res.json(rows[0])
    })
})

function getFrameIdLevel(level) {
    let idLevel = 1
    let j = 0;
    for(let i=1; i<=8; i++) {
        if(level == 0) {
            idLevel = 1
        }
        if (level >= j) {
            idLevel = i;
            j += 5;
        } else {
            j += 5;
        }
    }
    return idLevel;
}

app.get('/api/getMissions/:level', async (req, res) => {
    const { level } = req.params;
    let idLevel = getFrameIdLevel(level)
    connection.query(` SELECT 
    id, name, description, frame_id, points, max_value, callback
  FROM missions 
  WHERE frame_id = ?
        `, [idLevel], (err, rows, fields) => {
            if (err) throw err
            res.json(rows)
        })
})

app.post('/api/createFile', async (req, res) => {
    const body = req.body;
    let path = body.path;
    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }

    let files_in_path = fs.readdirSync('./'+path);
    let fileName = body.name;
    let fileExtension = fileName.split('.').pop();
    if(files_in_path.includes(fileName)) {
        fileName = getUniqueFileName(path, fileName)
    }

    fs.writeFile('./'+path+'/'+fileName, '', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        connection.query('INSERT INTO files (name, path, user_id, type, permissions) VALUES (?, ?, ?, ?, ?)', [fileName, path, body.user_id, fileExtension, body.permission], (err, rows, fields) => {
            if (err) throw err
            connection.query('SELECT level FROM users WHERE id = ?', [req.body.user_id], (err, rows, fields) => {
                if (err) throw err
                let idLevel = getFrameIdLevel(rows[0].level)
                function callback(param) {
                    console.log(param)
                    res.json({level: rows[0], level_up: param})
                }
                addProgress(body.user_id, 'Archivo creado', idLevel, callback)
            })
        })
    });
})

app.get('/api/getReadme/:path', async (req, res) => {
    const { path } = req.params;
    let files = [];
    fs.readdir('./'+path, (err, result) => {
        if(err) {
            console.error(err)
            throw Error(err)
        }
        files = result
        if(files.includes('README.md')) {
            res.sendFile(path+'/README.md', { root: __dirname })
        }
    })
})

app.get('/api/getFileToRead/:path/:file', async (req, res) => {
    let path  = req.params.path;
    const file  = req.params.file;
    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    let files = [];
    fs.readdir('./'+path, (err, result) => {
        if(err) {
            console.error(err)
            throw Error(err)
        }
        files = result
        if(files.includes(file)) {
            res.sendFile(path+'/'+file, { root: __dirname })
        }
    })
})

app.get('/api/getifFollow/:user_id/:user_logged_hash', async (req, res) => {
    const { user_id, user_logged_hash } = req.params;
    connection.query('SELECT * FROM follows WHERE following_id = ? AND follower_id = (SELECT id FROM users WHERE hash = ?)', [user_id, user_logged_hash], (err, rows, fields) => {
        if (err) throw err
        res.json(rows)
    })
})

app.get('/api/follow/:user_id/:user_logged_hash', async (req, res) => {
const { user_id, user_logged_hash } = req.params;
    connection.query('INSERT INTO follows (following_id, follower_id) VALUES (?, (SELECT id FROM users WHERE hash = ?))', [user_id, user_logged_hash], (err, rows, fields) => {
        if (err) throw err
        res.json(true)
    })
})

app.get('/api/unfollow/:user_id/:user_logged_hash', async (req, res) => {
    const { user_id, user_logged_hash } = req.params;
    connection.query('DELETE FROM follows WHERE following_id = ? AND follower_id = (SELECT id FROM users WHERE hash = ?)', [user_id, user_logged_hash], (err, rows, fields) => {
        if (err) throw err
        res.json(true)
    })
})

app.get('/api/getFollowers/:id', async (req, res) => {
    const { id } = req.params;
    let followers = 0
    let following = 0
    connection.query('SELECT * FROM follows WHERE following_id = ?', [id], (err, rows, fields) => {
        if (err) throw err
        followers = rows.length
    })
    connection.query('SELECT * FROM follows WHERE follower_id = ?', [id], (err, rows, fields) => {
        if (err) throw err
        following = rows.length
        res.json({ followers, following })
    })
})

app.get('/api/getPath/:path?', (req, res) => {
    let path = '/'
    if (req.params.path !== undefined) {
        path = '/'+req.params.path
    }
    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    let pathDataBase = req.params.path
    if(pathDataBase.includes('-')) {
        pathDataBase = pathDataBase.replace(/-/g, '/')
    }
    let files = []
    try {
        files = fs.readdirSync('.' + path);
      } catch (err) {
        if (err.code === 'ENOENT') {
          res.json({ messageError: 'No se encontró ninguna ruta con ese nombre.' });
          return;
        }
        throw err;
      }
    
    connection.query(`SELECT files.*, IFNULL(users.profile_picture, '') AS shared_profile_picture, IFNULL(users.username, '') AS shared_username
    FROM files
    LEFT JOIN users ON files.shared_by_id = users.id
    WHERE files.path = ?
    `, [pathDataBase], (err, rows, fields) => {
        if (err) throw err
        res.json({ files, rows })
    })
})

app.post('/api/editProfile', async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    console.log(req.body.hash)

    if(req.body.username) {
        connection.query('SELECT * FROM users WHERE username = ?', [req.body.username], (err, rows, fields) => {
            if (err) throw err
            if(rows.length > 0) {
                res.json({ message: 'El nombre de usuario ya existe.' })
            }
        })
    }

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const placeholders = fields.map(() => '?').join(', ');
    let sql = `UPDATE users SET ${fields.map(f => `${f} = ?`).join(', ')} WHERE hash = ?`;
    let params = [...values, req.body.hash];

    if (req.files && req.files.file) {
        const file = req.files.file;
        let ext = file.name.split('.').pop();
        //filename sin extension
        let filename2 = file.name.split('.').slice(0, -1).join('.');
        const path = './uploads';
        let fileName = filename2 + '-' + Date.now() + '.'+ext;
        file.mv(path+'/'+fileName, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('File uploaded')
                sql = `UPDATE users SET ${fields.map(f => `${f} = ?`).join(', ')}, profile_picture = ? WHERE hash = ?`;
                params = [...values, path + '/' + fileName, req.body.hash];
            }
            connection.query(sql, params, (err, rows, fields) => {
                if (err) throw err
                connection.query('SELECT * FROM users WHERE hash = ?', [req.body.hash], (err, rows, fields) => {
                    if (err) throw err
                    connection.query('SELECT id, level FROM users WHERE hash = ?', [req.body.hash], (err, rows, fields) => {
                        if (err) throw err
                        let idLevel = getFrameIdLevel(rows[0].level)
                        function callback(param) {
                            res.json({ message: 'Perfil actualizado.', level_up: param })
                        }
                        addProgress(rows[0].id, 'Foto de perfil actualizada', idLevel, callback)
                    })
                })
            })
    });
    } else {
         connection.query(sql, params, (err, rows, fields) => {
             if (err) throw err
             res.json({ message: 'Perfil actualizado.' })
         })
     }
})

app.get('/api/download/:path/:file', (req, res) => {
    let path = req.params.path
    if(req.params.path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    path = './'+path+'/'+req.params.file
    res.download(path, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(path+' Downloaded')
        }
    })
})

app.get('/api/downloadFolder/:path/:file/:mode', async (req, res) => {
    if(req.params.path.includes('-')) {
        req.params.path = req.params.path.replace(/-/g, '/');
    }

    const folderPath = `./${req.params.path}/${req.params.file}`;

    // Realiza la consulta a la base de datos para obtener los nombres de los archivos
    const query = 'SELECT * FROM files WHERE path LIKE ? AND password IS NULL';
    if(req.params.mode != 'private') {
        const query = 'SELECT * FROM files WHERE path LIKE ? AND permissions = 1';
    }

    connection.query(query, ["%"+req.params.path+"/"+req.params.file+"%"], (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al descargar la carpeta');
            return;
        }

        let needReadme = false;
        const filePaths = rows.map(row => {
            if(row.path != req.params.path+'/'+req.params.file) {
                needReadme = true;
                return `./${row.path}/${row.name}`;
            } else {
                return `./${req.params.path}/${req.params.file}/${row.name}`;
            }
        });


        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        archive.pipe(res);

        filePaths.forEach(filePath => {
            const fileName = path.basename(filePath);
            archive.file(filePath, { name: fileName });
        });

        if(needReadme) {
            //crea un archivo txt y lo añade al zip
            let txt = `Has descargado correctamente la carpeta ${req.params.file}.
            El problema es que la carpeta deseada tiene carpetas dentro de ella, por lo que no se puede descargar correctamente.
            Aunque tienes todo el contenido de ${req.params.file} en esta carpeta pero sin estar ordenadas en sus carpetas. Tienes las carpetas vacías y todos los archivos juntos.
            Estamos trabajando en esta mejora muchas gracias por su comprensión.
            `;
            archive.append(txt, { name: 'HELP.txt' });
        }

        archive.finalize();
    });
});

app.get("/api/image/:path/:file", (req, res) => {
    if(req.params.path.includes('-')) {
        req.params.path = req.params.path.replace(/-/g, '/')
    }
    let path = './'+req.params.path+'/'+req.params.file
    if (fs.existsSync(path)) {
        res.sendFile(path, { root: __dirname });
    }
});

app.post('/api/saveFile', async (req, res) => {
    let path = req.body.path
    if(req.body.path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    if(path.includes('%20')) {
        path = path.replace(/%20/g, ' ')
    }
    let fileName = req.body.name
    let data = req.body.content
    console.log({path, fileName, data})

//    Ahora hay que editar el archivo del path y cambiarle el contenido por el que se ha pasado por el body
    fs.writeFileSync('./'+path+'/'+fileName, data)
    res.json({ message: 'Archivo guardado.' })
})

app.post('/api/sendFile' , async (req, res) => {
    let body = req.body
    console.log(body)

    let path = body.file.path
    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    let userSelected = body.userSelected[0]

    try {
        //mira si existe la carpeta compartido en el usuario seleccionado y si no la crea
        if (!fs.existsSync('./'+userSelected.username+'/Compartido')) {
            fs.mkdirSync('./'+userSelected.username+'/Compartido')
            connection.query('INSERT INTO files (name, user_id, path, permissions, type, shared_by_id) VALUES (?, ?, ?, ?, ?, ?)', ['Compartido', userSelected.id, userSelected.username, 0, 'folder', body.file.user_id], (err, rows, fields) => {
                if (err) throw err
            })
        }
        // Si ya existe un archivo con ese nombre le agregamos un nombre unico
        let newUniqueName = body.file.name
        if(fs.existsSync('./'+userSelected.username+'/Compartido/'+body.file.name)) {
            newUniqueName = getUniqueFolderName('./'+userSelected.username+'/Compartido/', body.file.name)
        }
        if(body.file.type != 'folder') {
            fs.copyFile('./'+path+'/'+body.file.name, './'+userSelected.username+'/Compartido/'+newUniqueName, (err) => {
                if (err) throw err
                console.log('File copied')
                connection.query('INSERT INTO files (name, user_id, path, permissions, type, shared_by_id) VALUES (?, ?, ?, ?, ?, ?)', [newUniqueName, userSelected.id, userSelected.username+'/Compartido', 0, body.file.type, body.file.user_id], (err, rows, fields) => {
                    if (err) throw err
                    connection.query('SELECT level FROM users WHERE id = ?', [body.file.user_id], (err, rows, fields) => {
                        if (err) throw err
                        let idLevel = getFrameIdLevel(rows[0].level)
                        function callback(param) {
                            res.json({ message: 'Archivo enviado.', level_up: param })
                        }
                        addProgress(body.file.user_id, 'Compartido', idLevel, callback)
                    })
                })
            })
        } else {
            copyFolderToSend(newUniqueName, userSelected, body.file.user_id, body.file.path+'/'+body.file.name);
            res.json({ message: 'Archivo enviado.' });
        }
    } catch (err) {
        if (err.code == 'ENOENT') {
            console.log('File not found')
        }
    }

    
})

function copyFolderToSend(newFolder, userSelected, shared_user_id, pathOrigin='', path='') {
    fs.mkdirSync('./'+userSelected.username+'/Compartido/'+path+newFolder);
    let newPath = path
    if(path!='') {
        newPath = path.slice(0, -1)
        newPath = '/' + newPath
    }
    console.log(userSelected.username+'/Compartido'+newPath, 'newPath')
    connection.query('INSERT INTO files (name, user_id, path, permissions, type, shared_by_id) VALUES (?, ?, ?, ?, ?, ?)', [newFolder, userSelected.id, userSelected.username+'/Compartido'+newPath, 0, 'folder', shared_user_id], (err, rows, fields) => {
        if (err) throw err
        connection.query('SELECT * FROM files WHERE path = ? AND password is NULL', [pathOrigin], (err, rows, fields) => {
            if (err) throw err
            rows.forEach(file => {
                if(file.type != 'folder') {
                    fs.copyFile('./'+pathOrigin+'/'+file.name, './'+userSelected.username+'/Compartido/'+path+newFolder+'/'+file.name, (err) => {
                        if (err) throw err
                        console.log('File copied')
                        connection.query('INSERT INTO files (name, user_id, path, permissions, type, shared_by_id) VALUES (?, ?, ?, ?, ?, ?)', [file.name, userSelected.id, userSelected.username+'/Compartido/'+path+newFolder, 0, file.type, file.user_id], (err, rows, fields) => {
                            if (err) throw err
                        })
                    })
                } else {
                    copyFolderToSend(file.name, userSelected, shared_user_id, pathOrigin+'/'+file.name, path+newFolder+'/')
                }

            })
        })
    })
}

app.post('/api/upload', async (req, res) => {
    if(!req.files) {
        res.json('No file uploaded')
        return
    }
    let file = req.files.file
    let path = req.body.path
    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    if(file.length === undefined) {
        file = [file]
    }
    let permissions = false
    if(req.body.permissions === 'true') {
        permissions = true
    }

    let files_in_path = fs.readdirSync('./'+path)
    let idLevel = 0

    connection.query('SELECT level FROM users WHERE id = ?', [req.body.user_id], (err, rows, fields) => {
        if (err) throw err
        idLevel = getFrameIdLevel(rows[0].level)
        for(let i=0; i<file.length; i++) {
            let fileName = file[i].name
            if(files_in_path.includes(fileName)) {
                fileName = getUniqueFileName(path, fileName)
                file[i].name = fileName
            }
            let fileExtension = fileName.split('.').pop()
            file[i].mv('./'+path+'/'+fileName, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('File uploaded')
                    connection.query('INSERT INTO files (name, path, user_id, type, permissions) VALUES (?, ?, ?, ?, ?)', [fileName, path, req.body.user_id, fileExtension, permissions], (err, rows, fields) => {
                        if (err) throw err
                        if(i != 0) {
                            addProgress(req.body.user_id, 'upload', idLevel, (param) => {console.log(param)})
                        }
                    })
                }
            })
        }
         
        function callback(callbackParam) {
            res.json({message: 'Files uploaded', level_up: callbackParam})
        }
        addProgress(req.body.user_id, 'upload', idLevel, callback)
    })  
})


function getUniqueFileName(path, fileName) {
    let fileCount = 0
    let name = fileName.replace(/\(\d+\)/, '');
    while (fs.existsSync(`${path}/${name}`)) {
        fileCount++
        const extension = name.split('.').pop()
        let nameWithoutparentheses = name.replace(/\(\d+\)/, '')
        const fileNameWithoutExtension = nameWithoutparentheses.replace(`.${extension}`, '')
        name = `${fileNameWithoutExtension}(${fileCount}).${extension}`
    }
    return name
}

function getUniqueFolderName(path, folderName) {
    let folderCount = 0;
    let name = folderName.replace(/\(\d+\)/, ''); // eliminar paréntesis y su contenido
    while (fs.existsSync(`${path}/${name}`)) {
        folderCount++;
        name = `${folderName}(${folderCount})`;
    }
    return name;
}

app.post('/api/createFolder', (req, res) => {
    console.log(1)
    let path = req.body.path
    let folderName = req.body.name

    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    let files_in_path = fs.readdirSync('./'+path)
    if(files_in_path.includes(folderName)) {
        folderName = getUniqueFolderName(path, folderName)
    }
//    crear carpeta
    fs.mkdirSync('./'+path+'/'+folderName)
    let password = null
    if(req.body.password) {
        password = req.body.password
    }
    connection.query('INSERT INTO files (name, path, user_id, type, permissions, password) VALUES (?, ?, ?, ?, ?, ?)', [folderName, path, req.body.user_id, 'folder', req.body.permissions, password], (err, rows, fields) => {
        if (err) throw err
        connection.query('SELECT level FROM users WHERE id = ?', [req.body.user_id], (err, rows, fields) => {
            if (err) throw err
            let idLevel = getFrameIdLevel(rows[0].level)
            
            function callback(param) {
                res.json({message: 'Folder created', level_up : param})
            }
            if(password) {
                addProgress(req.body.user_id, 'Carpeta con contraseña creada', idLevel, callback)
            } else {
                addProgress(req.body.user_id, 'Carpeta creada', idLevel, callback)
            }
        })
    })
})

function addProgress(user_id, hecho, idLevel, callback) {
    if(idLevel != 1) {
        hecho = hecho + idLevel
    }
    connection.query('INSERT INTO progress(user_id, do) VALUES (?, ?)', [user_id, hecho], (err, rows, fields) => {
        if (err) throw err
        connection.query('SELECT * FROM missions WHERE callback = ?', [hecho], (err, rows, fields) => {
            if (err) throw err
            if (rows.length > 0) {
                let mission = rows[0]
                connection.query('SELECT count(*) as count FROM progress WHERE user_id = ? AND do = ?', [user_id, hecho], (err, rows, fields) => {
                    if (err) throw err
                    let count = rows[0].count
                    // Te has pasado la mision
                    if (count >= mission.max_value) {
                        connection.query('SELECT * FROM users_passed_missions WHERE user_id = ? AND mission_id = (SELECT id FROM missions WHERE callback = ?)', [user_id, hecho], (err, rows, fields) => {
                            if (err) throw err
                            if(rows.length === 0) {
                                connection.query('INSERT INTO users_passed_missions(user_id, mission_id) VALUES (?, (SELECT id FROM missions WHERE callback = ?))', [user_id, hecho], (err, rows, fields) => {
                                    if (err) throw err
                                })
                                connection.query('SELECT points FROM users WHERE id = ?', [user_id], (err, rows, fields) => {
                                    if (err) throw err
                                    let points = rows[0].points + mission.points
                                    let level = (40*points) / 8000
                                    level = Math.trunc(level)
                                    level = level + 1
                                    console.log({level, points})
                                    connection.query('UPDATE users SET points = ?, level = ? WHERE id = ?', [points, level, user_id], (err, rows, fields) => {
                                        if (err) throw err
                                        console.log(true)
                                        callback(true)
                                    })
                                })
                            } else {
                                console.log(false)
                                callback(false)
                            }
                        })
                    } else {
                        console.log(false)
                        callback(false)
                    }
                })
            }
        })
    })
}

app.get('/api/getProgress/:id/:hecho', async (req, res) => {
    let user_id = req.params.id
    let hecho = req.params.hecho
    connection.query('SELECT count(*) as count FROM progress WHERE user_id = ? AND do = ?', [user_id, hecho], (err, rows, fields) => {
        if (err) throw err
        res.json(rows[0])
    })
})

app.post('/api/delete', async (req, res) => {
    let path = req.body.path
    let name = req.body.file
    let type = req.body.type

    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }

    try {
        if(type === 'file') {
            fs.rmSync('./'+path+'/'+name)
        } else {
            fs.rmSync('./'+path+'/'+name, { recursive: true })
        }
    } catch (err) {
        if (err.code == 'ENOENT') {
            console.log('File does not exist in path')
        }
    }
    

    console.log(name, path)

    connection.query('DELETE FROM files WHERE name = ? AND path = ? OR path = ?', [name, path, path+'/'+name], (err, rows, fields) => {
        if (err) throw err
    })

    connection.query('DELETE FROM files WHERE path LIKE ?', ['%'+path+'/'+name+'/%'], (err, rows, fields) => {
        if (err) throw err
    })

    res.json('Deleted')
})


app.get('/api/getIsPublic/:path/:file', (req, res) => {
    let path = req.params.path
    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    connection.query('SELECT permissions FROM files WHERE path = ? AND name = ?', [path, req.params.file], (err, rows, fields) => {
        if (err) throw err
        res.json(rows[0].permissions)
    })
})

app.post('/api/rename', async (req, res) => {
    let formData = req.body
    if(formData.path.includes('-')) {
        formData.path = formData.path.replace(/-/g, '/')
    }
    const fullPath = path.join(formData.path, formData.lastName);
    try {
        fs.rename(fullPath, path.join(formData.path, formData.newName), (err) => {
            if (err) throw err;
    
            if(formData.permission == 'true') {
                formData.permission = true
            } else if(formData.permission == 'false') {
                formData.permission = false
            }
    
            if(formData.password == '' || formData.password == 'NULL' || formData.password == null || formData.password == undefined || formData.password == 'null') {
                formData.password = null
            }
            let level_up = false
            // Si se ha renombrado correctamente, podemos realizar la consulta en la base de datos
            connection.query('UPDATE files SET name = ?, permissions = ?, password = ? WHERE name = ? AND path = ? AND type = ?', [formData.newName, formData.permission, formData.password, formData.lastName, formData.path, formData.type], (err, rows, fields) => {
                if (err) throw err
                // Sus subcarpetas y archivos
                connection.query('UPDATE files SET path = ? WHERE path = ?', [formData.path+'/'+formData.newName, formData.path+'/'+formData.lastName], (err, rows, fields) => {
                    if (err) throw err
                    // Vemos si hay subcarpetas en subcarpetas y pillamos todos los archivos
                    connection.query('SELECT * FROM files WHERE path LIKE ?', ['%'+formData.path+'/'+formData.lastName+'/%'], (err, rows, fields) => {
                        if(err) throw err
                        if(rows.length > 0) {
                            rows.forEach(file => {
                                let oldPath = file.path
                                let newPath = oldPath.replace(formData.lastName, formData.newName)
                                connection.query('UPDATE files SET path = ? WHERE id = ?', [newPath, file.id], (err, rows, fields) => {
                                    if(err) throw err
                                    connection.query('SELECT level FROM users WHERE id = ?', [formData.user], (err, rows, fields) => {
                                        if (err) throw err
                                        let idLevel = getFrameIdLevel(rows[0].level)
                                        function callback(param) {
                                            res.json({message:'Renamed', level_up:param})
                                        }
                                        addProgress(formData.user, 'Carpeta Editada', idLevel, callback)
                                    })
                                })
                            })
                        } else {
                            connection.query('SELECT level FROM users WHERE id = ?', [formData.user], (err, rows, fields) => {
                                if (err) throw err
                                let idLevel = getFrameIdLevel(rows[0].level)
                                function callback(param) {
                                    res.json({message:'Renamed', level_up:param})
                                }
                                addProgress(formData.user, 'Carpeta Editada', idLevel, callback)
                            })
                        }
                    })
                })
            })
        });
    } catch (err) {
        if (err.code == 'ENOENT') {
            console.log('File does not exist in path')
        }
    }
    
})

app.get('/api/solicitudRegistro/:email/:name/:surname/:password/:username', (req, res) => {
    const salt = bcrypt.genSaltSync(13);
    connection.query('INSERT INTO users (email, name, surname, password, username, hash, profile_picture, level) VALUES (?, ?, ?, ?, ?, ?, ?, 1)', [req.params.email, req.params.name, req.params.surname, req.params.password, req.params.username, salt, './assets/perfil.png'], (err, rows, fields) => {
      if (err) throw err
      console.log('The solution is: ', rows)
    })
    fs.mkdirSync('./'+req.params.username)
    res.json(true)
});

app.get('/api/getUsersNames', (req, res) => {
    connection.query('SELECT id, username, profile_picture FROM users', (err, rows, fields) => {
        if (err) throw err
        res.json(rows)
    })
});

app.get('/api/icons/:type', (req, res) => {
    const { type } = req.params;
    connection.query('SELECT path FROM icons WHERE type = ?', [type], (err, rows, fields) => {
        if (err) throw err
        res.json(rows)
    })
})

app.get('/api/getAllIcons', (req, res) => {
    connection.query('SELECT * FROM icons', (err, rows, fields) => {
        if (err) throw err
        res.json(rows)
    })
})

app.get('/api/sendMailVerification/:email', (req, res) => {
    const { email } = req.params;
    // numero aleatorio de 6 digitos
    let numeroAleatorio = Math.floor(Math.random() * 1000000);
    console.log(numeroAleatorio);
    // enviar mail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'bymarquezz2@gmail.com',
        pass: 'codjsnbrmeuiltcz'
        }
    });

    const mailOptions = {
        from: 'bymarquezz2@gmail.com',
        to: email,
        subject: 'Verificacion de cuenta',
        text: `Bienvenido a Private-Cloud, tu codigo de verificacion es: ${numeroAleatorio}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        const mailOptions = {
            from: 'bymarquezz2@gmail.com',
            to: 'bymarquezz2@gmail.com',
            subject: 'Usuario registrandose',
            text: `Alguien se está registrando con el correo: ${email}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            res.json(numeroAleatorio);
            }
        });
        res.json(numeroAleatorio);
        }
    });
});

// app.listen(port, () => {
//     console.log(`Servidor HTTP listening on port ${port}`)
// })

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log('Servidor HTTPS escuchando en el puerto ' + port);
});