const express = require('express');
const app = express();
const port = 8000;

//include mongoose file
const db = require('./config/mongoose');

// use for adding layout which installed by npm install express-ejs-layouts
const expresslayouts = require('express-ejs-layouts');
app.use(expresslayouts);

//for static css
app.use(express.static('./assets'));

// this is used to add separate css and js files for different pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));

// set up the view engine after installing the ejs
app.set('view engine', 'ejs');
app.set('views','./views')

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    
    console.log(`Server is running on port: ${port}`);
});