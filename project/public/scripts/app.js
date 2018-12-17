class App {

   constructor(object){
     this.drawable = false;
     this.strokeStyle = "black";

     this.brush = new PenBrush();

     this.canvas = document.getElementById(object.canvas);

     if(this.canvas instanceof HTMLCanvasElement) {
       this.canvas.onmousedown=function(e){
         this.drawable = true;
         this.canvas.style.cursor = "crosshair";
         history.initializeNewStrokesSet();
         history.push(new Stroke(this.brush.name, e.offsetX, e.offsetY));
         this.draw();
       }.bind(this);

       this.canvas.touchstart=function(e){
         this.drawable = true;
         this.canvas.style.cursor = "crosshair";
         history.initializeNewStrokesSet();
         history.push(new Stroke(this.brush.name, e.offsetX, e.offsetY));
         this.draw();
       }.bind(this);

       this.canvas.onmousemove = function(e) {
         if(this.drawable) {
           history.push(new Stroke(this.brush.name, e.offsetX, e.offsetY));
           this.draw();
         }
       }.bind(this);

       this.canvas.touchmove = function(e) {
         if(this.drawable) {
           history.push(new Stroke(this.brush.name, e.offsetX, e.offsetY));
           this.draw();
         }
       }.bind(this);

       this.canvas.onmouseup = function(e){
         this.drawable = false;
         this.canvas.style.cursor = "default";

       }.bind(this);

       this.canvas.touchend = function(e){
         this.drawable = false;
         this.canvas.style.cursor = "default";
       }.bind(this);

       this.canvas.onmouseleave = function(e){
         this.drawable = false;
         this.canvas.style.cursor = "default";
       }.bind(this);

       this.canvas.touchleave = function(e){
         this.drawable = false;
         this.canvas.style.cursor = "default";
       }.bind(this);
     }
     else {
       throw Error("Canvas must be a <canvas>");
     }


     if (object.buttons !== undefined ){
       document.getElementById(object.buttons.clear).onclick = function(){
         this.delete();
       }.bind(this);
       document.getElementById(object.buttons.camera).onclick = function(){
         this.snap();
       }.bind(this);
       document.getElementById(object.buttons.undo).onclick = function(){
         this.undo();
       }.bind(this);
     }

     if(object.brushToolbar !== undefined){
       this.createButtons();
     }

  }

  draw(){
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


      ctx.beginPath();
      ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      ctx.fillStyle = "white";
      ctx.fill();

      for (let i = 0; i < history.strokes.length; i++) {

        let stroke = history.strokes[i];

        if (stroke[0].brush === "PenBrush") {

          ctx.beginPath();
          ctx.moveTo(stroke[0].x-1, stroke[0].y);
          new PenBrush().draw(ctx, this.strokeStyle, stroke[0].x, stroke[0].y);
          for (let j = 1; j < stroke.length; j++) {
            ctx.moveTo(stroke[j-1].x, stroke[j-1].y);
            new PenBrush().draw(ctx, this.strokeStyle, stroke[j].x, stroke[j].y);
          }
          ctx.closePath();

        }

        if (stroke[0].brush === "CircleBrush") {
          ctx.beginPath();
          ctx.moveTo(stroke[0].x-1, stroke[0].y);
          new CircleBrush().draw(ctx, this.strokeStyle, stroke[0].x, stroke[0].y);
          for (let j = 1; j < stroke.length; j++) {
            ctx.moveTo(stroke[j-1].x, stroke[j-1].y);
            new CircleBrush().draw(ctx, this.strokeStyle, stroke[j].x, stroke[j].y);
          }
          ctx.closePath();

        }

        if (stroke[0].brush === "StarBrush") {
          ctx.beginPath();
          ctx.moveTo(stroke[0].x-1, stroke[0].y);
          new StarBrush().draw(ctx, this.strokeStyle, stroke[0].x, stroke[0].y);
          for (let j = 1; j < stroke.length; j++) {
            ctx.moveTo(stroke[j-1].x, stroke[j-1].y);
            new StarBrush().draw(ctx, this.strokeStyle, stroke[j].x, stroke[j].y);
          }
          ctx.closePath();

        }
        }
        //console.log(history);
      }


  delete(){
    history.clear();
    this.draw();
  }


  snap(){
    let image = document.getElementById('canvas').toDataURL();
    console.log('imageApp')

        doFetchRequest('POST',"/favorites", {'Content-Type': 'application/json'},
        JSON.stringify({name:'New Image', dataURL:`${image}`}))
        .then((data)=>{
          getFavorites();
          socket.emit('favorite.create', 'Creation of a favorite');
      })
  }

  createButtons(){
    var brushButton = document.createElement('button');
    var nameBrush = document.createTextNode('Brush');
    //brushButton.appendChild(nameBrush);
    brushButton.innerHTML = '<img src="img/brush.png" style ="height:100px"/>'
    brushButton.style.background = "none";
    brushButton.style.border = "none";
    brushButton.style.backgroundSize= ('100% 100%');

    brushButton.onclick = function(e){
      this.brush = new PenBrush();
    }.bind(this);
    document.getElementById('brush-toolbar').appendChild(brushButton);

    var discButton = document.createElement('button');
    var nameDisc = document.createTextNode('Disc');
    //discButton.appendChild(nameDisc);
    discButton.innerHTML = '<img src="img/circle.png" style ="height:100px"/>'
    discButton.style.border = "none";
    discButton.style.background = "none";

    discButton.onclick = function(e){
      this.brush = new CircleBrush();
    }.bind(this);
    document.getElementById('brush-toolbar').appendChild(discButton);

    var starButton = document.createElement('button');
    var nameStar = document.createTextNode('Star');
    //starButton.appendChild(nameStar);
    starButton.innerHTML = '<img src="img/star.png" style ="height:100px"/>'
    starButton.style.border = "none";
    starButton.style.background = "none";

    starButton.onclick = function(e){
      this.brush = new StarBrush();
    }.bind(this);
    document.getElementById('brush-toolbar').appendChild(starButton);
  }

  undo(){
    history.pop();
    this.draw();
  }

  static get defaultStrokeStyle(){
    return "black";
  }

  get StrokeStyle(){
    return this.strokeStyle;
  }

  set StrokeStyle(value){
    if(typeof value === 'string') {
      this.strokeStyle = value;
    }
    else {
      throw new Error("StrokeStyle must be string");
    }
  }
}
