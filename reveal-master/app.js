/*All the files/frameworks/libraries we need for our app. This command associates names with file paths*/
require.config({
    baseUrl: ".",
    paths: {
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min",
        questionAPI: "questionAPI",
        imgloader: "imgloader",
        Howler: "https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.3/howler.min",
        PIXI: "http://pixijs.download/release/pixi.min",
        qaHandler: "qaHandler",
        timer: "timer",
        sweetalert: "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min",
        gamestate: "gamestate",
        guessboxFunctionality: "guessboxFunctionality",
        categoryParser: "categoryParser",
    }
});

require(["jquery", "questionAPI", "imgloader", "PIXI", "qaHandler","timer", "gamestate", "guessboxFunctionality","Howler"], 
    function($, questionAPI, imgloader, PIXI, qaHandler, timer, gamestate, guessboxFunctionality, Howler) 
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

        /*Create a new PIXI renderer and and it to the DOM*/
        var renderer = PIXI.autoDetectRenderer(700,900);
        renderer.backgroundColor = 0x000000;
        document.getElementById("canvas-container").appendChild(renderer.view);
    
        /*New PIXI Container to hold all sprites.*/
        var stage = new PIXI.Container();

        /*Create a new questionAPI object*/
        var questionAPI = new questionAPI.APIRequester();
    
        /*Current category*/
        var category = window.location.hash.substring(1);

        /*Create a new ImgLoader object*/
        var imageloader = new imgloader.Imgloader();

        /*Create a new GameState*/
        var currState = new gamestate.GameState();

        /*Creates an object that handles questions and answers*/
        var qah = new qaHandler.QAHandler(stage, currState, no_grids); 
    
        /*Creates a timer object*/
        var timer= new timer.Timer(stage);
        
        /*Creates a guess box functionality object*/
        var gbFunct = new guessboxFunctionality.GuessboxFunctionality(imageloader, stage, gridSquares);

        /*Function that sets up the app*/
        $("document").ready(function setup(){
            questionAPI.category = category;
            //$("#restartButton").toggle();
            
            /*Set height of sidepane to be the same as the canvas*/
            h = $("canvas").css("height");
            $("#sidePane").css("height",h);
            
            /*Hide all sidepane elements*/
            qah.hidePaneElements();
            
            //$("#restartButton").css("visibility","show");
            /*Request questions from the API*/
            var questionListPromise = questionAPI.requestData();
            
            /*Read the image flat file and pick a random picture for the game*/
            imageloader.imgPromise.then(function() {
                var imgindex=Math.floor(Math.random() * (imageloader.imginfo.length));
                var thisImg=imageloader.imginfo[imgindex];
                imageloader.currentImage = thisImg;
                var url ="resources/" + thisImg.url;
                
                /*Add the points label to the canvas*/
                qah.addPointsLabel(currState.points,false);
                
                /*Add the randomly selected picture to the page*/
                addPicture(url);
                
                /*Adds the grid squares above the picture*/
                addSquares(no_grids);
                
                /*Assign questions to grid squares*/
                questionListPromise.then(function() {
                    assignQuestions();
                    qah.extraQuestions.questionList = 
                                questionAPI.questionList;
                    qah.extraQuestions.category = category;
                });
                
                /*Link the guessbutton to the guessbox functionality object*/
                gbFunct.guessbox = $("#guessbutton");
                
                /*Add the timer to the stage*/
                timer.addTimerToStage();
                
                /*Call to PIXI Animator*/
                requestAnimationFrame(animate);
                
                /*Prepares the Guess Box*/
                gbFunct.prepareGuessbox();
            });

            //Handle height of side pane based on canvas every time the window is resized
            $(window).resize(function (){
                h = $("canvas").css("height");
                $("#sidePane").css("height",h);
            });
            
            /*Set up the guess input box to trigger the button on "Enter"*/
            $("#guessinp").keypress(function(event){
                //Was enter clicked? If so, trigger the hidden button
                if(event.keyCode == 13){
                    $("#guessbutton").click();
                }
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
                    square.question = questionAPI.questionList.pop();
                }
            });
        }
        
        var sound = new Howl({
          src: ['resources/Primavera.wav'],
          volume: .5,
          loop:true,
        });

        sound.play();
        
        //Time when first frame is called
        var last=Date.now();
        
        //Time since last frame
        var timeElapsed = 0;
    
        /*Call to PIXI animator*/
        function animate(){
            /*IF the picture hasn't been guessed correctly*/
            if(!gbFunct.pictureGuessedCorrectly && qah.unansweredgrids > 0) {
                var now = Date.now();
                timeElapsed += (now - last);
                last = Date.now();
                
                /*If the time since the last frame is more than a second*/
                if(timeElapsed>=1000){
                    timer.updateTime();
                    timeElapsed=0;
                }
                renderer.render(stage);
                requestAnimationFrame(animate);
            } else {
                endGame();
                renderer.render(stage);
            } 
        }
        
        /*A function that ends the game and calculates the total number of points won*/
        function endGame(){
            guesspoints = Math.ceil(timer.getTimePoints());
            gridpoints = qah.unansweredgrids * 200;
            gamepoints = Math.ceil(currState.points);
            totalpoints = guesspoints + gamepoints + gridpoints;
            qah.addPointsLabel(totalpoints, true);
            clearGameAssets();
               // displaying points and replay button 
            swal({
                title: "Dare To Play Again",
                text: ('You Win! You have bested the Riddler again, next time it will not be as easy! \n Game Points:  +' + gamepoints + "\n Bonus Time Points:  +" + guesspoints + '\n Bonus Grid Points:  +' + gridpoints + '\n Total Points:  '  + totalpoints),
                confirmButtonText: "Yes, that was easy!",
                imageUrl: "resources/detectivecopy.png",
                showCancelButton: true,
                cancelButtonText: "No, I don't want to test my luck"},
                 //function to link to start page and categories page respectivley
                function(isConfirm){
                    if (isConfirm){
                        window.location.href= 'Categories.html';
                    }else{
                        window.location.href = 'startpage.html';
                    }
            });
        }
        /*Clears game images from the board*/
        function clearGameAssets() {
            qah.hidePaneElements();
            $("#guessinp").remove();
            var i = 0;
            while(stage.children[i]) {
                if(stage.children[i]._texture.baseTexture.imageUrl == "resources/quizbox150.png"
                || stage.children[i]._texture.baseTexture.imageUrl == "resources/selectedQuizBox150.png") {
                    stage.removeChildAt(i);
                }
                else {
                    i++;
                }
            }
            //$("#restartButton").toggle();
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
            this.texture = new PIXI.Texture.fromImage("resources/selectedQuizBox150.png");
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
