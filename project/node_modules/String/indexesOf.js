if (typeof define !== "function") {
    var define = require("amdefine")(module);
}

define("String/indexesOf",function(){
  String.prototype.indexesOf = function(v){
    var i,current = this.concat(),dec=0,indexes= [];
    while((i = current.indexOf(v)) !== -1){
      indexes.push(i+dec);
      current = current.substr(0,i)+current.substr(i+1,current.length-i-1);
      dec++;
    }
    return indexes;
  }
});
