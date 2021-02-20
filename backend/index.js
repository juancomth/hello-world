if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
// Iniciacion
const app = express()
require('./database')

//ajustes
app.set('port', process.env.PORT)

//Middlewares
app.use(morgan('dev'))
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

//Rutas o Routes
app.use('/api/books/', require('./routes/books'))


// Archivos Estaticos
app.use(express.static(path.join(__dirname,'public')))

// encender el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor encendido en el puerto',app.get('port'))
})