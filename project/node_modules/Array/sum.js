if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define("Array/sum", function(r){
  Array.prototype.sum = function(){
    var res = 0;
    for(var i = 0; i < this.length; i++) res+=this[i];
    return res;
  };
});
