var paint = []
var database


function setup(){
  database = firebase.database();
  createCanvas(500,500);

  var paintPosition = database.ref('paint/position');
  paintPosition.on("value", readPosition, showError);

}


function draw(){
  background("gray");    
    if(mouseIsPressed){
      var point = {
        x: mouseX,
        y: mouseY,
      }
      paint.push(point);
      writePosition(point.x, point.y)
    }  
    beginShape();
    stroke(255)
    strokeWeight(4)
    for(var i = 0; i < paint.length; i++) {
        vertex(paint[i].x, paint[i].y)
    }
    endShape();
}

function writePosition(x,y){
  database.ref('paint/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
}

function showError(){
  console.log("Error in writing to the database");
}


