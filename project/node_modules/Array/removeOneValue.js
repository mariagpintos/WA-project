if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define('Array/removeOneValue', function() {

  Array.prototype.removeOneValue = function(v) {
		for (var i = this.length; i--; ) {
        if (this[i] === v) {
          return (this.splice(i, 1));
        }
    }
  };

});
