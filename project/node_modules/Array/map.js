if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/map", function() {

  Array.prototype.map || (Array.prototype.map = function(fn, scope) { // returns a new array where elements are fn(this[i])
  //scope is here for node's map compatibility
    if (scope){ fn = fn.bind(scope);}
    var r = this.slice(),i,n;
    if (typeof(fn) === "function") {
      for (i = 0, n = r.length; i < n; i++){ r[i] = fn(r[i], i);}
    }
    else {
      fn = fn.substr(2, fn.length);
      for (i = 0, n = r.length; i < n; i++){ r[i] = r[i][fn]();}
    }
    return r;
  });

}));
