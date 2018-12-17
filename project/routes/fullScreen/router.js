'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require("request");
const fetch = require('node-fetch');

require('../../models/Favorites');
const Favorite = mongoose.model('Favorites');

module.exports = router;

router.post("/:imageid",function(req, res){
	//console.log(req)
	console.log('get')

	const id = req.params.imageid;

	Favorite.findById(id,
        function(err, found) {
            if (err) {
                res.status(404).end();
            }
            else {
                if(found === null){
                    res.status(404).end();
                }
                else{
                        
                ++found.popularity;
                console.log(found.popularity)
				found.save(function(err, saved) {
					res.json(saved);
				 });

                }
            }
        });

});