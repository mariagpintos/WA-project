class PenBrush {

    constructor() {
        this.opacity = 1;
        this.name = "PenBrush";
    }

    draw(ctx, strokeStyle, x, y) {
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = 5;
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

class DiscBrush extends PenBrush{

  constructor() {
      super();
      this.name = "DiscBrush";
  }

  draw(ctx, strokeStyle, x, y) {
      ctx.lineJoin = ctx.lineCap = 'square';
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 20;
      ctx.lineTo(x, y);
      ctx.stroke();
  }

}

class CircleBrush extends PenBrush{

  constructor() {
      super();
      this.name = "CircleBrush";
  }

  draw(ctx, strokeStyle, x, y) {
      ctx.strokeStyle = strokeStyle;
      ctx.fillStyle = "black";

      ctx.arc(x, y, 20, 0, 1*Math.PI);
      ctx.fill();
  }

}



class StarBrush extends PenBrush{

  constructor() {
      super();
      this.name = "StarBrush";
  }

  draw(ctx, strokeStyle, x, y) {
        ctx.fillStyle="green";

        ctx.beginPath();
        ctx.moveTo(x,y);

        ctx.lineTo(x+20,y);
        ctx.lineTo(x+30,y-17);
        ctx.lineTo(x+40,y);
        ctx.lineTo(x+60,y);
        ctx.lineTo(x+50,y+17);
        ctx.lineTo(x+60,y+34);
        ctx.lineTo(x+40,y+34);
        ctx.lineTo(x+30,y+51);
        ctx.lineTo(x+20,y+34);
        ctx.lineTo(x,y+34);
        ctx.lineTo(x+10,y+17);
        ctx.lineTo(x,y);

        ctx.fill();

        ctx.closePath();

  }

}


class WhiteFullRectBrush extends PenBrush{

  constructor(canvas) {
      super();
      this.name = "WhiteFullRectBrush";
      this.canvas = canvas;
  }

  draw(ctx) {
       ctx.beginPath();
       ctx.rect(0, 0, this.canvas.width, this.canvas.height);
       ctx.fillStyle = "white";
       ctx.fill();
  }

}






/*
class StarBrush extends PenBrush{

  constructor() {
      super();
      this.name = "StarBrush";
  }

  draw(ctx, strokeStyle, x, y) {
      const img = new Image();
      img.src = 'HTML5_Logo_256.png';
      img.crossOrigin="anonymous";
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.strokeStyle = strokeStyle;
      //ctx.lineWidth = 100;
      ctx.drawImage(img,x,y,10,5);
  }

}*/
