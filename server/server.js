var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;
var db = require('./db');
var usersController = require('./controllers/users.api');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api', function(req, res){
    res.send('-= api app is work -=');
});

app.get('/api/users', usersController.all);

app.get('/api/users/:id', usersController.findById);
// 
//  *** find object in array ***   
//
 //   var user = users.find(function(user){
 //       return user.id === Number(req.params.id);
 //   });
 //   res.send(user);

app.post('/api/users', usersController.create);

app.put('/api/users/:id', usersController.update);
    //
    // *** find object in array users ***
    //
    // var user = users.find(function(user){
    //     return user.id === Number(req.params.id);
    // })
    // user.name = req.body.name;
    // res.sendStatus(200);
    // })

app.delete('/api/users/:id', usersController.delete);
    
    //
    // *** return objects from array users ***
    //
    // users = users.filter(function(user){
    //     return user.id !== Number(req.params.id);
    // })
    // res.sendStatus(200);
    // })

db.connect('mongodb://localhost:27017', function(err){
    if (err) {
        return console.log(err);
    }
    app.listen(3012, function() {
        console.log('API app started');
    });
})