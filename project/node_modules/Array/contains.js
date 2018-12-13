if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define("Array/contains", ["Array/has"], function(r){
  Array.prototype.contains = Array.prototype.has;
});
