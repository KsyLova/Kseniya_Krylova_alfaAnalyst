var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumping;
var isDead;
var isStandOnPlatform;
var isDamaged;
var gameover;
var scrollPos;
var leftBorder;
var rightBorder;
var clouds;
var mountains;
var canyons;
var collectables;
var trees_x;
var treePos_y;
var count;
var foundCollectable;
var reachPlatform;
var enemies;
var killEnemy;
var platforms;
var lives;
var restart;
var jumpSound;
var winSound;
var gameOver_times

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1/2);
    
    winSound = loadSound('assets/391539.wav');
    winSound.setVolume(0.1); 
    
    endSound = loadSound('assets/433644.wav');
    endSound.setVolume(0.3); 
    
    contactSound = loadSound('assets/409346.wav');
    contactSound.setVolume(0.1);
    
    fallSound = loadSound('assets/188642.wav');
    fallSound.setVolume(0.1);
    
    killSound = loadSound('assets/555421.wav');
    killSound.setVolume(0.1);
    
    collectSound = loadSound('assets/253172.wav');
    collectSound.setVolume(0.1);
    
}


function setup()
{   
    if( gameover ) {
    lives=0;
}
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives=3;
    start();
}
function start(){
    if( gameover ) {
        lives=0;
    }   
	gameChar_x = width/2.5;
	gameChar_y = floorPos_y+70;

	
	scrollPos = -100;
    leftBorder = 350;
    rightBorder = width-200;
    count={x_pos:30,y_pos:15,size:10};
    score=0;
    gameOver_times=0;
    foundCollectable=[];
    reachPlatform=[];
    killEnemy=[];
    
	
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    isJumping=false;
    isDead=false;
    isStandOnPlatform=false;
    isDamaged=false;
    gameover=false;
    restart=false;

	
     trees_x = [];
    for(var i = 0; i < 12; i++){
        trees_x.push(30+i*300)
    }
    treePos_y = floorPos_y-70;
    
    
    clouds = [];
    for(var i=0; i<5; i++){
        var cloud = {
            x_pos: 120+600*i,
            y_pos: 120,
            width: 70+random(0,30)}
        clouds.push(cloud);
    }
    
    mountains = [];
    for(var i=0; i<5; i++){
        var mountain = {x_pos: width-800+600*i, 
                        width: 500+ random(0,100)}
        mountains.push(mountain);
    }
    
    canyons = [];
    for(var i=0; i<5; i++){
        var canyon = {x_pos:200+640*i, 
                      width: 200}
        canyons.push(canyon);
    }
    
    collectables = [];
    for(var i=0; i<5; i++){
        var collectable = {x_pos:500*i, 
                           y_pos: floorPos_y+35, 
                           size: 10,
                          isFound:false}
        collectables.push(collectable);
    }
    enemies = [];
    for(var i=0; i<3; i++){
        var enemy = {killed:false,
                     x_pos:670+420*i,
                     y_pos: floorPos_y+60,
                     size:30,
                     speed:1
                           }
        enemies.push(enemy);
    }
    platforms=[];
    for(var i=0;i<3;i++){
        var platform={
            x_pos:150+ 640*i,
            y_pos:floorPos_y-30,
            width: 40,
            height:20
        }
        platforms.push(platform);
    }
    
}

function draw(){
    if(restart){
        start();
        lives=3;
        
    }
    drawScenery();
    if(!gameOver && !gameWin){
        movingCharacter();
    }
    checkDeath();
    
    for(i=1;i<=lives;i++){
             drawLives(width-40*i);
    }
}


function drawScenery()
{    if(gameover) {lives=0;
                   return false;
                  }
	background(100, 155, 255); 

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); 
    push();
    translate(scrollPos,0);
	
    toDrawClouds();

	
    toDrawMountains();
	
    toDrawTrees();
    
    
    drawPlatforms();
    
	
    for(var i = 0; i < canyons.length; i++){
        checkCanyon(canyons[i]);
        drawCanyon(canyons[i]);
    }

	
    for(var i = 0; i < collectables.length; i++){
        checkCollectable(collectables[i]);
    }
    
    
    drawEnemies();

	
	drawGameChar();
    pop();
    drawCount();
    drawScore();
    drawLives();

	
    
    movingCharacter();
}

// ---------------------
// Key control functions
// ---------------------



