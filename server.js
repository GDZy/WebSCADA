var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = [
    {
        id: 1,
        name: 'administrator'
    },
    {   
        id: 2,
        name: 'user1'
    }
];

app.get('/', function(req, res){
    res.send('-= api app is work -=');
});

app.get('/users', function(req, res){
    db.collection('users').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return sendStatus(500);
        }
        res.send(docs);
    });
})

app.get('/users/:id', function(req, res){
    db.collection('users').findOne( { _id: ObjectID(req.params.id) }, function (err, doc) {
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

app.post('/users', function (req, res){
    var user = {
        //id: Date.now(),
        name: req.body.name
     };

     console.log(req.body);
     
     db.collection('users').insert(user, function (err, result) {
     
         if (err) {
            console.log(err);
            return res.sendStatus(500);
         }

         res.send(user);
     })
})

app.put('/users/:id', function(req, res){
    var user = users.find(function(user){
        return user.id === Number(req.params.id);
    })

    user.name = req.body.name;

    res.sendStatus(200);
})

app.delete('/users/:id', function(req, res){
    users = users.filter(function(user){
        return user.id !== Number(req.params.id);
    })

    res.sendStatus(200);
})

MongoClient.connect('mongodb://localhost:27017', function(err, database){
    if (err) {
        return console.log(err);
    }
    db = database.db('dbCount');
    app.listen(3012, function() {
        console.log('API app started');
    });
})