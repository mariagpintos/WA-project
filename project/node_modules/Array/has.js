if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/has", function() {
  
  Array.prototype.has = function(value) {
    for (var i = this.length; i--; ) {
      if (this[i] === value) {
        return true;
      }
    } 
    return false;
  };
  
}));