function keyPressed()
{
    
    
    if(keyCode == 37)
        isLeft = true;
    
    if(keyCode == 39)
        isRight = true;
    
   
     if(keyCode == 32 && isStandOnPlatform==false){
        isPlummeting = true;
     }
    
}
function keyReleased()
{
    if(keyCode == 37){
        isLeft = false;
    }
    
    if(keyCode == 39){
        isRight = false;
    }
    
    if(keyCode == 32){
        isPlummeting = false;
    }
}

function checkDeath(){
    if(gameChar_y>575 || isDamaged){
        lives--;
        if(lives<1){
            gameOver();
        }
        else{
            start();
        }
    }
    
}

function drawLives(x_pos){
    
    var y_pos = 35;
    stroke(0);
    fill(229, 197, 37);
    ellipse(x_pos,y_pos-15,30,30);
    ellipse(x_pos-12,y_pos-2,11,6);
    ellipse(x_pos+12,y_pos-2,11,6);
    fill(255);
    ellipse(x_pos-5,y_pos-20,8,8);
    ellipse(x_pos+5,y_pos-20,8,8);
    fill(0);
    ellipse(x_pos-5,y_pos-20,4,4);
    ellipse(x_pos+5,y_pos-20,4,4);
    arc(x_pos-3, y_pos-11.5, 8, 8, 0, PI + QUARTER_PI, OPEN);
    
}


// ------------------------------
// Game character render function
// ------------------------------

function movingCharacter(){
    if((gameChar_y - floorPos_y) >= 300){
        gameOver();
    }
    if(score==5){
        lives=0;
        gameWin();
    }
	if(isLeft && !isDead){
        if(isPlummeting && gameChar_y >= floorPos_y+70){
            if(gameChar_y < height){
                isJumping=true;
            }
    
    }
        if(gameChar_x >leftBorder)
        {
            gameChar_x -= 5;
            
        }
        else
        {
            if(leftBorder > 0){
                gameChar_x -= 5;
                scrollPos += 5;
                leftBorder -= 5;
                rightBorder -= 5;
            }
        }
	}
    
	if(isRight && !isDead){
         if(isPlummeting && gameChar_y>=floorPos_y+70 ){
            isFalling = false;
            isJumping=true;
        }
        if(gameChar_x < rightBorder)
        {
            gameChar_x += 5;
        }
        else
        {
            if(rightBorder < 2300){
                gameChar_x  += 5;
                scrollPos -= 5;
                leftBorder += 5;
                rightBorder += 5;
            }
        }
    }
    
    if(isPlummeting && gameChar_y >= floorPos_y+70){
		isJumping = true;
        jumpSound.play();
	}
    if((floorPos_y+70 - gameChar_y) >= 150 && !isStandOnPlatform){
		isFalling = true;
		isJumping = false;
        
	} 
    else if(gameChar_y == floorPos_y+70|| isStandOnPlatform )
    {  
		isFalling = false;
	} 
    else if(!isStandOnPlatform && gameChar_y <= floorPos_y-30)
    {
        isJumping=false;
        isFalling = true;
    }
    else if(gameChar_y == floorPos_y+70 || isStandOnPlatform){
		isFalling = false;
       
	}
	if(isFalling == true && isDead == false){
        if ((floorPos_y+70 - gameChar_y) >= 100){
			gameChar_y += 10;
		} 
        if ((floorPos_y+70 - gameChar_y) >= 0){
			gameChar_y += 10;
			if (floorPos_y+70 - gameChar_y < 0){
				gameChar_y = floorPos_y+70;
			}
            else if(isStandOnPlatform){
                gameChar_y = floorPos_y-30;
            } 
		}
	}
	if (isFalling == true && isDead == true && !isStandOnPlatform){
		gameChar_y += 20;
	}
	if(isJumping == true ){
		if ((floorPos_y+70 - gameChar_y) >= 100){
			gameChar_y -= 10;
		} 
        else if ((floorPos_y+70 - gameChar_y) >= 0){
			gameChar_y -= 10;
		}
	}
	if(gameChar_y > floorPos_y+70 && isFalling == false){
		gameChar_y = floorPos_y+70;
	}
	
}


