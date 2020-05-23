const express = require('express');
const app = express();
const port = 8000;

//include mongoose file
const db = require('./config/mongoose');

//used for session cookie
const session =require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);


// include cookie parser
const cookieParser = require('cookie-parser');

// adding sass module
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: '/assets/scss',
    dest: '/assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));


// app. use is middleware which is used to passed the form data using express
app.use(express.urlencoded());

app.use(cookieParser());

// use for adding layout which installed by npm install express-ejs-layouts
const expresslayouts = require('express-ejs-layouts');
app.use(expresslayouts);

//for static css
app.use(express.static('./assets'));

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
    secret: 'blahsomething',
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

//use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    } 
    console.log(`Server is running on port: ${port}`);
});