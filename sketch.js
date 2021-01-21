
var monkey , monkey_running, ground, obstacle, banana;
var bananaImage, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(50,500,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,535,600,10);
  ground.shapeColor = "lime";
  score = 0;

  obstacleGroup = createGroup();
  foodGroup = createGroup();
}


function draw() {
  background(0);
  
  
  
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  monkey.debug = false;
  monkey.setCollider("circle",0,0,250);
  
  
  
  
  if(gameState === PLAY){
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    if(foodGroup.isTouching(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
  
    
    spawnBanana();
    spawnObstacles();
    
    if(monkey.isTouching(obstacleGroup)){
       gameState = END;
    }
  }
  
   else if (gameState === END) {
      console.log("End")
     
      monkey.velocityY = 0

    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
   }
  

  drawSprites();
  fill("lime");
  text("Score: "+ score, 500,50);
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   obstacle = createSprite(400,500,10,40);
   obstacle.addImage(obstaceImage);
   obstacle.velocityX = -6;
    obstacle.lifetime = 134;
   obstacle.scale = 0.2;
   obstacleGroup.add(obstacle);
 }
}

function spawnBanana(){
 if (frameCount % 90 === 0){
   banana = createSprite(400,400,10,40);
   banana.y = Math.round(random(350,400));
   banana.addImage(bananaImage);
   banana.velocityX = -6;
    banana.lifetime = 134;
   banana.scale = 0.1;
   foodGroup.add(banana);
 }
}






