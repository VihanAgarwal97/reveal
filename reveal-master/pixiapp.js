/**The main code of our program lies in this file. We use jQuery and pixiJS libraries.**/

/*All the grid squares currently on the page*/
var gridSquares = new Array();

/*Holds the coordatinates of the top left corner of the picture to be hidden*/
var xPos=50;
var yPos=200;

/*Stores the difficulty of the level or number of grid squares and a flag for the pattern*/
var no_grids=16;

/*Stores the size of each grid square*/
var grid_side=150;
      
/*Create a new PIXI renderer and and it to the DOM*/
var renderer = PIXI.autoDetectRenderer(700,900);
renderer.backgroundColor = 0x000000;
document.body.appendChild(renderer.view);
/*New PIXI Container to hold all sprites.*/
var stage = new PIXI.Container();
requestAnimationFrame(animate);


/*Create a new questionAPI object*/
var questionAPI = new APIRequester();

/*Create a new ImgLoader object*/
var imageloader = new Imgloader();

/*Function that sets up the app*/
$("document").ready(function setup(){
    var questionListPromise = questionAPI.requestData(questionAPI.url);
    var imgindex=Math.floor(Math.random() * 
                           (imageloader.imginfo.length));
    var thisImg=imageloader.imginfo[imgindex];
    var url ="resources/" + thisImg.url;
    addPicture(url);
    addSquares(no_grids);
    questionListPromise.then(function() {
        assignQuestions();
    });
});

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
    var localxPos=xPos;
    var localyPos=yPos;
    
    for(i=1; i<=count;i++){
        createGridSquare(i,localxPos,localyPos);
        localxPos+=grid_side;
        if(i % Math.sqrt(count) == 0) {
            localyPos+=grid_side;
            localxPos = xPos;
            }
        }
}

/*Creates a grid square on the screen*/
function createGridSquare(id,localxPos, localyPos){
    var grid1_texture = new PIXI.Texture.fromImage("resources/quizbox150.png");
    var grid1 = new PIXI.Sprite(grid1_texture);
    grid1.position.x = localxPos;
    grid1.position.y = localyPos;
    grid1.interactive=true;
    stage.addChild(grid1);
    gridSquares[id] = grid1;
    gridSquares[id].on('mousedown',clickEvent_grid);
    gridSquares[id].mouseover = mouseEnter_grid;
    gridSquares[id].mouseout = mouseLeave_grid;
}

/*Assigns a question to each square in the squareList*/
function assignQuestions() {
    $.each(gridSquares, function(i, square) {
        if(square != undefined) {
            square.question = questionAPI.questionList[i];
        }
    });
}

/*Call to PIXI animator*/
function animate(){
    requestAnimationFrame(animate);
    renderer.render(stage);   
}

/*Defines a function for a grid square when clicked*/
function clickEvent_grid(){
    if(questionAPI.questionList.length != 0) {
        updateQuestionPane(this);
    }
}

/*Variable to store the counter as a texture*/
var thisTexture;

/*Defines a function for a grid square when the mouse enters it*/
function mouseEnter_grid(){
    thisTexture = this.texture;
    this.texture = new PIXI.Texture.fromImage("resources/selectedQuizBox150.png");
}

/*Defines a function for a grid square when the mouse leaves it*/
function mouseLeave_grid(){
    this.texture = thisTexture;
}
