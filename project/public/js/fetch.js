/* Fetch */

/*
 * @param {String} method The method of the Fetch request. One of: "GET", "POST", "PUT", "DELETE".
 * @param {String} url The url of the API to call, optionally with parameters.
 * @param {Object} headers The Associative Array containing the Request Headers. It must be null if there are no headers.
 * @param {String} body The body String to be sent to the server. It must be null if there is no body.
 */

function doFetchRequest(method, url, headers, body) {

  if ((arguments.length) !== 4 || (method !== 'POST' && method !== 'PUT' &&
      method !== 'GET' && method !== 'DELETE') || (body && typeof body !== 'string')) {
    throw new Error('no valid input');
  }
  else if (method === 'POST' || method === 'PUT') {
  	console.log(method);
         console.log(url);
         console.log(headers);


    return fetch(url, {
      method: method,
      headers: headers,
      body: body
    });
  }
  else {
    return fetch(url, {
      method: method,
      headers: headers,
    });
  }
}

/* Fetch */


function doJSONRequest(method, url, headers, body){

	if ((arguments.length != 4) || (method !== 'GET' && method && 'POST' && method && 'PUT' && method !== 'DELETE'))  {
		throw new Error('no valid input');
	}

	if ((headers["Content-Type"] && headers["Content-Type"] !== "application/json") || (headers["Accept"] && headers["Accept"] !== "application/json")) {
    	throw new Error();
  	}
  	headers["Accept"] = "application/json";

	if ((method === "POST") || (method === "PUT")) {
	    headers["Content-Type"] = "application/json";
	}

	return doFetchRequest(method, url, headers, JSON.stringify(body)).then((res) => {
	    return res.json()
	});

}


function getFavorites(){
    doFetchRequest('GET', "/favorites",{'Accept': 'application/json'}, undefined)
    .then((response) => {
       return response.json(); })
    .then((data)=>{
      // render the favorites_partial found in public/js/views.js
      dust.render('partials/favouriteImage', {result: data} ,function(err, out) {
                     // out contains the rendered HTML string.
        document.getElementById('favourites').innerHTML = out;

        document.querySelectorAll(".little_image").forEach((image) => {
          console.log('listener added')
           image.addEventListener("click", getFullScreen);
         });

        document.querySelectorAll(".name_favorite").forEach((name_favorite) => {
           name_favorite.addEventListener("keyup", updateName);
         });

         document.querySelectorAll(".updateTopicFav").forEach((updateTopicFav) => {
            updateTopicFav.addEventListener("click", topicUpdater);
          });

        document.querySelectorAll(".delete_favorite").forEach((favorite) => {
           favorite.addEventListener("click", deleteFav);
         });



      });
    });
}


function getFullScreen(e){

    console.log(e.target.attributes.action.value)
    console.log(e)

    var div = document.getElementById('fullScreen');
    div.innerHTML = ''
    //div.classList.add('container');

    var img = document.createElement('img');
    img.src = e.target.src;

    console.log(e.target.parentNode.childNodes);

    //var allImages = document.getElementById('favourites').childNodes;
    var allImages = e.target.parentNode.childNodes;
    var count = 0;

    var button = document.createElement('button');
    button.onclick = function(e){
        //let nextImage = allImages[count].childNodes[1].src;
        let nextImage = allImages[count].src;
        img.src = nextImage;
        count ++;
        if(count > allImages.length-1) count = 0;
        countImage();

    }.bind(this);

    function countImage(){
        //let nextImage = allImages[count].childNodes[1].src;
        let nextImage = allImages[count].src;
        img.src = nextImage;
        count ++;
        if(count > allImages.length-1) count = 0;
        setTimeout(countImage, 2000);
    }

    div.append(img);
    div.append(button)

    doFetchRequest('POST', event.target.attributes.action.value, {}, undefined)
    .then((data)=>{
     console.log(data)
      socket.emit('image.popularity', 'Increase popularity of image');
    });

}



function getTopics(){
  //debugger;
  doFetchRequest('GET', "/topics",{'Accept': 'application/json'}, undefined)
  .then((response) => {
     return response.json(); })
  .then((data)=>{
    console.log(data);
    // render the favorites_partial found in public/js/views.js
    dust.render('partials/topicImage', {result: data} ,function(err, out) {
      // out contains the rendered HTML string.
      document.getElementById('topics').innerHTML = out;

      document.querySelectorAll(".thumbnail").forEach((image) => {
         image.addEventListener("click", getAllImages);
       });

       document.querySelectorAll(".postTopic").forEach((postTopic) => {
          postTopic.addEventListener("click", postTopic);
        });

        document.querySelectorAll(".nameTopic").forEach((nameTopic) => {
           nameTopic.addEventListener("keyup", changeNameTopic);
         });

         document.querySelectorAll(".delete_topic").forEach((topic) => {
            topic.addEventListener("click", deleteTopic);
          });

    });
  });
}



