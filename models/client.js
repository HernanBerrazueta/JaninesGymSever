const mongoose = require('mongoose')

var client = mongoose.Schema({
    id: String,
    username: String,
    password: String,
    name: String,
    last_name: String,
    second_last_name: String,
    email: String,
    phone_number: String,
    age: Number,
    register_date: Date,
    start_subscription: Date,
    last_subscription: Date,
    membership_type: Number,
    membership: Number,
    clientType: Boolean
}, { strict: false })

var Client = mongoose.model('clients', client);

module.exports = {Client}