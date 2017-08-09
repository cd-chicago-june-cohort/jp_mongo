var mongoose = require('mongoose');

var DogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    color: String,
    fav_food: String
});
var Dog = mongoose.model('Dog', DogSchema);