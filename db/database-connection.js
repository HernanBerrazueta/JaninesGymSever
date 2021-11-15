const mongoose = require('mongoose');


//Connection to the database
mongoose.connect( 'mongodb://localhost:27017/Janines_Gym', { useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {mongoose}