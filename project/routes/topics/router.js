'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require("request");
const fetch = require('node-fetch');


require('../../models/Topics');
const Topic = mongoose.model('Topics');


module.exports = router;

/////// POST route
router.post('/', function(req, res) {
    console.log("function post");
    const form = new Topic({
        name: req.body.name,
        images: req.body.images,
        mostPopular: req.body.images
    });

    if((req.is('application/json') || req.is('application/x-www-form-urlencoded'))
         && form.name !== "" && form.name !== undefined ){

        form.save(function(err, saved) {

                if (err) {
                    throw (err);
                }

                res.status("201").json(saved);
            });

    }

    else {
        res.status(400);
        res.end("Bad request");
    }

 });


/////// GET: all topics
router.get("/",function(req, res){
    const filter = {};

    Favorite.find(filter, function(err, found) {
        if (err) throw (err);

        // Task 4
        if (req.accepts("html")) {
            res.render("allTopics", { list: found });
        } else {
        //     found.forEach(e =>{
        //         e.links = {
        //             "self": "http://127.0.0.1:3000/favorites/"+e.id,
        //         };
        //     });
            res.json(found);
        }
    });

});



// /////// GET / search
// router.get("/search",function(req, res){
//     console.log('router searching')
//
//     const filter = {};
//     if (req.query.name) {
//         filter.name = req.query.name;
//     }
//     if (req.query._id) {
//         filter._id = req.query._id;
//     }
//
//
//     Favorite.find(filter, function(err, found) {
//         if (err) throw (err);
//
//         if (req.accepts("html")) {
//             res.render("allFavourites", { list: found });
//         } else {
//             res.json(found);
//         }
//     });
// });

/////// GET: one favorite with favoriteid
// router.get("/:favoriteid",function(req, res){
//
//     const id = req.params.favoriteid;
//     console.log(id);
//
//     Favorite.findById(id,
//         function(err, found) {
//             if (err) {
//                 res.status(404).end();
//             }
//             else {
//                 if(found === null){
//                     res.status(404).end();
//                 }
//                 else{
//                         let date = Date.now();
//                         found.visited.push(date);
//
//
//                         found.save(function(err, saved) {
//
//                                 if (err) {
//                                     throw (err);
//                                 } else if (req.accepts("html")) {
//
//                                     res.render("allFavourites", { list: [found] });
//
//                                 } else if (req.accepts("json")) {
//                                     found.links = {
//                                         "self": "http://127.0.0.1:3000/favorites/"+found.id
//                                     }
//                                     res.json(found);
//                                 } else {
//                                     //not acceptable
//                                     res.status(406).end();
//                                 }
//
//                             });
//
//
//                 }
//             }
//         });
//
// });

/////// DELETE
router.delete('/:topicid', function(req, res) {

    const id = req.params.favoriteid;

    Topic.findById(id)
    .then(function(found){ return found.remove(); })
    .then(function(removed){ res.status(204).end(); })
    .catch(function(err) {
      if(err.name == "CastError") {
        res.status(404).end();
      } else {
        res.status(404).end();
      }
    });

});

/////// PUT
router.put("/:topicid",function(req, res){

    if (req.is('application/json') || req.is('application/x-www-form-urlencoded')){
        const id = req.params.topicid;

        console.log('route put')
        console.log(req.body.name)
        console.log(req.params.topicid)

        Favorite.findById(id,
        function(err, found) {
            if (err) {
               const notfound = new Topic({
                 name: req.body.name,
                 images: req.body.images,
                 mostPopular: req.body.images
                });

                notfound.save(function(err, saved) {
                    if (err) throw err;
                    res.status(201).json(saved);
                });

            } else {
                    console.log('found')
                    found.name = req.body.name;
                    found.images=req.body.images;
                    found.mostPopular=req.body.mostPopular;

                found.save(function(err, saved) {
                    if(err){
                        console.log(err);
                    }
                    res.json(saved);
                });
            }
        });
    }
    else{
        res.status(400).end();
        res.end('Bad request');
    }
});
