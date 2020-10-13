const mongoose = require('mongoose');

var todoListSchema = new mongoose.Schema({
    owner: {
        type: String, 
        required: true
    },

    name: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('todoLists', todoListSchema);