function getAllImages(event){

  console.log(event);
  console.log(event.target.attributes.action);
  pieces = event.target.attributes.action.value.split("/");
  console.log(pieces[pieces.length-1])
  console.log(event.target.value)
  console.log(event.path[1].childNodes)
  console.log(event.path[1].childNodes[2].childNodes)

  doFetchRequest('GET', "topics/checkFavs",{'Accept': 'application/json'}, undefined)
  .then((data1)=>{

    console.log("second data");
    console.log(data1);

    socket.emit('topic.update', 'Update of a topic');

    // getTopics();

  });



  doJSONRequest('GET', "/topics/images?id="+pieces[pieces.length-1], {'Accept': 'application/json'}, undefined)
  .then((data) => {
    console.log("HERE COMES DATA OF getAllImages");
    console.log(data)


    //div.classList.add('container');
    if(event.path[1].childNodes[2].childNodes.length == 0){

      for(let i = 0; i < data.length; i++){

        //<input class="little_image" type="image" src="{dataURL}" alt="Alt text" action="/fullScreen/{_id}" method='POST' height="50px"/>
        //var img = document.createElement('img');
        //img.src = data[i].dataURL;

        var input = document.createElement('input');
        input.type = "image";
        input.src = data[i].dataURL;
        input.setAttribute("action", "/fullScreen/"+data[i]._id);
        //input.action = "/fullScreen/"+data[i]._id;

        input.addEventListener("click", getFullScreen);
        event.path[1].childNodes[2].append(input);
      }
    }
    else{
      event.path[1].childNodes[2].innerHTML = '';
    }



    //dust.render('partials/topicImage', {result: data} ,function(err, out) {
                   //document.getElementById('topics').innerHTML = out;
    //});
 });

// });
}


function deleteFav(event){

  console.log(event.target.attributes.action.value);
  console.log(event.target.attributes.action);
  console.log(event.target.attributes);
  console.log(event.target);


     doFetchRequest('DELETE', event.target.attributes.action.value, {}, undefined)
      .then((res)=>{
        if (res.status == 204) {
          let dom = event.target.parentNode;
          dom.parentNode.removeChild(dom);

          socket.emit('favorite.delete', 'Delete of a favorite');

          doFetchRequest('GET', "topics/checkFavs",{'Accept': 'application/json'}, undefined)
          .then((data)=>{

            socket.emit('topic.update', 'Update of a topic');

            getTopics();

          });
        }
      });
   }

function updateName(event){

  console.log(event.path);
  console.log(event.target.value);
  //console.log(event.target.attributes.action.value)

     doFetchRequest('PUT', event.path[1].action, {'Content-Type': 'application/json'}, JSON.stringify({name: event.target.value}))
     .then((data)=>{
     	console.log(data);
       socket.emit('favorite.update', 'Update of a favorite');
     });
}

//of favorite
function topicUpdater(event){
  console.log(event.path[1].childNodes[3].value);
  console.log(event.target.value)
    let nameTopic = event.path[1].childNodes[3].value;
    console.log(document.getElementById("topicFavorite"));
    console.log(document.getElementById("topicFavorite").value);
    console.log("NAME OF THE TOPIC "+nameTopic);

    doFetchRequest('GET', "/topics/search?name="+nameTopic, {'Accept': 'application/json'}, undefined)
    .then((res)=>{
      console.log(res);
      if (res.status==200){

        doFetchRequest('PUT', event.target.attributes.action.value, {'Content-Type': 'application/json'}, JSON.stringify({topic: nameTopic}))
        .then((data)=>{
         // console.log(data);
          socket.emit('favorite.update', 'Update of a favorite');
        });

        doFetchRequest('GET', "/topics/update?name="+nameTopic, {'Accept': 'application/json'}, undefined)
        .then((data2)=>{
          console.log("FINAL PART OF TOPIC UPDATER");
          // console.log(data2);
          socket.emit('topic.update', 'Update of a topic');
          getTopics();

        });

      } else {
        console.log("That topic does not exist");
      }

    });

}

function deleteTopic(event){

  // deleteFromTopic(event.target.attributes.action.value);

     doFetchRequest('DELETE', event.target.attributes.action.value, {}, undefined)
      .then((res)=>{
        if (res.status == 204) {
          let dom = event.target.parentNode;
          dom.parentNode.removeChild(dom);

          socket.emit('topic.delete', 'Delete of a topic');
        }

      });
   }

function changeNameTopic(event){
  doFetchRequest('PUT', event.path[1].action, {'Content-Type': 'application/json'}, JSON.stringify({name: event.target.value}))
  .then((data)=>{
   console.log(data);
    socket.emit('topic.update', 'Update of a topic');
  });

}