function drawGameChar()
{
    if(isLeft && isFalling)
	{
		jumpRight();

	}
	else if(isRight && isFalling)
	{
		jumpLeft();

	}
	else if(isLeft )
	{
		walkLeft();

	}
	else if(isRight)
	{
		walkRight();

	}
	else if(isFalling || isPlummeting )
	{
		jumpForward();

	}
	else
	{
		standForward();

	}
  
}
function standForward(){
    
    stroke(0);
    fill(229, 197, 37);
    ellipse(gameChar_x,gameChar_y-15,30,30);
    ellipse(gameChar_x-12,gameChar_y-2,11,6);
    ellipse(gameChar_x+12,gameChar_y-2,11,6);
    fill(255);
    ellipse(gameChar_x-5,gameChar_y-20,8,8);
    ellipse(gameChar_x+5,gameChar_y-20,8,8);
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-20,4,4);
    ellipse(gameChar_x+5,gameChar_y-20,4,4);
    arc(gameChar_x-3, gameChar_y-11.5, 8, 8, 0, PI + QUARTER_PI, OPEN);
}
function jumpForward(){
    stroke(0);
    fill(229, 197, 37);
    ellipse(gameChar_x,gameChar_y-30,30,30);
    ellipse(gameChar_x-5,gameChar_y-15,6,11);
    ellipse(gameChar_x+5,gameChar_y-15,6,11);
    fill(255);
    ellipse(gameChar_x-5,gameChar_y-33,8,8);
    ellipse(gameChar_x+5,gameChar_y-33,8,8);
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-33,4,4);
    ellipse(gameChar_x+5,gameChar_y-33,4,4);
    arc(gameChar_x-3, gameChar_y-25, 8, 8, 0, PI + QUARTER_PI, OPEN);
}
function walkRight(){
    stroke(0);
    fill(229, 197, 37);
    ellipse(gameChar_x,gameChar_y-15,30,30);
    ellipse(gameChar_x-3,gameChar_y-2,11,6);
    ellipse(gameChar_x+10,gameChar_y-2,11,6);
    fill(255);
    ellipse(gameChar_x-5,gameChar_y-20,8,8);
    ellipse(gameChar_x+5,gameChar_y-20,8,8);
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-20,4,4);
    ellipse(gameChar_x+5,gameChar_y-20,4,4);
    arc(gameChar_x-3, gameChar_y-11.5, 8, 8, 0, PI + QUARTER_PI, OPEN);
}
function walkLeft(){
    stroke(0);
    fill(229, 197, 37);
    ellipse(gameChar_x,gameChar_y-15,30,30);
    ellipse(gameChar_x-10,gameChar_y-2,11,6);
    ellipse(gameChar_x+3,gameChar_y-2,11,6);
    fill(255);
    ellipse(gameChar_x-5,gameChar_y-20,8,8);
    ellipse(gameChar_x+5,gameChar_y-20,8,8);
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-20,4,4);
    ellipse(gameChar_x+5,gameChar_y-20,4,4);
    arc(gameChar_x-3, gameChar_y-11.5, 8, 8, 0, PI + QUARTER_PI, OPEN);
}
function jumpLeft(){
    stroke(0);
    fill(229, 197, 37);
    ellipse(gameChar_x,gameChar_y-30,30,30);
    ellipse(gameChar_x-3,gameChar_y-15,6,11);
    ellipse(gameChar_x+10,gameChar_y-15,6,11);
    fill(255);
    ellipse(gameChar_x-5,gameChar_y-33,8,8);
    ellipse(gameChar_x+5,gameChar_y-33,8,8);
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-33,4,4);
    ellipse(gameChar_x+5,gameChar_y-33,4,4);
    arc(gameChar_x-3, gameChar_y-25, 8, 8, 0, PI + QUARTER_PI, OPEN);
}
function jumpRight(){
    stroke(0);
    fill(229, 197, 37);
    ellipse(gameChar_x,gameChar_y-30,30,30);
    ellipse(gameChar_x-10,gameChar_y-15,6,11);
    ellipse(gameChar_x+3,gameChar_y-15,6,11);
    fill(255);
    ellipse(gameChar_x-5,gameChar_y-33,8,8);
    ellipse(gameChar_x+5,gameChar_y-33,8,8);
    fill(0);
    ellipse(gameChar_x-5,gameChar_y-33,4,4);
    ellipse(gameChar_x+5,gameChar_y-33,4,4);
    arc(gameChar_x-3, gameChar_y-25, 8, 8, 0, PI + QUARTER_PI, OPEN);
}
// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function toDrawClouds(){
for(var i = 0; i < clouds.length; i++)
        drawCloud(clouds[i]);

}
function drawCloud(cloud){
    noStroke();
    fill(255); //draw cloude
    ellipse(cloud.x_pos, cloud.y_pos, cloud.width*1.5,cloud.width*1.5);
    ellipse(cloud.x_pos+cloud.width, cloud.y_pos, cloud.width*1.7,cloud.width*1.7);
    ellipse(cloud.x_pos+cloud.width*1.3, cloud.y_pos-cloud.width/1.5, cloud.width*1.5,cloud.width*1.3);
    ellipse(cloud.x_pos+cloud.width/6, cloud.y_pos-cloud.width/1.5, cloud.width*1.5,cloud.width*1.5);
    ellipse(cloud.x_pos-cloud.width/1.125, cloud.y_pos+cloud.width/5, cloud.width+10,cloud.width+10);
    ellipse(cloud.x_pos-cloud.width, cloud.y_pos-cloud.width/5, cloud.width*1.3,cloud.width*1.3);
}

