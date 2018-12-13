if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/each", function() {
  
  Array.prototype.each = function(f) {
    for (var i = 0, n = this.length; i < n; i++){
			f(this[i], i);
    }
    return this;
  };
  
}));
