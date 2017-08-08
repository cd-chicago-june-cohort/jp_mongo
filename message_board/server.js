var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/message_db');

var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
    message_poster: String,
    message_content: {type: String, required: true},
    created_at: Date,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var CommentSchema = new mongoose.Schema({
    comment_poster: String,
    comment_content: {type: String, required: true},
    created_at: Date,
    _message: {type: Schema.Types.ObjectId, ref: "Message"}
});

mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');






app.get('/', function(request, response) {


    Message.find({}).sort('-created_at').populate('comments').exec(function(error, messages) {

        if (error) {
            console.log('ERROR');
            response.render('index');
        } else {
            response.render('index', {messages: messages});
        }
    });
});






app.post('/add_message', function(request, response) {
    var now = new Date();
    var now_json = now.toJSON();
    var message = new Message({
        message_poster: request.body.name,
        message_content: request.body.message_content,
        created_at: now_json,
        comments: []
    })
    message.save(function(error) {
        if (error) {
            console.log('ERROR');
        } else {
            console.log('SUCCESSFULLY ADDED MESSAGE: ', request.body)
        }
        response.redirect('/');
    });
});







app.post('/add_comment/:id', function(request, response) {

    Message.findOne({_id: request.params.id}, function(error, message) {

        var now = new Date();
        var now_json = now.toJSON();
        var comment = new Comment({
            comment_poster: request.body.commentor,
            comment_content: request.body.comment_content,
            created_at: now_json,
            _message: request.params.id
        });

        comment.save(function(error) {
            if (error) {
                console.log('ERROR IN SAVING COMMENT');
                response.redirect('/');
            } else {
                message.comments.push(comment);
                message.save(function(error) {
                    if (error) {
                        console.log('ERROR IN SAVING MESSAGE');
                        response.redirect('/');
                    } else {
                        console.log('COMMENT SUCCEFFULLY ADDED!!!!!');
                        response.redirect('/');
                    }
                })
            }
        });


    });


});










app.listen(8000, function() {
    console.log('Listening on port 8000');
});