/*This class deals with displaying the question associated with a grid square onto the question pane*/

/*Stores the currently selected grid*/
var activeGrid;

/*Updates the question on the side pane to reflect the question associated with the grid passed to it*/
function updateQuestionPane(item) {
    activeGrid = item;
    var questiontext = item.question.question;
    var correctAnswer = item.question.correct_answer;
    var incorrectAnswers = item.question.incorrect_answers;
    var type = item.question.type;
    clearPane();
    addQuestionToPane(questiontext,correctAnswer,incorrectAnswers,type);
    
}

/*Clears the side pane of all the answers and questions*/
function clearPane(){
    $("#question").empty();
    $(".answer").html("");
}

/*Hides the side pane elements*/
function hidePaneElements() {
    $("#question").css("visibility", "hidden");
    $(".answer").css("visibility", "hidden");
}

/*shows the side pane elements*/
function showPaneElements() {
    $("#question").css("visibility", "visible");
    $(".answer").css("visibility", "visible");
}



/*Adds the questions and correct answers to the question pane*/
function addQuestionToPane(questiontext, correctAnswer,incorrectAnswers,type){
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
    
    addQuestion(questiontext);
    addAnswer(correct_index,correctAnswer);
    addIncorrectAnswers(incorrectAnswers);
}

/*Adds a question to the question div*/
function addQuestion(questiontext){
    var questionhead = $("<h2 class='questionHead'>");
    questionhead.html(questiontext);
    $("#question").append(questionhead);
}

/*Adds an answer to the specified answer div*/
function addAnswer(index,answer){
    var answerHead = $("<h2 class='answerHead'>"); 
    answerHead.html(answer);
    $("#answer"+index).append(answerHead);
}

/*Adds the incorrect answers to the answer divs once the correct answer has been added*/
function addIncorrectAnswers(incorrectAnswers){
    var tempArray = incorrectAnswers.slice(0);
    $(".answer").each(function (i,item){
        if(!(item.firstChild===null)){
            return;
        }
        addAnswer(i,tempArray.pop());           
    });
}
