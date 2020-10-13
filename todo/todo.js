var express = require('express');
var passport = require('passport');
var todoController = require('./controllers/todo-controller');
var bodyParser = require('body-parser');
var userDetails = require('./models/user-model')
const mongoose = require('mongoose');
var expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});

//create server
var app = express();

//middleware config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

//controller config
todoController(app);

//passport-local-mongoose config
passport.use(userDetails.createStrategy());
passport.serializeUser(userDetails.serializeUser());
passport.deserializeUser(userDetails.deserializeUser());

//database connection config
mongoose.connect('mongodb+srv://ekin:LampClip1@cluster0.6u4ed.mongodb.net/ntdb?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', () => {
    console.log('connected to DB');
});

//launch server, listen on port 9000
app.listen(9000, () => {
    console.log('server listening on port 9000');
});