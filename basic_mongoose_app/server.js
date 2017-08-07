var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/my_first_db');

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    
    response.render('index');
})

app.post('/users', function(request, response) {
    console.log('POST DATA', request.body);

    var user = new User({name: request.body.name, age: request.body.age});

    user.save(function(err) {
        if (err) {
            console.log('Something went wrong');
        } else {
            console.log('Successfully added a user');
            response.redirect('/');
        }
    })
    
})

app.listen(8000, function() {
    console.log('Listening on port 8000');
})