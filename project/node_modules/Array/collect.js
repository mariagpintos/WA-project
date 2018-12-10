if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/collect", function() {
  
  Array.prototype.collect = function(f) {
    var res = [];
    if (typeof(f) === "string") {
      for (var i = -1, n = this.length; ++i < n; ) {
        res.push(this[i][f]);
      }
    }
    else {
      for (var i = -1, n = this.length; ++i < n; ) {
        res.push(f(this[i]));
      }
    }
    return res;
  };
  
}));
