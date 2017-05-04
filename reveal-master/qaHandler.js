define(["jquery", "PIXI", "questionAPI"], function($, PIXI, questionAPI) 
{
    return {
        QAHandler: function(stage, gState, noOfGrids) {
            
            /*Stores the currently selected grid*/
            this.activeGrid;
            
            /*Stores the points label*/
            this.pointslabel;
            
            /*Stores how many grid squares are unanswered*/
            this.unansweredgrids = noOfGrids;
            
            /*Stores how long to display the correct/wrong indicator when an answer is clicked*/
            this.answerTimeout = 700;
            
            /*Stores the current PIXI Stage*/
            this.stage = stage;
            
            /*Stores the current points*/
            this.gamestate = gState;
            
            /*Correct sound indication*/
            this.correct_sound = new Howl({
               src:['resources/sounds/correctSFX.wav'],
                volume: 1,
            });
            
            /*Incorrect sound indication*/
            this.incorrect_sound = new Howl({
               src:['resources/sounds/incorrectSFX.wav'],
                volume: 1.5,
            });

            /*Updates the question on the side pane to reflect the question associated with the grid passed to it*/
            this.updateQuestionPane = function(item) {
                this.activeGrid = item;
                this.activeGrid.clicked = false;
                var questiontext = item.question.question;
                var correctAnswer = item.question.correct_answer;
                var incorrectAnswers = item.question.incorrect_answers;
                var type = item.question.type;
                this.clearPane();
                this.addQuestionToPane(questiontext,correctAnswer,incorrectAnswers,type);

            }

            /*Clears the side pane of all the answers and questions*/
            this.clearPane = function(){
                $("#question").empty();
                $(".answer").html("");
            }

            /*Hides the side pane elements*/
            this.hidePaneElements = function() {
                $("#question").css("visibility", "hidden");
                $(".answer").css("visibility", "hidden");
            }

            /*shows the side pane elements*/
            this.showPaneElements = function() {
                $("#question").css("visibility", "visible");
                $(".answer").css("visibility", "visible");
            }


            /*Adds the questions and correct answers to the question pane*/
            this.addQuestionToPane = function(questiontext, correctAnswer,incorrectAnswers,type){
                /*Stores where the correct answer should be placed. Being picked at random*/
                var correct_index=Math.floor(Math.random()*(incorrectAnswers.length+1));

                /*Multiple choice or true and false question?*/
                if(type=="boolean"){
                    $("#answer2").hide();
                    $("#answer3").hide();

                } else {
                    $("#answer2").show();
                    $("#answer3").show();
                }
                
                /*Add the current question/answers to the side pane*/
                this.addQuestion(questiontext);
                this.addAnswer(correct_index,correctAnswer);
                this.addIncorrectAnswers(incorrectAnswers);

            }

            /*Adds a question to the question div*/
            this.addQuestion = function(questiontext){
                var questionhead = $("<h2 class='questionHead'>");
                questionhead.html(questiontext);
                $("#question").append(questionhead);
            }

            /*Adds an answer to the specified answer div*/
            this.addAnswer = function(index,answer){
                var answerHead = $("<h2 class='answerHead'>"); 
                answerHead.html(answer);
                $("#answer"+index).append(answerHead);
                $("#answer"+index).css("background-image", "url(resources/util/regAnswerButton.png)");
            }

            /*Adds the incorrect answers to the answer divs once the correct answer has been added*/
            this.addIncorrectAnswers = function(incorrectAnswers){
                var currentObj = this;
                var tempArray = incorrectAnswers.slice(0);
                $(".answer").each(function (i,item){
                    if(!(item.firstChild===null)){
                        return;
                    }
                    currentObj.addAnswer(i,tempArray.pop());           
                });
            }
            /*Add a points label to the top of the screen, if one exists then it updates the current label*/
            this.addPointsLabel = function(points, update) {
                if(!update) {
                    //If this is not an update, create a new label
                    var labelStyle = new PIXI.TextStyle({
                        fontFamily: 'Macondo, cursive',
                        fontSize: 32,
                        fill: '#ffffff',
                    });
                    pointslabel = new PIXI.Text("Score: " + points, labelStyle);
                    pointslabel.x = 500;
                    pointslabel.y = 150;
                    stage.addChild(pointslabel);
                    
                } else {
                    //If this is an update then
                    pointslabel.text = "Score: " + points;
                }    
            }

        
        /*Stores extra questions to be used for refreshing box questions*/
        this.extraQuestions = new questionAPI.APIRequester();
     
        var currentObj = this;
        
        /*Defines a click event for an answer div or answer header*/    
        $(".answer").click(function (event) {
            if(event.target.className == "answerHead"){
                currentObj.checkCorrect(event.target.parentElement);
            } else {
                currentObj.checkCorrect(event.target);
            }
        });
            
        /*Check if the clicked option corresponds to the correct answer*/
        this.checkCorrect = function(item){
            var id=item.id;
            var answer=$("#"+id+" .answerHead").html();
            var answerDiv = $("#" + id);
            
            if(answer==this.activeGrid.question.correct_answer && !(this.activeGrid.clicked)){
                this.activeGrid.clicked = true;
                /*Flash div with a green div to indicate answer was correct*/
                answerDiv.css("background-image", "url(resources/util/CorrectAnswerButton.png)");
                this.correct_sound.play();
                setTimeout(function(){
                    currentObj.handleCorrect(answerDiv);
                },currentObj.answerTimeout);                
            }
            else if(!(this.activeGrid.clicked)) {
                this.activeGrid.clicked = true;
                /*Flash div with a red div to indicate answer was wrong*/
                answerDiv.css("background-image", "url(resources/util/answerButton.png)");
                this.incorrect_sound.play();
                setTimeout(function() {
                    currentObj.handleIncorrect(answerDiv);
                },currentObj.answerTimeout);               
            }
        }
        
        /*Function that handles what happens when a correct answer is clicked*/
        this.handleCorrect = function(answer) {
            this.gamestate.addPoints(300);
            this.addPointsLabel(this.gamestate.points,true);
            this.stage.removeChild(this.activeGrid);
            this.unansweredgrids -= 1;
            this.resetPane();
        }
        
        /*Function that handles what happens when an incorrect answer is clicked*/
        this.handleIncorrect = function(answer) {
            this.gamestate.addPoints(-50);
            this.addPointsLabel(this.gamestate.points,true);
            // If questionList.length is one or zero, it risks assigning no questions to a 
            // question pane, and makes the game unplayable.
            if(this.extraQuestions.questionList.length == 2) {
                var extraQuestionsPromise = this.extraQuestions.requestData();
                var parentObj = this;
                extraQuestionsPromise.then(function() {
                    console.log("Refreshed questions.");
                });
            }
            this.activeGrid.question = this.extraQuestions.questionList.pop();
            this.resetPane();
        }
        
        /*Reset the entire side pane and set the active grid to null*/
        this.resetPane = function() {
                this.hidePaneElements();
                this.clearPane();
                this.activeGrid.texture = new PIXI.Texture.fromImage("resources/util/quizbox150.png");
                this.activeGrid = null;
                this.isClicked= false;
        }
        
        }
        
    }
    
});