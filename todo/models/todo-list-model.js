const mongoose = require('mongoose');
const userModel = require('./user-model');

var todoListSchema = new mongoose.Schema({
    //_id: mongoose.Types.ObjectId,
    
    owner: {
        type: String, 
        required: true
    },

    sharedWith: [userModel],

    name: {
        type: String, 
        required: true
    }

});

module.exports = mongoose.model('todoLists', todoListSchema);

