module.exports = (app) => {
    app.get('/', function(req, res){
        res.render('index-view');         
    });

    app.get('/todo', function(req, res){
        res.render('todo-list');         
    });
}