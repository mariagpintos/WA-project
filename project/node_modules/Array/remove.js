if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/remove", function() {
  
  Array.prototype.remove = function(v) {
    for (var i = this.length; i--; ) {
      if (this[i] === v) this.splice(i, 1);
    }
    return this;
  };
  
}));
