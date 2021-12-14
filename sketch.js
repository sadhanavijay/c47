var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var zombieGroup,bulletGroup;
var gameState = "fight"
var bullets = 70;
var arrow;
//Declare variable for score
var score = 0;
//Declare variable for life
var life = 3;
//Declare variable for loading the sound
var lose, winning, explosionSound;


function preload()
{  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.png")
  arrow=loadImage("assets/arrow.png")

  //Load Sound from assets
  lose=loadSound("assets/lose.mp3");
  win=loadSound("assets/win.mp3");
  explosionSound=loadSound("assets/explosion.mp3");
}

function setup() 
{  
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,100,100)
  bg.addImage(bgImg)
  bg.scale = 2
  
  player = createSprite(displayWidth-1500, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle",0,0,300,300);

  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4
   
  bulletGroup = new Group()
  zombieGroup = new Group()
}

function draw() 
{
  background(0);

  

  if(gameState === "fight")
  {
    
    //write code to display the appropriate heart image according to lives reamining
    if(life===3){
      heart3.visible=true;
      heart1.visible=false;
      heart2.visible=false;
    }
    if(life===2){
      heart3.visible=false;
      heart1.visible=false;
      heart2.visible=true;
    }
    if(life===1){
      heart3.visible=false;
      heart1.visible=false;
      heart2.visible=true;
    }

    //write code to go to gameState "lost" when 0 lives are remaining
    if(life===0){
      gameState="lost";
    }

    //write code to go to gameState "won" if score is 100
    if(score===100){
      gameState="won";
      win.play();
    }

  
if(keyDown("UP_ARROW")||touches.length>0)
{
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0)
{
 player.y = player.y+30
}


if(keyWentDown("space"))
{
  bullet = createSprite(displayWidth-1500,player.y-30,20,10)
  bullet.addImage("arrow",arrow)
  bullet.scale=0.4
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
  //Add explosion Sound
 explosionSound.play();
}


else if(keyWentUp("space"))
{
  player.addImage(shooterImg)
}


if(bullets==0)
{
  gameState = "bullet"
  //Add lose Sound
  lose.play();
    
}


if(zombieGroup.isTouching(bulletGroup))
{
  for(var i=0;i<zombieGroup.length;i++)
  {     
   if(zombieGroup[i].isTouching(bulletGroup))
   {
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        //Add explosion Sound
        explosionSound.play();
        //Write code to increase the score
        score=score+5;
    } 
  }
}


if(zombieGroup.isTouching(player))
{
 //Add lose Sound
   lose.play();
 

 for(var i=0;i<zombieGroup.length;i++)
 {     
  if(zombieGroup[i].isTouching(player))
  {
       zombieGroup[i].destroy()
      //Write code to decrease the lifeline
      life=life-1;
  } 
 }
}
enemy();
}
drawSprites();


textSize(20)
fill("black")
text("Arrow = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)

fill("red")
text("score up",displayWidth-200,displayHeight/2-180);
text( "to 100 to win",displayWidth-220,displayHeight/2-160)


if(gameState == "lost")
{
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  player.destroy();
}


else if(gameState == "won")
{ 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();
}


else if(gameState == "bullet")
{
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}

}



function enemy()
{
  if(frameCount%50===0)
  {
    zombie = createSprite(random(800,1300),random(100,900),40,40)
    zombie.addImage(zombieImg)
    zombie.scale = 0.25
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,200,200)
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
}
