const express = require('express')
const app = express()
const port = 3200 || process.env.PORT
const hbs = require('hbs')
const path = require('path')
require('./db/connection')
var favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname, 'public','favicon.ico')));
app.use(express.json())
app.set('views', path.join(__dirname,'views'))
app.set('view engine','hbs')

// Routes
app.use('/api/file', require('./routes/files'))
app.use('/file', require('./routes/show'))
app.use('/files/download', require('./routes/download'))

app.listen(port, () => {
    console.log("server is running!")
})
