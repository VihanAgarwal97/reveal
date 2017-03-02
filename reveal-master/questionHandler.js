/*This class deals with displaying the question associated with a grid square onto the question pane*/

/*Updates the Question on the side pane to reflect the question associated with the grid passed*/
function updateQuestionPane(item) {
    var questiontext = item.question.question;
    var correctAnswer = item.question.correct_answer;
    var incorrectAnswers = item.question.incorrect_answers;
    var type = item.question.type;
    clearPane();
    addQuestionToPane(questiontext,correctAnswer,incorrectAnswers,type);
    
}

/*Clears the current question that is being displayed on the pane*/
function clearPane(){
    $("#question").empty();
    $(".answer").html("");
}

/*Adds the questions and correct answers to the question pane*/
function addQuestionToPane(questiontext, correctAnswer,incorrectAnswers,type){
    /*Stores where the correct answer should be placed. Being picked at random*/
    var correct_index=Math.floor(Math.random()*(incorrectAnswers.length+1));
    
    //console.log(correct_index);
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

/*Adds an answer to the specified answer spot*/
function addAnswer(index,answer){
    var answerHead = $("<h2 class='answerHead'>"); 
    answerHead.html(answer);
    $("#answer"+index).append(answerHead);
}

/*Adds the incorrect answers to the answer divs once the correct answer has been added*/
function addIncorrectAnswers(incorrectAnswers){
    var tempArray = incorrectAnswers.slice(0);
    $(".answer").each(function (i,item){
//        console.log(item.firstChild);
        if(!(item.firstChild===null)){
            return;
        }
        
        addAnswer(i,tempArray.pop());           
    });
}
