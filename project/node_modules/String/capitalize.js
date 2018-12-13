if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define("String/capitalize", function() {
  
  String.prototype.capitalize = function() {
    return (this.charAt(0).toUpperCase() + this.slice(1));
  };
  
});
