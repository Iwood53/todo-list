var passport = require('passport');
var connectEnsureLogin = require('connect-ensure-login');
var User = require('../models/user-model');
var todoLists = require('../models/todo-list-model');

module.exports = (app) => {

    app.get('/',connectEnsureLogin.ensureLoggedIn(), (req, res) => {
        //var myLists;
        
        todoLists.find({owner: req.user.id}, (err, allDetails) => {
            if (err) { console.log(err); }
            else {
                res.render('index-view', { username: req.user.username, details: allDetails })
            }
        })

        
        //res.render('index-view', { username: req.user.username});         
    });







    app.get('/new-list', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
        res.render('new-list');         
    });

    app.post('/new-list', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
        console.log(req.body.listName);
        var newList = new todoLists({owner: req.user.id, name: req.body.listName});
        newList.save((err, newList) => {
            if(err){return err;}
        });
        res.render('new-list');         
    });

    app.get('/login', (req, res) => {
        res.render('login');         
    });

    app.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err) };
            if (!user) { return res.redirect('/login?info=' + info) };

            req.logIn(user, (err) => {
                if (err) { return next(err) };
                return res.redirect('/');
            })
        })
        (req, res, next);
    });

    app.get('/register', (req, res) => {
        res.render('register');         
    });

    app.post('/register', (req, res, next) => {
        User.register(new User({username: req.body.username}), req.body.password, (err) => {
            if(err) { return next(err); };
            passport.authenticate('local');
            return res.redirect('/');
        })

    })



}