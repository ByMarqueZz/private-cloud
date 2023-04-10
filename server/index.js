const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const cookieParser = require('cookie-parser')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const fileUpload = require('express-fileupload')
const nodemailer = require("nodemailer");
const port = 3090

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const db_config = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
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
    if(file.length === undefined) {
        file = [file]
    }

    for(let i=0; i<file.length; i++) {
        file[i].mv('./'+path+'/'+file[i].name, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('File uploaded')
            }
        })
    }
    res.json('Files uploaded')
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

app.get('/api/solicitudRegistro/:email/:name/:surname/:password/:username', (req, res) => {
    const salt = bcrypt.genSaltSync(13);
    connection.query('INSERT INTO users (email, name, surname, password, username, hash, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.params.email, req.params.name, req.params.surname, req.params.password, req.params.username, salt, '/assets/perfil.png'], (err, rows, fields) => {
      if (err) throw err
      console.log('The solution is: ', rows)
    })
    fs.mkdirSync('./'+req.params.username)
    res.json(true)
});

app.get('/api/getUsersNames', (req, res) => {
    connection.query('SELECT username FROM users', (err, rows, fields) => {
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})