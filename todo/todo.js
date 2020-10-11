var express = require('express');

var todoController = require('./controllers/todo-controller');

var app = express();

app.set('view engine', 'ejs');

todoController(app);

app.listen(9000, () => {
    console.log('server listening on port 9000');
});