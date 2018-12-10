if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/max", function() {
  
  Array.prototype.max = function() { // returns a new array where elements are fn(this[i])
    var n = this.length;
    if (n) {
      var max = this[0];
      for (var i = 1; i < n; i++) {
        if (this[i] > max) max = this[i];
      }
      return max;
    }
    else {
      return null;
    }
  };
  
}));
