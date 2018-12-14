(function(dust){dust.register("allFavourites",body_0);function body_0(chk,ctx){return chk.w("<html><head><title>All Favourites</title><!--<link rel='stylesheet' href='style.css' />--></head><body>").s(ctx.get(["list"], false),ctx,{"block":body_1},{}).w("</body></html>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.p("partials/favouriteImage",ctx,ctx,{});}body_1.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("allTopics",body_0);function body_0(chk,ctx){return chk.w("<html><head><title>All Topics</title><!--<link rel='stylesheet' href='style.css' />--></head><body>").s(ctx.get(["list"], false),ctx,{"block":body_1},{}).w("</body></html>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.p("partials/topicImage",ctx,ctx,{});}body_1.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("index",body_0);function body_0(chk,ctx){return chk.w("<!-- DON'T MODIFY THIS FILE --><!DOCTYPE html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width\"><title>OO-JS Exercise - Web Atelier 2017</title><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css\"><link rel=\"stylesheet\" href=\"/style.css\"></head><body onload=\"init()\"><h1>OO-JS Exercise: Canvas</h1><div id=\"app\"><div id=\"left-toolbar\" class=\"toolbar\"><button id=\"clear-btn\">Clear</button><button id=\"undo-btn\">Undo</button><button id=\"camera-btn\"><i class=\"fa fa-camera\" aria-hidden=\"true\"></i></button></div><canvas id=\"canvas\" width=\"600\" height=\"400\"></canvas><div id=\"brush-toolbar\" class=\"toolbar\"><!-- Brushes buttons go here (programmatically). Each button should be a <button> element --></div></div><h2>Topics</h2><form><input class=\"nameTopic\" type=\"text\" name=\"topic\" value='").f(ctx.get(["topicName"], false),ctx,"h").w("'/><input class=\"postTopic\" type=\"submit\" action=\"/topic/POST\" name=\"postTopic\" value=\"Post topic\"></form><div id=\"topics\"><!-- <form><select class=\"sort-options\"><option value=\"\">Default</option><option value=\"popularity\">Popularity</option><option value=\"date-created\">Date Created</option></select></form> -->").s(ctx.get(["list"], false),ctx,{"block":body_1},{}).w("</div><h2>Favourites</h2><form class='searchForm'><input class='searchFormName' type=\"text\" name=\"search\" value=\"\" placeholder=\"Search for image name\"/><!-- <input type=\"submit\" name=\"\" value=\"Search\"/> --></form><form><select class=\"sort-options\"><option value=\"\">Default</option><option value=\"popularity\">Popularity</option><option value=\"date-created\">Date Created</option></select></form><br><br><div id=\"favourites\">").p("partials/fullScreen",ctx,ctx,{}).w("<!-- Favourites will go here (programmatically). Each favourite should be an <img> element --></div><script src=\"/scripts/brushes.js\"></script><script src=\"dustjs-linkedin/dust-core.min.js\" charset=\"utf-8\"></script><script src=\"/js/fetch.js\"></script><script src=\"/main.js\"></script><script src=\"/scripts/undo.js\"></script><script src=\"/js/views.js\"></script><script src=\"/scripts/app.js\"></script><script src=\"/socket.io/socket.io.js\"></script><script>const socket = io();</script></body></html>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.p("topicImage",ctx,ctx,{});}body_1.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("partials\/favouriteImage",body_0);function body_0(chk,ctx){return chk.s(ctx.get(["result"], false),ctx,{"block":body_1},{});}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div class=\"gallery\"><!--<a href = \"\" ><img src=\"").f(ctx.get(["dataURL"], false),ctx,"h").w("\"></a>--><input class=\"little_image\" type=\"image\" src=\"").f(ctx.get(["dataURL"], false),ctx,"h").w("\" alt=\"Alt text\" action=\"/fullScreen/").f(ctx.get(["_id"], false),ctx,"h").w("?_method=PUT\" height=\"20px\"/><form action=\"/favorites/").f(ctx.get(["_id"], false),ctx,"h").w("?_method=PUT\" method='POST'><input class=\"name_favorite\" type=\"text\" name=\"name\" value='").f(ctx.get(["name"], false),ctx,"h").w("'/></form><form><input class=\"topic_favorite\" type=\"text\" name=\"topic\" value='").f(ctx.get(["topicName"], false),ctx,"h").w("'/><input class=\"updateTopic\" type=\"submit\" action=\"/favorites/").f(ctx.get(["topic"], false),ctx,"h").w("?_method=PUT\" method='POST' name=\"updateTopic\" value=\"Update topic\"></form><input class=\"delete_favorite\" type=\"submit\" action=\"/favorites/").f(ctx.get(["_id"], false),ctx,"h").w("?_method=DELETE\" name=\"Delete\" value=\"Delete\"></div>");}body_1.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("partials\/fullScreen",body_0);function body_0(chk,ctx){return chk.w("<div class=\"fullScreen\"><img src=\"").f(ctx.get(["dataURL"], false),ctx,"h").w("\"></div>");}body_0.__dustBody=!0;return body_0}(dust));
(function(dust){dust.register("partials\/topicImage",body_0);function body_0(chk,ctx){return chk.s(ctx.get(["result"], false),ctx,{"block":body_1},{});}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<div class=\"gallery\"><img src=\"").f(ctx.get(["dataURL"], false),ctx,"h").w("\"><form><input id='topicName' class=\"topicName\" type=\"text\" name=\"topicName\" value='").f(ctx.get(["name"], false),ctx,"h").w("'/><input class=\"postTopic\" type=\"submit\" action=\"/").f(ctx.get(["topic"], false),ctx,"h").w("?_method=POST\" name=\"updateTopic\" value=\"Update topic\"></form><input class=\"delete-topic\" type=\"submit\" action=\"/topic?_method=DELETE\" name=\"Delete\" value=\"Delete\"></div>");}body_1.__dustBody=!0;return body_0}(dust));
