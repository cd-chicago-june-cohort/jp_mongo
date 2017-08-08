var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/dogs_db');

var DogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    color: String,
    fav_food: String
});
mongoose.model('Dog', DogSchema);
var Dog = mongoose.model('Dog');

app.get('/', function(request, response) {
    Dog.find({}, function(error, dogs) {
        if (error) {
            console.log('ERROR');
            response.render('index');
        } else {
            response.render('index', {dogs: dogs});
        }
    })
})

app.get('/dogs/new', function(request, response) {
    response.render('new');
})

app.post('/dogs', function(request, response) {
    console.log('MADE IT THIS FAR');
    var dog = new Dog({
        name: request.body.name,
        breed: request.body.breed,
        color: request.body.color,
        fav_food: request.body.fav_food
    });
    dog.save(function(error) {
        if (error) {
            console.log('ERROR');
            response.redirect('/');
        } else {
            console.log('Successfully added dog');
            response.redirect('/');
        }
    })
})

app.get('/dogs/:id', function(request, response) {
    Dog.find({_id: request.params.id}, function(error, dog) {
        if (error) {
            console.log('ERROR');
            response.redirect('/');
        } else {
            response.render('show_dog', {dog: dog});
        }
    })
})

app.get('/dogs/edit/:id', function(request, response) {
    Dog.find({_id: request.params.id}, function(error, dog) {
        if (error) {
            console.log('ERROR');
            response.redirect('/');
        } else {
            response.render('edit_dog', {dog: dog});
        }
    })
})

app.post('/dogs/edit/:id', function(request, response) {
    Dog.update({_id: request.params.id}, {
        name: request.body.name,
        color: request.body.color,
        breed: request.body.breed,
        fav_food: request.body.fav_food
    }, function(error, dog) {
        if (error) {
            console.log('ERROR');
        }
        response.redirect('/');
    });
});

app.get('/dogs/delete/:id', function(request, response) {
    Dog.remove({_id: request.params.id}, function(error) {
        if (error) {
            console.log('ERROR');
            response.redirect('/');
        };
        response.redirect('/');
    });
});

app.listen(8000, function() {
    console.log('Listening on port 8000');
})