function postTopic(event){
  //debugger;
  console.log("funcion topic post");
  //debugger;

  if (document.getElementById("topicName")!==null){

  let nameGot=document.getElementById("topicName").value;
  console.log(nameGot);
  console.log(document.getElementById("topicName"));
  //debugger;

  doFetchRequest('POST', "/topics", {'Content-Type': 'application/json'}, JSON.stringify({name: nameGot}))
  .then((data)=>{
   console.log(data)
    socket.emit('topic.create', 'Post of a topic');
  });

  getTopics();

} else{
  console.log("argumento null");
}

}


function search(event) {
  var value = event.target.value;
  console.log(value);
     if (event.target.value!=null){
       doJSONRequest('GET', "/favorites/search?name="+event.target.value, {'Accept': 'application/json'}, undefined)
       .then((data) => {
         dust.render('partials/favouriteImage', {result: data} ,function(err, out) {
                        document.getElementById('favourites').innerHTML = out;
         });
      });
    }
}

//Sorting functions

function sortByDate(data) {
  let dataOrdered=new Array();

  for (let i=data.length-1;i>=0;i--){
    console.log("i es "+i);
    console.log(data[i].dateCreated);
    dataOrdered.push(data[i]);
  }

  return dataOrdered;
}

function sortByPopularity(data){
  let dataPopular=new Array();
  var aux;

  dataPopular.push(data[0]);

  for (let i=1;i<data.length;i++){
    //console.log("length de data " +data.length); 5
    aux=data[i].popularity;
    console.log("aux es "+aux);
    console.log("longitud de datapopular "+dataPopular.length);

    if (aux>dataPopular[0].popularity){
        dataPopular.unshift(data[i]);
    } else if (aux<=dataPopular[dataPopular.length-1].popularity){
        dataPopular.push(data[i]);
    } else {
        for (let j=0;j<dataPopular.length;j++){
          if (dataPopular[j].popularity>aux && dataPopular[j+1].popularity<=aux){
            dataPopular.splice(j+1,0,data[i]);
          }
        }
      }
      console.log("FIN DE UNA VUELTA");
  }
  console.log("resultado");
  for (let j=0;j<dataPopular.length;j++){
    console.log(dataPopular[j].popularity);
  }
  return dataPopular;
}


function handleSortChange (event) {
  let nameGot=document.getElementById("nameTopic").value;
  console.log(nameGot);


  var value = event.target.value;
  console.log(value);


  if (event.target.value!=null){
    if (value === 'date-created') {

      console.log("value es dateCreated");
      doJSONRequest('GET', "/favorites", {'Accept': 'application/json'}, undefined)
      .then((data) => {
        newData=sortByDate(data);
        dust.render('partials/favouriteImage', {result: newData} ,function(err, out) {
          document.getElementById('favourites').innerHTML = out;
          document.querySelectorAll(".little_image").forEach((image) => {
          console.log('listener added')
           image.addEventListener("click", getFullScreen);
         });

        document.querySelectorAll(".name_favorite").forEach((name_favorite) => {
           name_favorite.addEventListener("keyup", updateName);
         });

         document.querySelectorAll(".updateTopicFav").forEach((updateTopicFav) => {
            updateTopicFav.addEventListener("click", topicUpdater);
          });

        document.querySelectorAll(".delete_favorite").forEach((favorite) => {
           favorite.addEventListener("click", deleteFav);
         });


        });
      });
    } else if (value === 'popularity') {
      console.log("value es popularity");
      doJSONRequest('GET', "/favorites", {'Accept': 'application/json'}, undefined)
      .then((data) => {
      newData=sortByPopularity(data);
      dust.render('partials/favouriteImage', {result: newData} ,function(err, out) {
          document.getElementById('favourites').innerHTML = out;
          document.querySelectorAll(".little_image").forEach((image) => {
          console.log('listener added')
           image.addEventListener("click", getFullScreen);
         });

        document.querySelectorAll(".name_favorite").forEach((name_favorite) => {
           name_favorite.addEventListener("keyup", updateName);
         });

         document.querySelectorAll(".updateTopicFav").forEach((updateTopicFav) => {
            updateTopicFav.addEventListener("click", topicUpdater);
          });

        document.querySelectorAll(".delete_favorite").forEach((favorite) => {
           favorite.addEventListener("click", deleteFav);
         });


      });
   });
 } else {
   console.log("value es default");
   doJSONRequest('GET', "/favorites", {'Accept': 'application/json'}, undefined)
   .then((data) => {
     dust.render('partials/favouriteImage', {result: data} ,function(err, out) {
        document.getElementById('favourites').innerHTML = out;
        document.querySelectorAll(".little_image").forEach((image) => {
          console.log('listener added')
           image.addEventListener("click", getFullScreen);
         });

        document.querySelectorAll(".name_favorite").forEach((name_favorite) => {
           name_favorite.addEventListener("keyup", updateName);
         });

         document.querySelectorAll(".updateTopicFav").forEach((updateTopicFav) => {
            updateTopicFav.addEventListener("click", topicUpdater);
          });

        document.querySelectorAll(".delete_favorite").forEach((favorite) => {
           favorite.addEventListener("click", deleteFav);
         });


     });
  });
 }
}

};
