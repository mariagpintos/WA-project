/** @module root/router */
'use strict';

const express = require('express');
const router = express.Router();

/** router for /root */
module.exports = router;

router.get("/",function(req, res){
    if (req.accepts("html")){
        res.render("index", {message: "Welcome to Express"});
    } else {
        res.json(response);
    }

});
