var people = require('../controllers/people.js');

module.exports = function(app) {

    app.get('/', function(request, response) {
        people.show_all(request, response);
    });

    app.get('/new/:name/', function(request, response) {
        people.new(request, response);
    });

    app.get('/remove/:name', function(request, response) {
        people.destroy(request, response);
    });

    app.get('/:name', function(request, response) {
        people.show_one(request, response);
    });

};