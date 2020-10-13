var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var todoList = require('./todo-list-model');

//var schema = mongoose.Schema;

var UserDetal = new mongoose.Schema({
    username: String,
    password: String
});

UserDetal.methods.getOwnedLists = (callback) => {
    todoList.find({owner: this.id}).exec((err,docs) => {
        if(err) { return callback(err, null); }
        callback(null, docs)
    });
}

UserDetal.plugin(passportLocalMongoose);

module.exports = mongoose.model('userinfo', UserDetal, 'userInfo');