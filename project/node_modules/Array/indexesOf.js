if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define("Array/indexesOf",function(){
  Array.prototype.indexesOf = function(v){
    var i,current = this.concat(),dec=0,indexes= [];
    while((i = current.indexOf(v)) !== -1){
      indexes.push(i+dec);
      current = current.splice(i,i);
      dec++;
    }
    return indexes;
  }
});
