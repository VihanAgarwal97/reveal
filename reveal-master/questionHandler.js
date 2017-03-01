/*Updates the Question on the side pane to reflect the question associated with the grid passed*/
function updateQuestionPane(item) {
    var questiontext = item.question.question;
    var correctAnswer = item.question.correct_answer;
    var incorrectAnswers = item.question.incorrect_answers;
    var type = item.question.type;
    
    addQuestiontoPane(questiontext,correctAnswer,incorrectAnswers,type);
    
}

/*Adds the questions and correct answers to the question pane*/
function addQuestiontoPane(questiontext, correctAnswer,incorrectAnswers,type){
    if(type=="boolean"){
        $("#answer3").hide();
        $("#answer4").hide();
    } else {
        $("#answer3").show();
        $("#answer4").show();
    }
}