const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const port = 3000;

const app = express()
app.set('trust proxy', true);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { mongoose } = require('./db/database-connection');
const {Client} = require('./models/client');
const {Dieta} = require('./models/dieta');

app.get('/', (req,res) => {
    res.send('API Funcionando Correctamente')
})

app.get('/clientes', (req,res) => {
    Client.find().then(response => {
        res.send(response)
    })
})

//Registro de Clientes
app.post('/cliente-registro', (req,res) => {
    Client.create(req.body, err => {
        err ? res.sendStatus(500) : ''
    })
    res.sendStatus(200)
})

app.post('/cliente-update', (req,res) => {
    Client.findOneAndUpdate({"_id" : req.body._id}, { "$set" : { 
        "username" : req.body.username,
        "password" : req.body.password,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "secondlastname": req.body.secondlastname,
        "email": req.body.email,
        "tel": req.body.tel,
        "edad": req.body.edad,
        "membresia": req.body.membresia,
        "meses": req.body.meses,
        "clientType" : req.body.clientType
}}).then(response =>  {
        res.send(response)
    })
})

app.post('/cliente-delete', (req,res) => {
    Client.findOneAndDelete({"_id" : req.body._id}).then(response => {
        res.send(response)
    })
})

app.post('/login', (req,res) => {
    Client.findOne({"username" : req.body.username}).then(response => {
        res.send(response)
    })
})

//Registro de Dieta
app.post('/dieta-registro', (req,res) => {
    let fecha = new Date().toLocaleString("en-US", {timeZone: "America/Guayaquil"})
    console.log(fecha)
    let date = fecha.split(',')
    req.body.fecha = date[0]
    Dieta.create(req.body, err => {
        err ? res.sendStatus(500) : ''
    })
    res.sendStatus(200)
})

app.get('/dietas', (req,res) => {
    Dieta.find().then(response => {
        res.send(response)
    })
})

// Filtro de dietas
app.post('/find-dieta', (req,res) => {
    console.log(req.body)
    Dieta.find({"fecha" : req.body.fecha, "q1" : req.body.dieta}).then(response => {
        res.send(response)
    })
})

app.post('/dieta-user', (req,res) => {
    Dieta.findOne({'user': req.body.user}).then(response => {
        res.send(response)
    })
})

app.listen(port, () => {
    console.log("API inciada!");
})