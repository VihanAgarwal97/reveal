/**The main code of our program lies in this file. We use jQuery and pixiJS libraries.**/

/*variable to hold information about each hidden image*/
var imginfo = new Array();

/*All the grid squares currently on the page*/
var gridSquares = {};

/*Holds the coordatinates of the top left corner of the canvas*/
var xPos=100;
var yPos=200;

/*Stores the difficulty of the level or number of grid squares and a flag for the pattern*/
var no_grids=16;
var flag=true;

/*Stores the size of each grid square*/
var grid_side=100;

/*Reads a local text file that contains info about each image and stores it in imginfo
  Index 0: Image URL
  Index 1: Image tag */
$.get("resources/imginfo.txt", function(data) {
    
    var lines=data.split("\n");
    for(i=0;i<lines.length;i++){
        imginfo[i]=lines[i].split("$");
    };
    console.log(imginfo.length);
    console.log(imginfo);
},"text");
      
/*Create a new PIXI renderer and and it to the DOM*/
var renderer = PIXI.autoDetectRenderer(600,800);
renderer.backgroundColor = 0xfefdfb;
document.body.appendChild(renderer.view);

/*New PIXI Container to hold all sprites*/
var stage = new PIXI.Container();

requestAnimationFrame(animate);
   
/*Function that sets up the app*/
function setup(){
    console.log(imginfo.length);
    console.log(imginfo);
    
    var imgindex=Math.floor(Math.random() * (imginfo.length));
    
    var thisImg=imginfo[imgindex];
    var url ="resources/" + thisImg[0];
    
    addPicture(url);
    addSquares(no_grids);
    
}

/*Adds a picture that needs to be guessed to the background*/
 function addPicture(picture){
    var bg_texture = new PIXI.Texture.fromImage(picture);
    var bg = new PIXI.Sprite(bg_texture);
    bg.x = xPos;
    bg.y = yPos;
    stage.addChild(bg);
}

/*Adds a grid of checked squares to the renderer*/
function addSquares(count){
    for(i=1; i<=count;i++){
    createSquare(i);
    xPos+=grid_side;
    if(i % Math.sqrt(count) == 0) {
        yPos+=grid_side;
        xPos=100;
        flag =!flag;
        }
    }
}

/*Creates a specific ordering of squares based on flag*/
function createSquare(id,xpos,ypos){
    if(flag){
        gridSquares[id] = createBlackSquare(xPos,yPos);
        console.log("added black square" + id);
    } else {
        gridSquares[id] = createWhiteSquare(xPos,yPos);
        console.log("added white square" + id);
    }
    flag=!flag; 
    gridSquares[id].on('click',clickEvent_grid);
}
  
/*Creates a white square on the screen*/
function createWhiteSquare(xPos, yPos){
    var grid1_texture = new PIXI.Texture.fromImage("resources/whiteSquare.jpg");
    var grid1 = new PIXI.Sprite(grid1_texture);
    grid1.position.x = this.xPos;
    grid1.position.y = this.yPos;
    grid1.interactive = true;
    stage.addChild(grid1);
    return grid1;
}

/*Creates a black square on the screen*/
function createBlackSquare(xPos, yPos){
    var grid2_texture = new PIXI.Texture.fromImage("resources/blackSquare.jpg");
    var grid2 = new PIXI.Sprite(grid2_texture);
    grid2.position.x = this.xPos;
    grid2.position.y = this.yPos;
    grid2.interactive = true;
    stage.addChild(grid2);
    return grid2;
}
    

/*Call to PIXI animator*/
function animate(){
    requestAnimationFrame(animate);
    renderer.render(stage);   
}

/*Defines a clickEvent for a grid piece*/
function clickEvent_grid(){
    stage.removeChild(this);
    console.log("clicked");
}

//why?
setTimeout(setup,0);