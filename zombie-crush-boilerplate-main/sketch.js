const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground1,wall1,wall2;
var jp;
var bridge,edges;
var stones=[]
var leftRight,rightLeft,bg,zombie,bb,sadZ,axeI,stoneI,woodI;

function preload(){
  bg = loadImage("./assets/background.png"); 

  leftRight = loadAnimation("./assets/zombie1.png","./assets/zombie2.png","./assets/zombie1.png");
  rightLeft = loadAnimation("./assets/zombie3.png","./assets/zombie4.png","./assets/zombie3.png");

  sadZ=loadAnimation("./assets/zombie.png");


}








function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  ground1=new Base(width/2,height-10,width,25);
  wall1=new Base(70,height/2,150,200);
  wall2=new Base(width-70,height/2,150,200);

  jp = new Base(width-100,height/2-50,40,20);
   bridge = new Bridge(25,{x:70,y:height/2-50})

   Matter.Composite.add(bridge.body, jp);
    jointLink = new Link(bridge,jp);


    for(var i=0; i<=7; i++){
      var x=random(width/2+200,width/2+300);
      var y=random(-10,100);
      var stone=new Stone(x,y,40);
      stones.push(stone);
    }


    zombie=createSprite(width/2,height-110);
    zombie.addAnimation("walk",leftRight);
    zombie.addAnimation("walking",rightLeft);
    zombie.addAnimation("sad",sadZ);
    zombie.scale=0.1;
    zombie.velocityX=5;

    bb=createButton("");
    bb.position(width-200,height/2-50);
    bb.class("breakbutton")
    bb.mousePressed(handleButtonPressed);
    //bb.size(2,2)

    edges=createEdgeSprite();
}

function draw() {
  background(bg);
  
  Engine.update(engine);
  
  ground1.display();
  wall1.display();
  wall2.display();
  jp.display();
  bridge.show();
  
  for(var i=0; i<stones.length; i++){
    stones[i].display();
  }

  zombie.bounceOff(edges[0]);
  zombie.bounceOff(edges[2]);
  drawSprites();
}

function handleButtonPressed(){
  jointLink.detach();
  setTimeout(()=>{
    bridge.break();
  },1500);
}
