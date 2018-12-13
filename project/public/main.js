//  Enter your initialization code here

function init() {

    // Create canvas app
    const app = new App({canvas:'canvas', buttons:{undo:'undo-btn', clear:'clear-btn', camera:'camera-btn'},
                          brushToolbar: 'brush-toolbar'}
    	                );

    getFavorites();
    getTopics();

  var addTopic= document.querySelector(".postTopic");
  addTopic.addEventListener("click", postTopic);

  var searchFormName = document.querySelector(".searchFormName");
	searchFormName.addEventListener("keyup", search);

  var sorting=document.querySelector('.sort-options');
  sorting.addEventListener('change', handleSortChange.bind(this));


	socket.on('favorite.create.server', function(data){
	  getFavorites();
	});

	socket.on('favorite.update.server', function(data){
	  getFavorites();
	});

	socket.on('favorite.delete.server', function(data){
	  getFavorites();
	});

  socket.on('topic.create.server', function(data){
    getTopics();
  });



    }
