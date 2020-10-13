var passport = require('passport');
var connectEnsureLogin = require('connect-ensure-login');
var User = require('../models/user-model');
var todoLists = require('../models/todo-list-model');
var listItem = require('../models/list-item-model');
var Mongoose = require('mongoose');

module.exports = (app) => {

    app.get('/',connectEnsureLogin.ensureLoggedIn(), (req, res) => {        
        todoLists.find({owner: req.user.id}, (err, docs) => {
            if (err) { console.log(err); }
            else {
                res.render('index-view', { user: req.user, lists: docs })
            }
        }) 
    });

    app.get('/new-list', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
        res.render('new-list');         
    });

    app.post('/new-list', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
        var newList = new todoLists({owner: req.user.id, name: req.body.listName});
        newList.save((err, newList) => {
            if(err){console.log(err)}
            res.redirect('/list/' + newList.id)
        });       
    });

    app.post('/new-list-item', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
        var newListItem = new listItem({listId: req.body.listId, itemText: req.body.listItem});
        newListItem.save((err, ListItem) => {
            if (err) { return err; }
        })
        res.redirect('/list/' + req.body.listId);
    })

    app.get('/list/:listid', connectEnsureLogin.ensureLoggedIn(), (req,res) => {
        
        todoLists.findById(Mongoose.Types.ObjectId(req.params.listid), (err, doc) => {
            if (err) { console.log(err); }
            else {
                listItem.find({listId: doc.id}, (err, docs) => {
                    res.render('list-view', {user: req.user, list: doc, listItems: docs});
                })
            }
        })
    })

    app.get('/login', (req, res) => {
        res.render('login-view');         
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