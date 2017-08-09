var dogs = require('../controllers/dogs.js');

module.exports = function(app) {

    app.get('/', function(request, response) {
        dogs.show_all(request, response);
    })

    app.get('/dogs/new', function(request, response) {
        response.render('new');
    })

    app.post('/dogs', function(request, response) {
        dogs.new(request, response);
    })

    app.get('/dogs/:id', function(request, response) {
        dogs.show_one(request, response);
    })

    app.get('/dogs/edit/:id', function(request, response) {
        dogs.init_edit(request, response);
    })

    app.post('/dogs/edit/:id', function(request, response) {
        dogs.commit_edit(request, response);
    });

    app.get('/dogs/delete/:id', function(request, response) {
        dogs.destroy(request, response);
    });

};