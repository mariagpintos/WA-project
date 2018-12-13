if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/send", function() {
  
  Array.prototype.send = function(method) {
    var args = Array.prototype.slice.call(arguments);
    args.splice(0, 1);
    if (typeof(method) === 'string') {
      for (var i = -1, n = this.length; ++i < n; ) {
        this[i][method].apply(this[i], args);
      }
    }
    else for (var i = -1, n = this.length; ++i < n; ) method.apply({}, [this[i]].concat(args));
    return this;
  };
  
}));