// Function to draw mountains objects.
function toDrawMountains(){
for(var i = 0; i < mountains.length; i++)
        drawMountains(mountains[i]);
}
function drawMountains(mountain){
    stroke(64, 36, 4);// draw mountain
    fill(77, 30, 3); 
    triangle(mountain.x_pos-mountain.width/2, 432, 
             mountain.x_pos-mountain.width/3 ,200, mountain.x_pos-mountain.width/9,432);
    triangle(mountain.x_pos, 432, mountain.x_pos+mountain.width/4, 200, mountain.x_pos+mountain.width/2, 432);
    triangle(mountain.x_pos, 100,mountain.x_pos+mountain.width/4, 432, mountain.x_pos-mountain.width/4, 432);
    
    stroke(201, 115, 16);// draw snow
    fill(255);
    triangle(mountain.x_pos,100,mountain.x_pos+mountain.width/13,200,mountain.x_pos-mountain.width/25,150); triangle(mountain.x_pos+mountain.width/4,200,mountain.x_pos+mountain.width/3,280,mountain.x_pos+mountain.width/6,280);
    
}

// Function to draw trees objects.
function toDrawTrees(){
for(var i = 0; i < trees_x.length; i++)
        drawTree(trees_x[i]);

}
function drawTree(treePos_x){
    stroke(0);
    fill(25, 112, 17);
    ellipse(treePos_x,treePos_y,100,100);//draw tree
    stroke(56, 38, 17);
    fill(56, 38, 17);
    triangle(treePos_x,treePos_y,treePos_x+10,treePos_y+100,treePos_x-10,treePos_y+100);
}



// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(canyon)
{
    stroke(0);// draw canyon
    fill(77, 30, 3);
    quad(canyon.x_pos-canyon.width/2+81, 432, canyon.x_pos-canyon.width/40, 432, canyon.x_pos-canyon.width/8, 576, canyon.x_pos-canyon.width*0.7, 576);
    fill(0);
    quad(canyon.x_pos-canyon.width/15.5, 432,canyon.x_pos-canyon.width/22, 432, canyon.x_pos-canyon.width/4, 576, canyon.x_pos-canyon.width/2, 576);
}

// Function to check character is over a canyon.

function checkCanyon(canyon)
{
    if((gameChar_x <=canyon.x_pos-canyon.width/40 && gameChar_x>=canyon.x_pos-canyon.width/2+31)
       && gameChar_y >= floorPos_y+70){
        isFalling = true;
        isDead=true;
        gameChar_y+=10;
        fallSound.play();
    }
}




// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(collectable)
{
    stroke(230, 233, 235);// draw collectable item
	fill(0, 37, 222);
	beginShape();
    vertex(collectable.x_pos,collectable.y_pos);
    vertex(collectable.x_pos+collectable.size,collectable.y_pos);
    vertex(collectable.x_pos+collectable.size*2,collectable.y_pos+collectable.size);
    vertex(collectable.x_pos+collectable.size*2,collectable.y_pos+collectable.size+5);
    vertex(collectable.x_pos+collectable.size/2,collectable.y_pos+collectable.size*2+5);
    vertex(collectable.x_pos-collectable.size,collectable.y_pos+collectable.size+5);
    vertex(collectable.x_pos-collectable.size,collectable.y_pos+collectable.size);
    vertex(collectable.x_pos,collectable.y_pos);
    endShape();

}

// Function to check character has collected an item.

function checkCollectable(collectable)
{
    if(!collectable.isFound){
        drawCollectable(collectable);
    }
    if(dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos)<=50){
        collectable.isFound = true;
        if(foundCollectable.indexOf(collectable)<0){
            foundCollectable.push(collectable);
            score++;
            collectSound.play();
        } 
    }
}
// ----------------------------------
// Counts and score render 
// ----------------------------------
function drawCount()
{ 
    stroke(230, 233, 235);// draw collectable item
	fill(0, 37, 222);
	beginShape();
    vertex(count.x_pos,count.y_pos);
    vertex(count.x_pos+count.size,count.y_pos);
    vertex(count.x_pos+count.size*2,count.y_pos+count.size);
    vertex(count.x_pos+count.size*2,count.y_pos+count.size+5);
    vertex(count.x_pos+count.size/2,count.y_pos+count.size*2+5);
    vertex(count.x_pos-count.size,count.y_pos+count.size+5);
    vertex(count.x_pos-count.size,count.y_pos+count.size);
    vertex(count.x_pos,count.y_pos);
    endShape();
    
}
function drawScore(){
    textSize(32);
    fill(15, 78, 171);
    text(" "+score, 50, 38);
}


