const mongoose = require('mongoose')

var dieta = mongoose.Schema({

}, { strict: false })

var Dieta = mongoose.model('dietas', dieta);

module.exports = {Dieta}