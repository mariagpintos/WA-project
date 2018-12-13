if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/min", function() {
  
  Array.prototype.min = function(){
    var m = this[0];
    for(var i = 1; i < this.length; i++){
      if (this[i] < m){
        m = this[i];
      }
    }
    return m;
  };

}));
