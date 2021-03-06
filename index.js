const express = require('express');
const env = require('./config/environment');
//to store logs
const logger = require('morgan');
// include cookie parser
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

require('./config/view-helpers')(app);

// use for adding layout which installed by npm install express-ejs-layouts
const expresslayouts = require('express-ejs-layouts');
//include mongoose file
const db = require('./config/mongoose');
//used for session cookie
const session =require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportgoogleoath = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);

// adding sass module
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');

const flashMiddleware = require('./config/flash-middleware');

//setup te chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);

chatServer.listen(5000);
console.log('chat server listening on port 5000');

const path = require('path');

//it should be load when in development only not in production mode
if(env.name=='development')
{ 
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),
        dest: path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle: 'expanded',
        prefix: '/css'
    }));
}


// app. use is middleware which is used to passed the form data using express
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

//for static css
app.use(express.static(env.asset_path));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));


//add the file to index page
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expresslayouts);
// this is used to add separate css and js files for different pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine after installing the ejs
app.set('view engine', 'ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // Todo change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 *100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err ||' connect-mongodb setup ok');
    }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(flashMiddleware.setFlash);

//use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    } 
    console.log(`Server is running on port: ${port}`);
});