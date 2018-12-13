if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/diff", ["Array/has"], function() {
  
  Array.prototype.diff = function(a) {
    var o = {add:[],rem:[]};
    for (var i = this.length; i--; ) if (!a.has(this[i])) o.rem.push(this[i]);
    for (i = a.length; i--; ) if (!this.has(a[i])) o.add.push(a[i]);
    return o;
  };
  
}));
