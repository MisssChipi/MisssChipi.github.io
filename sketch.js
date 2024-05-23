let cols;let rows;
let spacing=30;
let size=[];
let scl=0.05;

function windowResized(){
  resizeCanvas((windowWidth/7)*6, windowHeight);
}
function setup() {
  createCanvas((windowWidth/7)*6, windowHeight);
  rectMode(CENTER);
  cols=width/spacing;
  rows = height/spacing;
  
}

function draw() {
  background(0, 5, 0);
  for(let i=0;i<cols;i++){
    size[i]=[];
    for (let j=0;j<rows;j++){
      size[i][j]=(dist(mouseX,mouseY,spacing/2 + i*spacing,spacing/2+j*spacing))*scl;
    }
  }
  
  for (let i=0; i<cols;i++){
    for (let j=0;j<rows;j++){
     noStroke();
     fill(0, 5, 0);
     fill(213, 214, 234);
     ellipse(spacing/2+i*spacing,spacing/2+j*spacing,size[i][j]*1.5,size[i][j])
     
     //ellipse(spacing/2+i*spacing,spacing/2+j*spacing,size[i][j]*2,size[i][j])
     // fill(71, 59, 240);
    // ellipse(spacing/2+i*spacing,spacing/2+j*spacing,size[i][j]*2,size[i][j]*2)
    }
  }
}