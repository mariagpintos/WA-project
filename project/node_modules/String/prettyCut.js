if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define("String/prettyCut", function() {
  
  String.prototype.prettyCut = function(n, end) {
    end || (end = "...");
    var diff = end.length;
    return (this.length > n+diff ? this.slice(n)+end: this.slice();
  };
  
});
