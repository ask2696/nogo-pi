var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var usersSchema = require('../models/users.js');
var ObjectID = require('mongodb').ObjectID;

/* GET /users */
router.get('/', function (req, res) {
    usersSchema.find({},function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* GET /users/id */
router.get('/:id', function (req, res, next) {
    usersSchema.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* POST /users */
router.post('/', function (req, res, next) {
    console.log(req.body)
    var userobj = req.body;
    var useruser = {
        uid: req.body.uid
    };
    usersSchema.count(useruser, function (err, usercount) {
        if (err) res.send("fail");
        console.log(usercount);
        if (usercount >= 1) {
//            res.json({
//                error: 'User Exists!'
//            })
            usersSchema.find(useruser, function (err, dupuser) {
                if (err) return next(err);
                res.json(dupuser[0]);
            });
            
        }
        if (usercount == 0) {
            usersSchema.create(userobj,
                function (err, post) {
                    if (err) return next(err);
                    usersSchema.findById(post.id, function (err, post) {
                        if (err) return next(err);
                        res.json(post);
                    });
                }
            );
        }
    });
});

/* PUT /users/:id */
router.put('/:id', function (req, res, next) {
    var userobj = req.body;
    usersSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json({
            success: 'Success!'
        })
    });
});

/* DELETE /users/:id */
router.delete('/:id', function (req, res, next) {
    usersSchema.findByIdAndRemove(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;