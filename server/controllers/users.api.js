var usersModel = require('../models/users');

exports.all = function (req, res) {
    console.log('read data from DB');
    usersModel.all( function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    } )
}

exports.findById = function (req, res) {
    usersModel.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}

exports.create = function(req, res) {
    var user = {
        name: req.body.name
    }
    usersModel.create( user, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(user);
    } )
}

exports.update = function(req, res) {
    usersModel.update(req.params.id, {$set: {name: req.body.name}}, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}

exports.delete = function (req, res) {
    usersModel.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}