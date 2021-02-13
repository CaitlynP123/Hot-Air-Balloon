var balloon, balloonImg
var backgroundImg
var database, position
var x,y

function preload(){
  balloonImg = loadAnimation("pro-C35 images/Hot Air Ballon-02.png",
  "pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-04.png")

  backgroundImg = loadImage("pro-C35 images/Hot Air Ballon-01.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  balloon = createSprite(250, 250, 50, 50);
  balloon.addAnimation("balloon", balloonImg)
  balloon.scale = 0.5
}

function draw() {
  background(backgroundImg); 
  database = firebase.database() 

  var balloonPosition = database.ref('balloon/position')
  balloonPosition.on("value",readPosition,showError) 

  textSize(25)
  fill("black")
  text("USE ARROW KEYS TO MOVE", windowWidth/2+50, windowHeight/2)
  text("USE M TO ENLARGEN THE HOT AIR BALLOON AND S TO MINIMIZE", windowWidth/2+100, windowHeight/2+30)
  
if(position!==undefined){
  if(keyDown("up")){
    balloon.y = balloon.y-10
    updatePosition(0,-10)
  } else if (keyDown("down")){
    balloon.y = balloon.y+10
    updatePosition(0,+10)
  } else if (keyDown("right")){
    balloon.x = balloon.x+10
    updatePosition(+10,0)
  } else if (keyDown("left")){
    balloon.x = balloon.x-10
    updatePosition(-10,0)
  } else if(keyDown("m")){
    balloon.scale = balloon.scale+0.25
  } else if(keyDown("s")){
    balloon.scale = balloon.scale-0.25
  }
}
  
  drawSprites();
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x' : position.x+x,
    'y' : position.y+y
  })
}

function readPosition(data){
  position = data.val()
  balloon.x = position.x
  balloon.y = position.y
}

function showError(){
  console.log("E R R O R")
}
