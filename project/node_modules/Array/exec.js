if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/exec", function() {
  
  Array.prototype.exec = function(e) {
    if (typeof(e) === "function") {
      for (var i = this.length; i--; ) f(this[i]);
    }
    else {
      e = e.substr(2, e.length);
      for (var i = this.length; i--; ) this[i][e]();
    }
  }
  
}));
