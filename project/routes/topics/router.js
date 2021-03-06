'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require("request");
const fetch = require('node-fetch');


require('../../models/Topics');
const Topic = mongoose.model('Topics');

require('../../models/Favorites');
const Favorite = mongoose.model('Favorites');


module.exports = router;

/////// POST route
router.post('/', function(req, res) {
  console.log("function post router");

    const form = new Topic({
        name: req.body.name
        // images: req.body.images,
        // mostPopular: req.body.images
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
    console.log("get topics1");


    Topic.find(filter, function(err, found) {
        if (err) throw (err);
        console.log("get topics");
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



/////// GET / search
router.get("/search",function(req, res){
    console.log('topic searching');

    const filter = {};
    if (req.query.name) {
        filter.name = req.query.name;
    }
    if (req.query._id) {
        filter._id = req.query._id;
    }

    console.log(filter.name);

    Topic.find(filter, function(err, found) {
        if (err){
          console.log(err);

        } else {

          console.log(found);
          // console.log("ID ES "+found[0]._id);
          if (found !==undefined){
        if (req.accepts("html")) {
            res.render("allTopics", { list: found });
        } else {
            res.json(found[0]._id);
        }
      } else {
        console.log("no topic with that name or id")
      }
      }

    });
});


router.get("/checkFavs", function(req,res){
  console.log("delete fav from topic");

  const filter={};

  Topic.find(filter, function (err, found) {

    Favorite.find(filter, function(err,foundFavs) {

      for (let i=0;i<found.length;i++){
        console.log("topic " +found[i].name);
        let imgs=found[i].images;
        let pos=[];

        for (let j=0; j<imgs.length;j++){
          pos[j]=-1;
        }

        console.log("pos inicial "+pos);

        for (let j=0; j<imgs.length;j++){
          for (let k=0; k<foundFavs.length;k++){

            console.log("id de img: "+imgs[j]._id);
            console.log("id de favs: "+foundFavs[k]._id);

          if (imgs[j]._id.equals(foundFavs[k]._id)){
            console.log("He encontrado un id igual");
            pos[j]=0;
          }
        }
      }

      console.log("pos final "+pos);

      for (let l=0; l<pos.length; l++){
        if (pos[l]===-1){
          console.log("elimino de la posicion "+l);
          imgs.splice(l,1);
        }
      }
      found[i].images=imgs.slice();
      let mP=checkMostPopular(found[i]);
      found[i].mostPopular=mP;
      console.log("longitud imgs es "+imgs.length);
      console.log("longitud fav es "+found[i].images.length);


      found[i].save(function(err, saved) {
          // res.json(saved);

          if(err){
              console.log(err);
          }
          // res.json(saved);
      });

      }

          // res.json(found);


    });






  });
});

router.get("/images", function(req,res){
  console.log(req.query.id)
  const filter = {};
  console.log('xxxxxxxxxxxxxxxxx')
  console.log(req.query._id);
  //if (req.query._id) {
    //  filter._id = req.query._id;
  //}

  /*Topic.find(filter, function(err, found) {
      if (err) throw (err);
        //console.log(found);
        //console.log("ID ES "+found[0]._id);

      //if (req.accepts("html")) {
          //res.render("allTopics", { list: found.images });
      //} else {
        console.log(found[0].images.length)
          res.json(found[0].images);
      //}

  });*/

  const id = req.query.id;
    console.log(id);


    Topic.findById(id,
        function(err, found) {
            if (err) {
                res.status(404).end();
            }
            else {
                if(found === null){
                    res.status(404).end();
                }
                else{
                  //console.log(found[0].length)
                  //res.json(found[0]);
                  console.log(found.images.length)
                  res.json(found.images);


                }
            }
        });



});

function checkMostPopular(data){
  console.log("function mostPopular");
  let max=0;
  let result;
  // console.log(data);
  console.log("length es "+data.images.length)
  for (let i=0;i<data.images.length;i++){
    console.log("i en funcion mostPopular "+i);
    if (data.images[i].popularity>max){
      result=data.images[i].dataURL;
      max=data.images[i].popularity;
      console.log(max);
    }
  }
  // console.log("Resultado de funcion es "+result);
  //console.log("fin funcion mostPopular");
  return result;
}


router.get("/update",function(req, res){
    console.log('topic updating');

    const filter = {};
    if (req.query.name) {
      console.log("hay query name");
        filter.name = req.query.name;
    }

    console.log(req.query.name);

    console.log(filter);
    console.log(filter.name);

    Topic.find(filter, function(err, found) {
        if (err) throw (err);

          console.log(found.length);
          console.log("ID DE FOUND ES "+found[0]._id);

          console.log(found);

          const filter2 = {};
          filter2.topic=found[0].name;
          const filter3={};

          // if (req.query._id) {
          //     filter3._id = req.query._id;
          // }

          Favorite.find(filter2, function(err,favFound){

            //console.log("FAV ENCONTRADO "+favFound);

            // console.log("ID DE FAV ENCONTRADO "+favFound._id);

            if (err){
              console.log(err);
            };

            for (let i=0;i<favFound.length;i++){

            // console.log(filter2);

            console.log("FAV ENCONTRADO NOMBRE: "+favFound[i].name);
            console.log("FAV ENCONTRADO ID: "+favFound[i]._id);

            // console.log("FOUND BEGINNING"+found[0]);

            console.log("LONGITUD DE IMAGES "+found[0].images.length);

            let c=0;
            if (found[0].images.length!==0){
              console.log("la longitud de imagenes es distinta de 0");
            for (let j=0; j<found[0].images.length; j++){
              console.log("j es "+j);
              console.log("id de topic images "+found[0].images[j]._id);
              console.log("id de fav con ese topic "+favFound[i]._id);
              if ((found[0].images[j].dataURL) === (favFound[i].dataURL)){
                console.log("c es 1 porque ya hay un fav ");
                c=1;
              } else{
                console.log("considero que no son iguales");
              }
            }
          }

            if (c===0){
            found[0].images.push(favFound[i]);
            console.log("tam de images "+found[0].images.length);
            let mP=checkMostPopular(found[0]);
            found[0].mostPopular=mP;
            if (found[0].mostPopular!==""){
              console.log("tenemos mostPopular");
              // console.log(found[0].mostPopular);
            }
            // console.log("FOUND END"+found[0]);

            found[0].save(function(err, saved) {
                res.json(saved);

                if(err){
                    console.log(err);
                }
                // res.json(saved);
            });
          } else {
            console.log("there is not a new fav with that topic");
            found[0].save(function(err, saved) {
                // res.json(saved);

                if(err){
                    console.log(err);
                }
                // res.json(saved);
            });
          }
          }

          });
    });
});


/////// DELETE
router.delete('/:topicid', function(req, res) {

    const id = req.params.topicid;

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

        Topic.findById(id,
        function(err, found) {
            if (err) {
               const notfound = new Topic({
                 name: req.body.name,
                 images: req.body.images
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
