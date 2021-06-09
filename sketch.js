
var JUNGLE = 1
var UNDERWATER = 2
var SPACE = 3
var END = 4
var gameState = "JUNGLE"

var boy, boypose, boycollided
var invisibleGround

var gameOver, gameOverimg, restart, restartimg;

var score = 0


function preload(){
boypose = loadAnimation("images/firstpose.png", "images/secondpose.png","images/thirdpose.png","images/fourthpose.png", "images/fifthpose.png")
boycollided = loadAnimation("images/collidedboyimage.png")

junglebackgroundimg = loadImage("images/junglebackground.jpg")
underwaterbackgroundimg = loadImage("images/underwaterbackgroundforgame.png")
spacebackgroundimg = loadImage("images/spacebackground.jpg")

obstacle1 = loadImage("images/obstacle1image.png")
obstacle2 = loadImage("images/obstacle2image.png")
obstacle3 = loadImage("images/obstacle3image.png")
obstacle4 = loadImage("images/obstacle4image.png")
asteroidimg = loadImage("images/asteroidforgamecropped.png")

playimg = loadImage("images/playbuttonforgame.png")

restartimg = loadImage("images/restartimageforgamecropped.png")
gameOverimg = loadImage("images/gameoverimageforgamecropped.png")

jumpSound = loadSound("sounds/jumpSound.mp3")
collidedSound = loadSound("sounds/collidedSound.mp3")
}

function setState(){
  if(gameState == "JUNGLE"){
    jungle = createSprite(width-1000, height-450)
    jungle.addImage(junglebackgroundimg)
    jungle.scale = 3.2
    jungle.x = jungle.width/2
    }
    
   else if(gameState == "UNDERWATER"){
      underwater = createSprite(width-1000, height-450)
      underwater.addImage(underwaterbackgroundimg)
      underwater.scale = 2
      underwater.x = underwater.width/2
    }

    else if(gameState=="SPACE"){
      space = createSprite(width-1000, height-450)
      space.addImage(spacebackgroundimg)
      space.scale = 3.2
      space.x = space.width/2
    }
}

function setup(){
  createCanvas(windowWidth, windowHeight)
  setState();
  boy = createSprite(75,height-60,20,50)
  boy.addAnimation("running", boypose)
  boy.addAnimation("collided",boycollided)
  boy.scale = 0.4

  invisibleGround = createSprite(width/2,height-2,width,5);  
  invisibleGround.shapeColor = "#f4cbaa";
  invisibleGround.x = invisibleGround.width/2
  invisibleGround.visible = false

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverimg); 
  restart = createSprite(width/2,height/1.8);
  restart.addImage(restartimg);
  gameOver.scale = 0.7;
  restart.scale = 0.1;
  gameOver.visible = false
  restart.visible = false
  gameOver.scale = 0.7
  restart.scale = 0.2 

  obstaclesGroup = new Group()
  hangingObstaclesGroup  = new Group()
  longObstaclesGroup = new Group()
  spaceObstaclesGroup = new Group()

}

function Jungle(){
      jungle.velocityX = -4
        if(jungle.x < 300){
          jungle.x = jungle.width
          }

          score = score + Math.round(getFrameRate()/60);

      
        invisibleGround.velocityX = -4
        if(invisibleGround.x < 0){
          invisibleGround.x = invisibleGround.width/2
        }
      
        if((touches.length > 0 || keyDown("SPACE")) && boy.y  >= height-120) {
          jumpSound.play()
          boy.velocityY = -10;
        }
      
      
        boy.velocityY = boy.velocityY + 0.8;
        
      boy.collide(invisibleGround)
  
      spawnObstacles()
      spawnHangingObstacles()
      spawnLongObstacles()
      if(score >=  20){
        gameState = "UNDERWATER"
        setup()
      }
     /* if(obstaclesGroup.isTouching(boy) || longObstaclesGroup.isTouching(boy) || hangingObstaclesGroup.isTouching(boy)){

        boy.changeAnimation(boycollided)

        collidedSound.play() 
      
        
        onEnd()
      }*/
}

function underWater(){
  underwater.velocityX = -4
  if(underwater.x < 85){
    underwater.x = underwater.width/2
    }

    score = score + Math.round(getFrameRate()/60);


  invisibleGround.velocityX = -4
  if(invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2
  }

  if((touches.length > 0 || keyDown("SPACE")) && boy.y  >= height-120) {
    jumpSound.play()
    boy.velocityY = -10;
  }
  

  boy.velocityY = boy.velocityY + 0.8;

  
boy.collide(invisibleGround)

spawnObstacles()
spawnHangingObstacles()
spawnLongObstacles()

if(obstaclesGroup.isTouching(boy) || longObstaclesGroup.isTouching(boy) || hangingObstaclesGroup.isTouching(boy)){
  collidedSound.play()
  onEnd()
}


//if(score > 40){
//gameState="SPACE"
//}

}


