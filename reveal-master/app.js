require.config({
    baseUrl: ".",
    paths: {
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min",
        questionAPI: "questionAPI",
        imgloader: "imgloader",
        PIXI: "http://pixijs.download/release/pixi.min",
        qaHandler: "qaHandler",
        timer: "timer",
        sweetalert: "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min",
        gamestate: "gamestate",
        guessboxFunctionality: "guessboxFunctionality",
    }
});

require(["jquery", "questionAPI", "imgloader", "PIXI", "qaHandler","timer", "gamestate", "guessboxFunctionality"], 
    function($, questionAPI, imgloader, PIXI, qaHandler, timer, gamestate, guessboxFunctionality) 
    {
        function loadCss() {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "styles";
            document.getElementsByTagName("head")[0].appendChild(link);
        }
        loadCss();
    
        /*All the grid squares currently on the page*/
        var gridSquares = new Array();

        /*Holds the coordatinates of the top left corner of the picture to be hidden*/
        var xPos=50;
        var yPos=200;

        /*Stores the difficulty of the level or number of grid squares and a flag for the pattern*/
        var no_grids=16;

        /*Stores the size of each grid square*/
        var grid_side=150;

        /*Stores whether the user correctly guessed the picture*/
        var pictureGuessedCorrectly = false;

        /*Create a new PIXI renderer and and it to the DOM*/
        var renderer = PIXI.autoDetectRenderer(700,900);
        renderer.backgroundColor = 0x000000;
        document.getElementById("canvas-container").appendChild(renderer.view);
        /*New PIXI Container to hold all sprites.*/
        var stage = new PIXI.Container();

        /*Create a new questionAPI object*/
        var questionAPI = new questionAPI.APIRequester();

        /*Create a new ImgLoader object*/
        var imageloader = new imgloader.Imgloader();

        /*Create a new GameState*/
        var currState = new gamestate.GameState();

        /*Creates an object that handles questions and answers*/
        var qah = new qaHandler.QAHandler(stage, currState); 
    
        /*Creates a timer object*/
        var timer= new timer.Timer(stage);
    
        var gbFunct = new 
        guessboxFunctionality.GuessboxFunctionality(imageloader, 
                                                    stage,
                                                    gridSquares);

        /*Function that sets up the app*/
        $("document").ready(function setup(){

            qah.hidePaneElements();

            var questionListPromise = questionAPI.requestData();

            imageloader.imgPromise.then(function() {
                var imgindex=Math.floor(Math.random() * 
                                   (imageloader.imginfo.length));
                var thisImg=imageloader.imginfo[imgindex];
                imageloader.currentImage = thisImg;
                var url ="resources/" + thisImg.url;
                qah.addPointsLabel(currState.points,false);
                addPicture(url);
                addSquares(no_grids);
                addGuessButton();
                timer.addTimerToStage();
                requestAnimationFrame(animate);
                gbFunct.prepareGuessbox();
            });

            questionListPromise.then(function() {
                assignQuestions();
                qah.extraQuestions.questionList = 
                            questionAPI.questionList;
            });

            //Handle height of side pane based on canvas every time the window is resized
            $(window).resize(function (){
                h = $("canvas").css("height");
                $("#sidePane").css("height",h);
            });
        });

        /*Adds the guess button to the pixi canvas*/
        function addGuessButton() {
            var but_texture = new PIXI.Texture.fromImage("resources/guessbutton.png");
            var guessbutton = new PIXI.Sprite(but_texture);
            guessbutton.x = 300;
            guessbutton.y = 50;
            guessbutton.interactive = true;
            gbFunct.guessbox = guessbutton;
            stage.addChild(guessbutton);
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
                    square.question = questionAPI.questionList.pop();
                }
            });
        }

        
        var last=Date.now();
        var timeElapsed = 0;
        /*Call to PIXI animator*/
        function animate(){
            if(!pictureGuessedCorrectly) {
                var now = Date.now();
                timeElapsed += (now - last);
                last = Date.now();
                if(timeElapsed>=1000){
                    timer.updateTime();
                    timeElapsed=0;
                }
            }
            renderer.render(stage);
            requestAnimationFrame(animate);
        }
    

        /*Defines a function for a grid square when clicked*/
        function clickEvent_grid(){
            if(qah.isClicked) {
                qah.activeGrid.texture = new PIXI.Texture.fromImage("resources/quizbox150.png");
            }
            if(questionAPI.questionList.length != 0) {
                qah.updateQuestionPane(this);
            }
            qah.showPaneElements();
            this.texture = new 
            PIXI.Texture.fromImage("resources/selectedQuizBox150.png");
            qah.isClicked = true;
        }

        /*Variable to store the counter as a texture*/
        var thisTexture;

        /*Defines a function for a grid square when the mouse enters it*/
        function mouseEnter_grid(){
            if(this!=qah.activeGrid) {
                thisTexture = this.texture;
                this.texture = new PIXI.Texture.fromImage("resources/selectedQuizBox150.png");
            }  
        }

        /*Defines a function for a grid square when the mouse leaves it*/
        function mouseLeave_grid(){
            if(this!=qah.activeGrid){
                this.texture = thisTexture;
            }
        }
});
