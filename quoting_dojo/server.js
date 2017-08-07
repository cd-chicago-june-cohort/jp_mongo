

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost/quotes_db');


var QuoteSchema = new mongoose.Schema({
    name: String,
    content: String,
    created: Date
}, {timestamps: true})
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');


app.get('/', function(request, response) {
    response.render('index');
})


app.get('/quotes', function(request, response) {

    Quote.find({}, function(error, quotes) {
        if (error) {
            console.log("ERROR");
            response.redirect('/');
        } else {
            response.render('quotes', {quotes: quotes});
        }
    })

    
})


app.post('/quotes', function(request, response) {

    var now = new Date();
    var now_json = now.toJSON();
    
    var quote = new Quote({name: request.body.name, content: request.body.quote, created: now_json});

    quote.save(function(error) {
        if (error) {
            console.log('ERROR');
        } else {
            console.log('Successfully added quote');
            response.redirect('/quotes');
        }
    })

})


app.listen(8000, function() {
    console.log('Listening on port 8000');
})