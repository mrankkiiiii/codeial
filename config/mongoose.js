//connect to the library
const mongoose = require('mongoose');

//connection to the database
mongoose.connect('mongodb://localhost/codeial_development',{useCreateIndex: true, useNewUrlParser: true , useUnifiedTopology: true  });

//acquire the connection to check it is successfull
const db = mongoose.connection;

//Error
db.on('err',console.error.bind(console,'Error connecting with database'));

//connect with database
db.once('open',function(){
    console.log('Successfully connect with database');
});