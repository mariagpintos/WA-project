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

        document.querySelectorAll(".name_favorite").forEach((name_favorite) => {
           name_favorite.addEventListener("keyup", updateName);
         });

        document.querySelectorAll(".delete_favorite").forEach((favorite) => {
           favorite.addEventListener("click", deleteFav);
         });

        document.querySelectorAll(".imgurPost").forEach((postImgur) => {
           postImgur.addEventListener("submit", imgurPost);
       	 });

        document.querySelectorAll(".imgurPut").forEach((putImgur) => {
           putImgur.addEventListener("submit", imgurPut);
       	 });


      });
    });
}

function deleteFav(event){
     doFetchRequest('DELETE', event.target.attributes.action.value, {}, undefined)
      .then((res)=>{
        if (res.status == 204) {
          let dom = event.target.parentNode;
          dom.parentNode.removeChild(dom);

          getFavorites();
          socket.emit('favorite.delete', 'Delete of a favorite');
        }

      });
   }

function search(event) {
     if (event.target.value!=null){
     	console.log('searching')
       doJSONRequest('GET', "/favorites/search?name="+event.target.value, {'Accept': 'application/json'}, undefined)
       .then((data) => {
         dust.render('partials/favouriteImage', {result: data} ,function(err, out) {
                        document.getElementById('favourites').innerHTML = out;
         });
      });
     }
   }

function updateName(event){
	console.log('newName')
	console.log(event.path[1].action);
	console.log(event.target.value);
	console.log(JSON.stringify({name: event.target.value}))

  doFetchRequest('PUT', event.path[1].action, {'Content-Type': 'application/json'}, JSON.stringify({name: event.target.value}))
  .then((data)=>{
  	console.log(data)
    socket.emit('favorite.update', 'Update of a favorite');
  });
}

function imgurPost(event){
     event.preventDefault();
     let dataURL = event.target[0].value;

     let body = {
       image: dataURL.substring(22, dataURL.length),
       name: event.target[1].value,
       album: event.target[2].value,
       tags: event.target[3].value,
       favorify: event.target[4].checked
     }

     console.log(body.favorify)
     console.log(body.tags)

     doFetchRequest('POST', 'favorites/postimgur', {'Content-Type': 'application/json'}, JSON.stringify(body));
     console.log(JSON.stringify(body))

   }

function imgurPut(event){
     event.preventDefault();
     let dataURL = event.target[0].value;

     let body = {
       image:dataURL.substring(22, dataURL.length),
       oldName: event.target[1].value,
       newName: event.target[2].value,
     }

     console.log(body)

     doFetchRequest('PUT', 'favorites/putimgur', {'Content-Type': 'application/json'}, JSON.stringify(body));

   }