function Space(){
  space.velocityX = -4
    if(space.x < 300){
      space.x = space.width
      }

      score = score + Math.round(getFrameRate()/60);

  
    invisibleGround.velocityX = -4
    if(invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2
    }
  
    if((touches.length > 0 || keyDown("SPACE")) && boy.y  >= height-120) {
      jumpSound.play()
      boy.velocityY = -10;
    }
  
  
    boy.velocityY = boy.velocityY + 0.8;
    
  boy.collide(invisibleGround)

  spawnSpaceObstacles()
  spawnHangingObstacles()
  spawnLongObstacles()


  if(longObstaclesGroup.isTouching(boy) || spaceObstaclesGroup.isTouching(boy) || hangingObstaclesGroup.isTouching(boy)){
    collidedSound.play()  
    onEnd()
  }
}


function onEnd(){

  gameOver.visible = true
  restart.visible = true

  invisibleGround.velocityX = 0;
  jungle.velocityX = 0
  underwater.velocityX = 0
  boy.changeAnimation("collided",boycollided);
  boy.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  hangingObstaclesGroup.setVelocityXEach(0);
  longObstaclesGroup.setVelocityXEach(0)
  spaceObstaclesGroup.setVelocityXEach(0);

  obstaclesGroup.setLifetimeEach(-1)
  hangingObstaclesGroup.setLifetimeEach(-1)
  longObstaclesGroup.setLifetimeEach(-1)
  spaceObstaclesGroup.setLifetimeEach(-1)

  if(mousePressedOver(restart)) {
    console.log("hi")
    reset();
  }

}


function draw(){
  

  if(gameState==="JUNGLE"){
    Jungle()
  }


   if(gameState==="UNDERWATER"){
    underWater()
  }

  if(gameState==="SPACE"){
   Space() 
  }

  drawSprites()

  fill("white")
  textSize(30)
  text("Score: "+ score, 900,50);

}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1150,height-25,20,30);
    obstacle.setCollider('circle',0,0,5)
    obstacle.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle2);
              break;
      case 2: obstacle.addImage(obstacle3);
              break;
      default: break;
    }   
    obstacle.scale = 0.6;
    obstacle.lifetime = 300;
    obstacle.depth = boy.depth;
    boy.depth +=1;
    obstaclesGroup.add(obstacle);
  }
}

function spawnLongObstacles(){
  if(frameCount % 347 === 0) {
    var longObstacle = createSprite(1150,height-15,20,30);
    longObstacle.setCollider('circle',0,0,15)

    longObstacle.velocityX = -(6 + 5*score/100);
    longObstacle.addImage(obstacle1)
    longObstacle.scale = 0.5;
    longObstacle.lifetime = 300;
    longObstacle.depth = boy.depth;
    boy.depth +=1;
    longObstaclesGroup.add(longObstacle);
  }
}

function spawnHangingObstacles(){
  if(frameCount % 270 === 0) {
    var hangingObstacle = createSprite(1175,height-255,20,30);
    hangingObstacle.setCollider('circle',0,0,15)

    hangingObstacle.velocityX = -(6 + 7*score/100);
    hangingObstacle.addImage(obstacle4)
    hangingObstacle.scale = 0.45;
    hangingObstacle.lifetime = 300;
    hangingObstacle.depth = boy.depth;
    boy.depth +=1;
    hangingObstaclesGroup.add(hangingObstacle);
  }
}

function spawnSpaceObstacles() {
  if(frameCount % 25 === 0) {
    var asteroid = createSprite(1175,height-35,20,30);
    asteroid.setCollider('circle',0,0,5)

    asteroid.velocityX = -(6 + 8*score/100);
    asteroid.addImage(asteroidimg)
    asteroid.scale = 0.25;
    asteroid.lifetime = 300;
    asteroid.depth = boy.depth;
    boy.depth +=1;
    spaceObstaclesGroup.add(asteroid);
  }
}

function reset(){
  gameState = JUNGLE;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
 // hangingobstaclesGroup.remove();
  //spaceobstaclesGroup.remove();
  
  boy.changeAnimation("running",boypose);
  
  score = 0;
  }
