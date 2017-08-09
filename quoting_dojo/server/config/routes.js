
var quotes = require('../controllers/quotes.js');

module.exports = function(app) {
    app.get('/', function(request, response) {
        response.render('index');
    });
    app.get('/quotes', function(request, response) {
        quotes.show(request, response);
    });
    app.post('/quotes', function(request, response) {
        quotes.create(request, response);
    })
}