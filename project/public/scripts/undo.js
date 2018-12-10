class Stroke {

  constructor(brushName, x, y){
    this.brush = brushName;
    this.x = x;
    this.y = y;
  }

}

const history = {

  strokes: [],

  pop: function(){
    return this.strokes.pop();
  },

  push: function(stroke){
    if (stroke instanceof Stroke){
      this.strokes[this.strokes.length-1].push(stroke);
      return;
    }
    throw Error("history only works with strokes");
  },

  clear: function(){
    this.strokes = [];
  },

  initializeNewStrokesSet: function() {
    this.strokes.push([]);
  }
}
