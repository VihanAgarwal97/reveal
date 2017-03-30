define(["jquery", "sweetalert", "PIXI", "questionAPI"], function($, sweetalert, PIXI, questionAPI) 
{
    return {
        QAHandler: function(stage) {
            
            /*Stores the currently selected grid*/
            this.activeGrid;
            
            this.stage = stage;

            /*Updates the question on the side pane to reflect the question associated with the grid passed to it*/
            this.updateQuestionPane = function(item) {
                this.activeGrid = item;
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
        
        
        /*Stores extra questions to be used for refreshing box questions*/
        this.extraQuestions = new questionAPI.APIRequester();
        /*var extraQuestionsPromise = extraQuestions.requestData();
        extraQuestionsPromise.then(function() {
            console.log("Extra questions ready.");
        });*/
        var currentObj = this;
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

            if(answer==this.activeGrid.question.correct_answer){
                this.stage.removeChild(this.activeGrid);
                //alert to say you are correct
                swal({
                    title: "Congratulations!!",
                    text: "You are correct!",
                    type: "success",
                    imageUrl: "resources/images.jpeg",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
            else {
                //Alert to say you are wrong
                swal({
                    title: "Oh no!",
                    text: "You are wrong.",
                    type: "error",
                    imageUrl: "resources/sad-dog.jpg",
                    timer: 1500,
                    showConfirmButton: false
                });

                if(this.extraQuestions.questionList.length == 0) {
                    var extraQuestionsPromise = 
                        this.extraQuestions.requestData();
                    extraQuestionsPromise.then(function() {
                        console.log("Refreshed questions.");
                    });
                }
                else {
                    this.activeGrid.question = 
                        this.extraQuestions.questionList.pop();
                }
            }
                this.hidePaneElements();
                this.clearPane();
                this.activeGrid.texture = new PIXI.Texture.fromImage("resources/quizbox150.png");
                this.activeGrid = null;
                this.isClicked= false;
        }
    }
    }
});