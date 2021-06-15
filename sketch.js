//Create variables here
var dog,dogImg,hDogImg,db,food,foodStock;
var remaining;
var feed,stock;
var milk;
var time;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  hDogImg = loadImage("images/dogImg1.png")
  milk = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,300,10,5);
  dog.addImage(dogImg);
  dog.scale = 0.19;
  db = firebase.database();
  foodStock = db.ref("Food").on("value",readStock);
  feed = createButton("Feed Dog").position(400,300);
  stock = createButton("Add Stock").position(750,300);
}


function draw() {  
  background(46,139,87);
  /*if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(hDogImg);
  }*/
  feed.mousePressed(decrease);
  stock.mousePressed(increase);
  drawSprites();
  textSize(20)
  fill("white")
  //text("Note : Press UP_ARROW Key To Feed Drago Milk!",20,20);
  text("Food remaining : "+food,180,200);
  //add styles here
  var x = 10;
  var y = 10;
  for(var i = 0;i < food;i++){
    if(i % 10 === 0){
      x = 10;
      y = y + 30;
    }
    image(milk,x,y,40,40);
    x = x + 30;
  }
  time = hour();
  textSize(20)
  fill("white")
  text("Time : "+time,180,230);

}
function readStock(data){
  food = data.val();
}
/*function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x-1;
  }
  //food = food - 1;
  db.ref("/").update({Food : x});
}*/
function decrease(){
  food = food - 1;
  db.ref("/").update({Food : food});
}
function increase(){
  food++;
  db.ref("/").update({Food : food});
}



