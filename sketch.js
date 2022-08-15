var score;
var rocket, rocketImg
var bg, bgImg;
var meteorGroup, meteorImg;
var starGroup, starImg;
var gameOver, gameOverImg;
var topInvisiBlock, leftInvisiBlock, rightInvisiBlock, bottomInvisiBlock

function preload(){
    rocketImg = loadImage("rocket.png");
    bgImg = loadImage("bg.png");
    gameOverImg = loadImage("GAME_OVER.png");
    meteorImg = loadImage("meteor.png");
    starImg = loadImage("star.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    


    bg = createSprite(windowWidth, windowHeight, windowWidth, windowHeight);
    bg.addImage("bg", bgImg);
    bg.scale = 3;

    topInvisiBlock = createSprite(0, 0, windowWidth * 2, 20)
    leftInvisiBlock = createSprite(0, 0, 20, windowHeight * 2)
    rightInvisiBlock = createSprite(windowWidth, 0, 20, windowHeight * 2)
    bottomInvisiBlock = createSprite(0, windowHeight, windowWidth * 2, 20)
     
    rocket = createSprite(windowWidth/2, windowHeight/2);
    rocket.scale = 0.18;
    rocket.addImage("rocket", rocketImg);

    gameOver = createSprite(windowWidth/2, windowHeight/3);
    gameOver.addImage("gameOver", gameOverImg);
    gameOver.visible = false;
    topInvisiBlock.visible = false
    leftInvisiBlock.visible = false
    rightInvisiBlock.visible = false
    bottomInvisiBlock.visible = false
    score = 0
    meteorGroup = createGroup();
    starGroup = createGroup();

    rocket.setCollider("rectangle",0,0,rocket.width + 100, rocket.height - 500);
    rocket.debug = false;  

}

function draw() {
    background("black")
    if(keyDown("space")){
      rocket.velocityY = -12;  
    }
    rocket.velocityY = rocket.velocityY + 0.8;

    if(keyDown("left")){
        rocket.x -= 10
      }
      if(keyDown("right")){
        rocket.x += 10
      }
      if(starGroup.isTouching(rocket)){
        score+=1
        starGroup.destroyEach()
      }

      rocket.collide(leftInvisiBlock)
      rocket.collide(rightInvisiBlock)
      rocket.collide(topInvisiBlock)

    spawnMeteors();
    spawnStars()
    if(rocket.isTouching(bottomInvisiBlock) || rocket.isTouching(meteorGroup)){
      gameOver.visible = true
      rocket.destroy()
      meteorGroup.destroyEach()
      starGroup.destroyEach()
      meteorGroup.visible = false
      starGroup.visible = false
    }
    drawSprites();
    textSize(20)
    fill("white")
    text("score: " +  score, 100, 50)

}

function spawnMeteors() {
  if (frameCount % 60 === 0) {
    var meteor = createSprite(random(0, windowWidth, 0), 0);
    meteor.addImage(meteorImg);
    meteor.scale = 0.2;
    meteor.velocityY = random(4, 15);
    meteor.velocityX = random(-4, 4);
    meteor.lifetime = 400;
    meteor.depth = rocket.depth;
    rocket.depth = rocket.depth + 1;
    meteorGroup.add(meteor);
  }
}

function spawnStars() {
  if (frameCount % 200 === 0) {
    var star = createSprite(random(0, windowWidth, 0), 0);
    star.addImage(starImg);
    star.scale = 0.03;
    star.velocityY = 4;
    star.lifetime = 400;
    star.depth = rocket.depth;
    rocket.depth = rocket.depth + 1;
    starGroup.add(star);
  }
}
