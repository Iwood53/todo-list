require('dotenv').config()

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
app.use(express.static('./public'))
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
mongoose.set('debug', true);
mongoose.connect(process.env.DB_CONN_STRING, 
    {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', () => {
    console.log('connected to DB');
});

//launch server, listen on port 9000
app.listen(process.env.SERVER_PORT, () => {
    console.log('server listening on port: ' + process.env.SERVER_PORT);
});