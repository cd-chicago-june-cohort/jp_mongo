var mongoose = require('mongoose');
var Dog = mongoose.model('Dog');

module.exports = {

    show_all: function(request, response) {
        Dog.find({}, function(error, dogs) {
            if (error) {
                console.log('ERROR');
                response.render('index');
            } else {
                response.render('index', {dogs: dogs});
            }
        });
    },

    new: function(request, response) {
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
        });
    },

    show_one: function(request, response) {
        Dog.find({_id: request.params.id}, function(error, dog) {
            if (error) {
                console.log('ERROR');
                response.redirect('/');
            } else {
                response.render('show_dog', {dog: dog});
            }
        })
    },

    init_edit: function(request, response) {
        Dog.find({_id: request.params.id}, function(error, dog) {
            if (error) {
                console.log('ERROR');
                response.redirect('/');
            } else {
                response.render('edit_dog', {dog: dog});
            }
        })
    },

    commit_edit: function(request, response) {
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
    },

    destroy: function(request, response) {
        Dog.remove({_id: request.params.id}, function(error) {
            if (error) {
                console.log('ERROR');
                response.redirect('/');
            };
            response.redirect('/');
        });
    }

};