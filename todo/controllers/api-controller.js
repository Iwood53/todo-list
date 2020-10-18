var passport = require('passport');
var connectEnsureLogin = require('connect-ensure-login');
var User = require('../models/user-model');
var todoLists = require('../models/todo-list-model');
var listItem = require('../models/list-item-model');
var Mongoose = require('mongoose');
const url = require('url');

module.exports = (app) => {

    //
    app.post('/api/new-list', (req, res) => {        
        console.log(req.query.listName);
        var newList = new todoLists({owner: "testOwner", name: req.query.listName});
        newList.save((err, newList) => {
            if(err){console.log(err)}
            //res.redirect('/list/' + newList.id)
            res.json({id: newList.id, owner: newList.owner, sharedWith: newList.sharedWith, listName: newList.name});
        });
    })
}