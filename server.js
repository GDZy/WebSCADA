var express = require('express');
var bodyParser = require('body-parser');

var app = express();

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
    res.send(users);
})

app.get('/users/:id', function(req, res){
    var user = users.find(function(user){
        return user.id === Number(req.params.id);
    });
    res.send(user);
})

app.post('/users', function(req, res){
    var user = {
        id: Date.now(),
        name: req.body.name
     };

     users.push(user);
     res.send(user);
     console.log(req.body);
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

app.listen(3012, function(){
    console.log('API app started');
});