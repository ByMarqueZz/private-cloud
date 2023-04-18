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
//   password: 'root',
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
    const files = fs.readdirSync('.'+path)
    connection.query('SELECT * FROM files WHERE path = ?', [pathDataBase], (err, rows, fields) => {
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
                res.json({ message: 'Perfil actualizado.' })
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
    const query = 'SELECT name FROM files WHERE path = ? AND password IS NULL';
    if(req.params.mode != 'private') {
        const query = 'SELECT name FROM files WHERE path = ? AND permissions = 1';
    }

    connection.query(query, [req.params.path+'/'+req.params.file], (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al descargar la carpeta');
            return;
        }

        const filePaths = rows.map(row => `./${req.params.path}/${req.params.file}/${row.name}`);

        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        archive.pipe(res);

        filePaths.forEach(filePath => {
            const fileName = path.basename(filePath);
            archive.file(filePath, { name: fileName });
        });

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

app.post('/api/sendFile' , async (req, res) => {
    let body = req.body
    console.log(body)

    let path = body.file.path
    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    let userSelected = body.userSelected[0]

    //mira si existe la carpeta compartido en el usuario seleccionado y si no la crea
    if (!fs.existsSync('./'+userSelected.username+'/Compartido')) {
        fs.mkdirSync('./'+userSelected.username+'/Compartido')
        connection.query('INSERT INTO files (name, user_id, path, permissions, type, shared_by_id) VALUES (?, ?, ?, ?, ?, ?)', ['Compartido', userSelected.id, userSelected.username, 0, 'folder', body.file.user_id], (err, rows, fields) => {
            if (err) throw err
        })
    }
    fs.copyFile('./'+path+'/'+body.file.name, './'+userSelected.username+'/Compartido/'+body.file.name, (err) => {
        if (err) throw err
        console.log('File copied')
        connection.query('INSERT INTO files (name, user_id, path, permissions, type, shared_by_id) VALUES (?, ?, ?, ?, ?, ?)', [body.file.name, userSelected.id, userSelected.username+'/Compartido', 0, body.file.type, body.file.user_id], (err, rows, fields) => {
            if (err) throw err
            res.json({ message: 'Archivo enviado.' })
        })
    })
})

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
                })
            }
        })
    }
    res.json('Files uploaded')
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

app.post('/api/createFolder', async (req, res) => {
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
    })
    res.json('Folder created')
})

app.post('/api/delete', async (req, res) => {
    let path = req.body.path
    let name = req.body.file
    let type = req.body.type

    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }

    if(type === 'file') {
        fs.rmSync('./'+path+'/'+name)
    } else {
        fs.rmSync('./'+path+'/'+name, { recursive: true })
    }

    console.log(name, path)

    connection.query('DELETE FROM files WHERE name = ? AND path = ? OR path = ?', [name, path, path+'/'+name], (err, rows, fields) => {
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
        console.log(formData)

        // Si se ha renombrado correctamente, podemos realizar la consulta en la base de datos
        connection.query('UPDATE files SET name = ?, permissions = ?, password = ? WHERE name = ? AND path = ? AND type = ?', [formData.newName, formData.permission, formData.password, formData.lastName, formData.path, formData.type], (err, rows, fields) => {
            if (err) throw err
            res.json('Renamed')
        })
    });
})

app.get('/api/solicitudRegistro/:email/:name/:surname/:password/:username', (req, res) => {
    const salt = bcrypt.genSaltSync(13);
    connection.query('INSERT INTO users (email, name, surname, password, username, hash, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.params.email, req.params.name, req.params.surname, req.params.password, req.params.username, salt, './assets/perfil.png'], (err, rows, fields) => {
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