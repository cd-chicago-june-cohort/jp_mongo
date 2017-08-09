var mongoose = require('mongoose');
var Person = mongoose.model('Person');

module.exports = {

    show_all: function(request, response) {
        Person.find({}, function(error, people) {
            if (error) {
                console.log('ERROR');
            } else {
                response.json(people);
            }
        })
    },

    new: function(request, response) {
        var person = new Person({
            name: request.params.name
        });
        person.save(function(error) {
            if (error) {
                console.log('ERROR');
            } else {
                response.redirect('/');
            }
        })
    },

    destroy: function(request, response) {
        Person.remove({name: request.params.name}, function(error) {
            if (error) {
                console.log('ERROR');
                response.redirect('/');
            } else {
                response.redirect('/');
            }
        })
    },

    show_one: function(request, response) {
        Person.find({name: request.params.name}, function(error, person) {
            if (error) {
                console.log('ERROR');
            } else {
                response.json(person);
            }
        })
    }

}