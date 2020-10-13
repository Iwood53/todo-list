const mongoose = require('mongoose');

var listItemSchema = new mongoose.Schema({
    listId: {
        type: String, 
        required: true
    },

    itemText: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean, 
        required: true,
        default: false
    },

    completedBy: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('listItems', listItemSchema);