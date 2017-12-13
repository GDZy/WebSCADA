var ObjectID = require('mongodb').ObjectID;
var db = require('../../db');

exports.all = function ( callback ) {
    db.get().collection('users').find().toArray( function (err, docs) {
        callback(err, docs);
    });
}

exports.findById = function (id, cb) {
    console.log(id);
    db.get().collection('users').findOne(
        { _id: ObjectID(id) }, 
        function (err, doc) {
            cb(err, doc);
        }
    )
}

exports.create = function (user, cb) {
    db.get().collection('users').insert(user, function (err, result) {
        cb(err, result);
    });
};

exports.update = function (id, newData, cb) {
    db.get().collection('users').updateOne( 
        { _id: ObjectID(id) },
        newData,
        function (err, result) {
            cb(err, result)
        }
    )
}

exports.delete = function (id, cb) {
    db.get().collection('users').deleteOne(
        { _id: ObjectID(id) },
        function (err, result) {
            cb(err, result);
        }
    )
}