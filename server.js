var express = require('express');

var app = express();

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
    })
    res.send(user);
})

app.listen(3012, function(){
    console.log('API app started');
});