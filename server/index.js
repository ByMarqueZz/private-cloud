const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const cookieParser = require('cookie-parser')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const fileUpload = require('express-fileupload')
const port = 3090

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const db_config = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'private_cloud'
}

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
    connection.query('SELECT id, username, profile_picture FROM users WHERE hash = ?', [hash], (err, rows, fields) => {
        if (err) throw err
        res.json(rows)
    })
});

app.get('/api/getPath/:path?', (req, res) => {
    let path = '/'
    if (req.params.path !== undefined) {
        path = '/'+req.params.path
    }
    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    const files = fs.readdirSync('.'+path)
    res.send(files)
})

app.get('/api/download/:path/:file', (req, res) => {
    let path = './'+req.params.path+'/'+req.params.file
    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
    res.download(path, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(path+'Downloaded')
        }
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

    file.mv('./'+path+'/'+file.name, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('File uploaded')
            res.json('File uploaded')
        }
    })
})

app.post('/api/createFolder', async (req, res) => {
    let path = req.body.path
    let folderName = req.body.name
    if(path.includes('-')) {
        path = path.replace(/-/g, '/')
    }
//    crear carpeta
    fs.mkdirSync('./'+path+'/'+folderName)
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
        fs.rmdirSync('./'+path+'/'+name, { recursive: true })
    }
    res.json('Deleted')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})