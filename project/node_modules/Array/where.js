if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/where", function() {
  
  Array.prototype.where = function(f) {
    var res = [];
    for(var i = 0, n = this.length; i < n; i++) {
      if (f(this[i])) res.push(this[i]);
    }
    return res;
  }
  
}));
