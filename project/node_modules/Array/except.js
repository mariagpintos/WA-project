if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/except", function() {
  
  Array.prototype.except = function(v) { // same as above but the "not-in-the-return" values are the one where f(el) is true
    var res = [];
    for (var i = 0, n = this.length; i < n; i++) if (this[i] !== v) res.push(this[i])
    return res;
  }
  
}));
