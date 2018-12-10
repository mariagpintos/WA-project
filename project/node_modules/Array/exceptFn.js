if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/exceptFn", function() {
  
  Array.prototype.exceptFn = function(f) { // same as above but the "not-in-the-return" values are the one where f(el) is true
    var r = this.slice();
    for (var i = r.length; i--; ) if (f(r[i])) r.splice(i, 1);
    return r;
  }
  
}));
