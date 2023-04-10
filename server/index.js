const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const port = 3090

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/getPath/:path?', (req, res) => {
    let path = ''
    if (req.params.path !== undefined) {
        path = req.params.path
    }
    console.log(path);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})