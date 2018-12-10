if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/flatten", function(r) {
 
  var isArray = ('isArray' in Array) ? 
        Array.isArray : 
        function (value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        };
  Array.prototype.flatten = function() { // same as above but the "not-in-the-return" values are the one where f(el) is true
    var res = [];
    for (var i = -1, n = this.length; ++i < n; ) {
      if (isArray(this[i])) {
        res = res.concat(this[i].flatten())
      }
      else {
        res = res.concat(this[i]);
      }
    }
    return res;
  }
  
}));
