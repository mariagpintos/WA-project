if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define("Array/mapMatrix", ["Array/map"], function(){

  Array.prototype.mapMatrix = function(fn){
    var i = 0;
    return this.map(function(r){ 
      var j = 0, res = r.map(function(cell){
        var res2 = fn(cell, i, j);
        j++;
        return res2;
      });
      i++;
      return res;
    });
  };

});
