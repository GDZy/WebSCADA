var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;
var db = require('./db');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var users = [
//     {
//         id: 1,
//         name: 'administrator'
//     },
//     {   
//         id: 2,
//         name: 'user1'
//     }
// ];

app.get('/', function(req, res){
    res.send('-= api app is work -=');
});

app.get('/users', function(req, res) {
    db.get().collection('users').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return sendStatus(500);
        }
        res.send(docs);
    });
})

app.get('/users/:id', function(req, res){
    db.get().collection('users').findOne( { _id: ObjectID(req.params.id) }, function (err, doc) {
        if (err) {
            console.log(err);
            return sendStatus(500);
        }
        res.send(doc);
    })
    
 //   var user = users.find(function(user){
 //       return user.id === Number(req.params.id);
 //   });
 //   res.send(user);
})

app.post('/users', function (req, res) {
    var user = {
        //id: Date.now(),
        name: req.body.name
     };

     console.log(req.body);
     
     db.get().collection('users').insert(user, function (err, result) {
     
         if (err) {
            console.log(err);
            return res.sendStatus(500);
         }

         res.send(user);
     })
})

app.put('/users/:id', function(req, res){
    console.log(req.params);
    console.log(req.params.id);
    console.log(req.body.name);
    db.get().collection('users').updateOne(
        { _id: ObjectID(req.params.id) },
        { $set: {name: req.body.name }},
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
    // var user = users.find(function(user){
    //     return user.id === Number(req.params.id);
    // })
    // user.name = req.body.name;
    // res.sendStatus(200);
})

app.delete('/users/:id', function(req, res){
    db.get().collection('users').deleteOne(
        { _id: ObjectID(req.params.id) },
        function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )

    // users = users.filter(function(user){
    //     return user.id !== Number(req.params.id);
    // })
    // res.sendStatus(200);
})

db.connect('mongodb://localhost:27017', function(err){
    if (err) {
        return console.log(err);
    }
    app.listen(3012, function() {
        console.log('API app started');
    });
})