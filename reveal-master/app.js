/**The main code of our program lies in this file. We use jQuery and pixiJS libraries.**/

/*All the grid squares currently on the page*/
var gridSquares = {};

/*Stores question data about each grid square*/
var gridSquareQuestionData = {};

/*Holds the coordatinates of the top left corner of the canvas*/
var xPos=100;
var yPos=200;

/*Stores the difficulty of the level or number of grid squares and a flag for the pattern*/
var no_grids=16;

/*Stores the size of each grid square*/
var grid_side=100;
      
/*Create a new PIXI renderer and and it to the DOM*/
var renderer = PIXI.autoDetectRenderer(600,800);
renderer.backgroundColor = 0x000000;
document.body.appendChild(renderer.view);
 

/*New PIXI Container to hold all sprites*/
var stage = new PIXI.Container();

requestAnimationFrame(animate);

/*Square object -- Keeps track of which square has which question*/
class Square {
    constructor() {
        this.id;
        this.xPos;
        this.yPos;
        this.question;
        this.sprite;
    }
};

/*Function that sets up the app*/
function setup(){
    
    var imgindex=Math.floor(Math.random() * (imginfo.length));
    
    var thisImg=imginfo[imgindex];
    var url ="resources/" + thisImg.url;
    addPicture(url);
    addSquares(no_grids);
    console.log(questionList); // Make sure questionList is loaded in
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
    var xPos=xPos;
    var yPos=yPos;
    
    for(i=1; i<=count;i++){
        createGridSquare(i,this.xPos,this.yPos);
        this.xPos+=grid_side;
        if(i % Math.sqrt(count) == 0) {
            this.yPos+=grid_side;
            this.xPos=100;
            }
        }
}

/*Creates a grid square on the screen*/
function createGridSquare(id,xPos, yPos){
    var sq = new Square();
    sq.id = id;
    sq.question = questionList[id];
    sq.xPos = xPos;
    sq.yPos = yPos;
    var grid1_texture = new PIXI.Texture.fromImage("resources/grid.png");
    //var grid1 = new PIXI.Sprite(grid1_texture);
    sq.sprite = new PIXI.Sprite(grid1_texture);
    sq.sprite.par = sq; // 'parent' is a keyword
    sq.sprite.position.x = this.xPos;
    sq.sprite.position.y = this.yPos;
    sq.sprite.interactive=true;
    stage.addChild(sq.sprite);
    gridSquares[id] = sq;
    gridSquares[id].sprite.on('mousedown',clickEvent_grid);
//    gridSquares[id].sprite.on('mouseenter',mouseEnter_grid);
//    gridSquares[id].sprite.on('mouseleave',mouseLeave_grid);
    gridSquares[id].sprite.mouseover = mouseEnter_grid;
    gridSquares[id].sprite.mouseout = mouseLeave_grid;
}

/*Shows the question of the clicked square*/
function showQuestion(squareId) {
    var squareQuestion = gridSquares[squareId].question;
    console.log(squareQuestion);
}

/*Call to PIXI animator*/
function animate(){
    requestAnimationFrame(animate);
    renderer.render(stage);   
}

/*Defines a function for a grid piece when mouse up*/
function clickEvent_grid(){
    showQuestion(this.par.id);
    stage.removeChild(this);
    console.log("removed");
}

var thisTexture;

function mouseEnter_grid(){
    thisTexture = this.texture;
    this.texture = new PIXI.Texture.fromImage("resources/grid_alt.png");
    console.log("enter");
}
function mouseLeave_grid(){
    this.texture = thisTexture;
    console.log("left");
}

//why?
setTimeout(setup,0);