var passport = require('passport');
var connectEnsureLogin = require('connect-ensure-login');
var User = require('../models/user-model');
var todoLists = require('../models/todo-list-model');
var listItem = require('../models/list-item-model');
var Mongoose = require('mongoose');
const url = require('url');


// ADD IN PROPER USER LOGGING AND AUTHENTICATION
// i JUST DONT YET KNOW HOW TO USE POSTMAN WITH AUTHENTICATION

//These are all the api routes, they take parameters via query string and return json
//the query string parameters and return json structure is commented above each route

module.exports = (app) => {

    //query string to include 'listName'
    //JSON to include 'id', 'owner', 'sharedWith', 'listName'
    app.post('/api/new-list', (req, res) => {        
        console.log(req.query.listName);
        var newList = new todoLists({owner: "testOwner", name: req.query.listName});
        newList.save((err, newList) => {
            if(err){console.log(err)}
            //res.redirect('/list/' + newList.id)
            res.json({id: newList.id, owner: newList.owner, sharedWith: newList.sharedWith, listName: newList.name});
        });
    })

    app.post('/api/new-list-item', (req, res) => {
        var newListItem = new listItem({listId: req.query.listId, itemText: req.query.itemText});
        newListItem.save((err, ListItem) => {
            if (err) { return err; }
            res.json(ListItem);
        })
    })

    
    //query string to include 'listId'
    //JSON is a list of list-item-model that match the given todo-list-model id
    app.get('/api/get-list-by-id', (req,res) => {       
        listItem.find({listId: req.query.listId}, (err, docs) => {
            res.json(docs);
        })
    })
}