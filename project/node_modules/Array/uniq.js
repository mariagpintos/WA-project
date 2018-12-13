if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

(define("Array/uniq", ["Array/has"], function() {
  
  Array.prototype.uniq = function(f) {
    var res = []
    if (!f) {
      for (var i = this.length; i--; ) {
        !res.has(this[i]) && res.push(this[i]);
      }
    }
    else {
      if (typeof(f) === 'string') {
        var _r = [];
        for (var i = -1, n = this.length; ++i < n; ) {
          var v = this[i][f];
          if (!_r.has(v)) {
            res.push(this[i]);
            _r.push(v);
          }
        }
      }
      else {
        var _r = [];
        for (var i = 0, n = this.length; i < n; i++) {
          var v = f(this[i]);
          if (!_r.has(v)) {
            res.push(this[i])
            _r.push(v);
          }
        }
      }
    }
    return res;
  }
  
}));