// -------------------------------------------------
// Enemies and Platforms render and check functions
// --------------------------------------------------

function drawEnemies(){
    for(var i = 0; i < enemies.length; i++){
        contactWithEnemy(enemies[i]);
        if(!enemies[i].killed){
        moveEnemies(enemies[i],canyons[i],canyons[i+1]);
        toDrawEnemies(enemies[i]);
         
        }
        else{
            drawDeadEnemy(enemies[i]);
        }
}
}
function drawDeadEnemy(enemy){
    if(enemy.y_pos<height+enemy.size){
        if(!killEnemy.includes(enemy))
            killSound.play();
            enemy.y_pos+=5;

    }
    killEnemy.push(enemy);
    
}

function toDrawEnemies(enemy){
    stroke(5);
    fill(26, 28, 27);
    ellipse(enemy.x_pos,enemy.y_pos-15,50,50);
    ellipse(enemy.x_pos-18,enemy.y_pos+7,21,8);
    ellipse(enemy.x_pos+18,enemy.y_pos+7,21,8);
    fill(255);
    ellipse(enemy.x_pos-9,enemy.y_pos-20,12,12);
    ellipse(enemy.x_pos+9,enemy.y_pos-20,12,12);
    fill(0);
    ellipse(enemy.x_pos-9,enemy.y_pos-20,7,7);
    ellipse(enemy.x_pos+9,enemy.y_pos-20,7,7);
    arc(enemy.x_pos+0.2,enemy.y_pos-7.5, 10, 10,PI,0, CHORD);
}

function moveEnemies(enemy,canyon1,canyon2){
    enemy.x_pos+=enemy.speed; 
    if(enemy.x_pos <canyon1.x_pos+10 || enemy.x_pos>canyon2.x_pos-150){
        enemy.speed=enemy.speed*(-1);
    }
    
}
function contactWithEnemy(enemy){
    if(gameChar_x >= enemy.x_pos - enemy.size/0.75  && gameChar_x<= enemy.x_pos + enemy.size){
        if(enemy.y_pos - gameChar_y <= enemy.size/2.22 && enemy.y_pos - gameChar_y >=-2.35  && isFalling){
            enemy.killed = true;
         
        }
        else if((gameChar_y - enemy.y_pos)==10  && !enemy.killed){
            isDamaged = true;
            contactSound.play();
            
        }
    }
}

function drawPlatforms(){
    for(var i=0; i<platforms.length;i++){
        checkPlatform(platforms[i]);
        toDrawPlatforms(platforms[i]);
    }
}
    
function toDrawPlatforms(platform){
    stroke(0);
    fill(166, 142, 25);
    rect(platform.x_pos, platform.y_pos, platform.width,platform.height);
}

function checkPlatform(platform){
     if(gameChar_x <=platform.x_pos+platform.width && gameChar_x>=platform.x_pos && (gameChar_y = platform.y_pos-1)){
        reachPlatform.push(platform);
        isStandOnPlatform=true;
    }
     else if(reachPlatform.indexOf(platform)>=0){
        shorten(reachPlatform);
        isStandOnPlatform = false;
     }
}

// ----------------------------------
// FINAL
// ----------------------------------
function gameOver(){
    gameOver_times+=1;
	fill(0);
	rect(-1000,0,4096,576);
	textSize(100);
    textAlign(CENTER);
	fill(217, 20, 33);
    textFont("Walter Turncoat");
	text("Game OVER ", width/2, height/2);
    if(gameOver_times==1){
        endSound.play();
        contactSound.stop();
        fallSound.stop();
    }
    gameover = true;
}
function gameWin(){
    winSound.play();
	fill(242, 174, 211);
    rect(-1000,0,4096,576);
	textSize(100);
	fill(247, 179, 42);
    textAlign(CENTER);
    strokeWeight(5);
    stroke(0);
    textStyle(BOLD);
	text("WIN!", width/2, height/2);
    
    gameover = true;
}
