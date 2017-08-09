var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

module.exports = {
    show: function(request, response) {
        Quote.find({}, function(error, quotes) {
            response.render('quotes', {quotes: quotes});
        })
    },
    create: function(request, response) {
        var now = new Date();
        var now_json = now.toJSON();
        var quote = new Quote({
            name: request.body.name,
            content: request.body.quote,
            created: now_json
        });
        quote.save(function(error) {
            if (error) {
                console.log('ERROR');
            } else {
                response.redirect('/quotes');
            }
        })
    }
}