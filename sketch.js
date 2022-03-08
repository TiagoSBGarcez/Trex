var trex, trex_running, trex_morto, edges;
var groundImage, chaoCretaceo;
var chaoFalso;
var ventano, cloudio, cloudioImagens;
var cactano, cactus, cactusImagens1, cactusImagens2, cactusImagens3, cactusImagens4, cactusImagens5, cactusImagens6;
var estadoJooj = "Correno";
var pontuacao = 0;   
var ressucitar, gameover, ressucitarImagens, gameoverImagens;
var somPulo, somMorto, somPonto;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudioImagens = loadImage("cloud.png");
  cactusImagens1 = loadImage("obstacle1.png");
  cactusImagens2 = loadImage("obstacle2.png");
  cactusImagens3 = loadImage("obstacle3.png");
  cactusImagens4 = loadImage("obstacle4.png");
  cactusImagens5 = loadImage("obstacle5.png");
  cactusImagens6 = loadImage("obstacle6.png");
  trex_morto = loadImage("trex_collided.png");
  ressucitarImagens = loadImage("restart.png");
  gameoverImagens = loadImage("gameOver.png");
  somPulo = loadSound("super_mauro_pulo.mp3");
  somMorto = loadSound("mauro_morto.mp3");
  somPonto = loadSound("mauro-1-up.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  var comicoSans = Math.round(random(42, 77));
  console.log(comicoSans);

  ventano = new Group();
  cactano = new Group();

  //criando o trex
  trex = createSprite(50, height-40,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("morreu", trex_morto);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50


  chaoCretaceo = createSprite(width/2, height-20, width, 20);
  chaoCretaceo.addImage("solo", groundImage);
  chaoFalso = createSprite(width/2, height-10, width, 10);
  chaoFalso.visible = false;

  trex.debug = false;
  trex.setCollider("circle", 0, 0, 40);
  //trex.setCollider("rectangle", 70, 0, 200, 50, 0);
  ressucitar = createSprite(width/2, height/2+40)
  gameover = createSprite(width/2, height/2);
  gameover.scale = 0.5;
  ressucitar.scale = 0.5;
  ressucitar.addImage(ressucitarImagens);
  gameover.addImage(gameoverImagens);

  gameover.visible = false;
  ressucitar.visible = false;
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");

  if(pontuacao > 0 && pontuacao%500===0){
    somPonto.play();
  }

  textFont("Papyrus");
  fill("Crimson");
  text("Score:"+pontuacao,12,12);

  //estados de jogo
  if (estadoJooj==="Correno"){
    
    //pulano
    if(touches.length>0||keyDown("space")&&trex.y>height - 50){
    trex.velocityY = -10;
    somPulo.play();
    touches = [];
  }
    //gravitano

  trex.velocityY = trex.velocityY + 1;    
    chaoCretaceo.velocityX = -(7+3*pontuacao/100);
    //chão
    if(chaoCretaceo.x < 0){
    chaoCretaceo.x = chaoCretaceo.width / 2;
    }
    pontuacao = pontuacao+Math.round(getFrameRate()/60)
      nuvenizador();
      cactoinator();
    if (trex.isTouching(cactano)){
    // trex.velocityY = -10;
    // somPulo.play();
     estadoJooj = "Morreno";
    // somMorto.play();
    }
  } else if (estadoJooj=== "Morreno"){
    trex.changeAnimation("morreu", trex_morto);
    trex.velocityX = 0;
    trex.velocityY = 0;
    chaoCretaceo.velocityX = 0;
    cactano.setVelocityXEach(0);
    ventano.setVelocityXEach(0);
    cactano.setLifetimeEach(-1);
    ventano.setLifetimeEach(-1);
  
    ressucitar.visible = true;
    gameover.visible = true;

    if (touches.length>0||keyDown("space")||mousePressedOver(ressucitar)){
    ressucitano();
    touches = [];
    }

  }

  
 //impedir que o trex caia
  trex.collide(chaoFalso);


  drawSprites();
}

function nuvenizador(){
if(frameCount%60===0){
  cloudio = createSprite(width + 50, 123, 4, 4);
  cloudio.scale = 0.7
  cloudio.addImage("Cloudio Imagens", cloudioImagens)
  cloudio.velocityX = -8;
  cloudio.y = Math.round(random(50, height - 73));
  cloudio.depth = trex.depth;
  trex.depth++;
  cloudio.lifetime = 400;
  ventano.add(cloudio);
}
}

function cactoinator(){
  if(frameCount%60===0){
    cactus = createSprite(width + 50, height - 35);
    cactus.velocityX = -(7+3*pontuacao/100);
    cactus.scale = 0.5;
    var grandePapiro = Math.round(random(1,6));
    switch(grandePapiro){
      case 1: cactus.addImage(cactusImagens1);
      break;
      case 2: cactus.addImage(cactusImagens2);
      break;
      case 3: cactus.addImage(cactusImagens3);
      break;
      case 4: cactus.addImage(cactusImagens4);
      break;
      case 5: cactus.addImage(cactusImagens5);
      break;
      case 6: cactus.addImage(cactusImagens6);
      break;
      default:
        break;
    }
    cactus.lifetime = 400;
    cactano.add(cactus);
  }
}

function ressucitano(){
  estadoJooj = "Correno";
  cactano.destroyEach();
  ventano.destroyEach();
  ressucitar.visible = false;
  gameover.visible = false;
  trex.changeAnimation("running", trex_running);
  pontuacao = 0;
}