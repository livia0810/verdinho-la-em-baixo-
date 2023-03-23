var JOGAR = 1;
var FIM = 0; 
var estadoDeJogo = JOGAR;


var trex ,trex_correndo, trex_colide;

var chao, chao_img, chao_invisivel;
var nuvem, nuvem_img, nuvem_grupo;
var obstaculo1 , obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6 , obstaculo_grupo; 
var pontos;
var gameOverImg, restartImg;
var checkPoint, morre, pulo;

var dino2;
var dino2_img;

function preload(){
  trex_correndo = loadAnimation("trex_1.png", "trex_3.png", "trex_2.png" );
  
trex_colide = loadAnimation("trex_collided.png")


dino2_img = loadImage("dino 2.png");

  chao_img = loadImage("ground.png");

  nuvem_img = loadImage("cloud.png");

obstaculo1 = loadImage("obstacle1.png")

 obstaculo2 = loadImage("obstacle2.png")




gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

checkPoint = loadSound("checkpoint.mp3");
morre = loadSound("die.mp3");
pulo = loadSound("jump.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //crie um sprite de trex
  trex = createSprite(50,height-70, 20, 50);
  trex.addAnimation("correndo", trex_correndo);
  trex.addAnimation("colidindo", trex_colide);
  trex.scale = 0.120;

  chao = createSprite(width/2, height, width, 2);
  chao.addImage("chao", chao_img);
  chao.x = chao.width / 2;
  chao.velocityX = -4;

  chao_invisivel = createSprite(width/2, height-10, width, 125);
  chao_invisivel.visible = false;

  gameOver = createSprite(width/2, height/2 - 50);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;



restart = createSprite(width/2, height/2)
restart.addImage(restartImg);
restart.scale = 0.1;
restart.visible = false;


  pontos = 0;

  nuvem_grupo = new Group();

  obstaculo_grupo = new Group();

}

function draw(){
  background("white");

  text("pontuacao: " + pontos, 30,50);
  if(estadoDeJogo === JOGAR){
  
    chao.velocityX = -(4 + 3 * pontos/100);

pontos = pontos + Math.round(getFrameRate()/60);


if(pontos > 0 && pontos % 100 === 0){
  checkPoint.play();
}



  if(keyDown("space") && trex.y >= height - 120){
    trex.velocityY = -10;
pulo.play ();
  }
  trex.velocityY = trex.velocityY + 0.5;

  if(chao.x < 0 ){
    chao.x = chao.width/2;
  }
  criarNuvens();
  criarObstaculo();



  if(obstaculo_grupo.isTouching(trex)){

    estadoDeJogo = FIM;
    morre.play();
  }
}
else if( estadoDeJogo === FIM){
  chao.velocityX = 0;
trex.velocityY = 0;

trex.changeAnimation("colidindo" ,trex_colide);


  obstaculo_grupo.setVelocityXEach(0);
  nuvem_grupo.setVelocityXEach(0);

gameOver.visible = true;
restart.visible = true;

obstaculo_grupo.setLifetimeEach(-1);
nuvem_grupo.setLifetimeEach(-1);
}
  
trex.collide(chao_invisivel);



if(mousePressedOver(restart)){
reset()
}
  
  drawSprites();
}
function reset(){

  estadoDeJogo = JOGAR;
  gameOver.visible = false;
  restart.visible = false;

  nuvem_grupo.destroyEach();
  obstaculo_grupo.destroyEach();

  trex.changeAnimation("correndo" , trex_correndo);

  pontos = 0;
}
function criarNuvens(){


  if (frameCount % 60 === 0){
    nuvem = createSprite(width + 20, height - 300,40, 10);
    nuvem.addImage(nuvem_img);
    nuvem.scale = 0.5;
    nuvem.y = Math.round(random(100, 220));
    nuvem.velocityX = -4;

dino2 = createSprite(width + 100, height - 300,40 ,10);
dino2.addImage(dino2_img);
dino2 = Math.round(random(100,220));
dino2.velocityX = -4;
dino2.lifetime = 300;
dino2.scale = 0.00000000;

    nuvem.lifetime = 300;

nuvem_grupo.add(nuvem);
    nuvem.depth = trex.depth;

  trex.depth = trex.depth +1;
  }
}

function criarObstaculo(){


if(frameCount % 60 === 0){
  obstaculo = createSprite(600, height - 95, 10,40);
  obstaculo.velocityX = -(6 + 3 * pontos/100);
   var rand = Math.round(random(1,2));
switch(rand){
case 1: obstaculo.addImage(obstaculo1);
break;
case 2: obstaculo.addImage(obstaculo2);
break;

default: break;
}

obstaculo.scale = 0.3;
obstaculo.lifetime = 300;

obstaculo_grupo.add(obstaculo);
}
}









