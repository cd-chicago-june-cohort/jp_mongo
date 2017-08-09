var mongoose = require('mongoose');

var QuoteSchema = new mongoose.Schema({
    name: String,
    content: String,
    created: Date
}, {timestamps: true})

var Quote = mongoose.model('Quote', QuoteSchema);