const mongoose = require('mongoose');

var todoListSchema = new mongoose.Schema({
    //_id: mongoose.Types.ObjectId,
    
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

