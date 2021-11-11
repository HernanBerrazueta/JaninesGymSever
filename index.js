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

app.listen(port, () => {
    console.log("API inciada!");
})