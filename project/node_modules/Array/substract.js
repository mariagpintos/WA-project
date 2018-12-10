if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/substract", function() {
  
  Array.prototype.substract = function(o) { // same as sub but doesn't override this
    var r = this.slice();
    for (var i = o.length; i--; ) {
      r.remove(o[i]);
    }
    return r;
  };
  
}));
