/*This deals with handling what happens once a certain answer is clicked. It handles checking if the answer is correct/wrong*/

/*Stores extra questions to be used for refreshing box questions*/
var extraQuestions = new APIRequester();
var extraQuestionsPromise = extraQuestions.requestData();
extraQuestionsPromise.then(function() {
    console.log("Extra questions ready.");
});

/*Assign a click event to the answer options*/
$(".answer").click(function (event) {
    if(event.target.className == "answerHead"){
        checkCorrect(event.target.parentElement);
    } else {
        checkCorrect(event.target);
    }
});


/*Check if the clicked option corresponds to the correct answer*/
function checkCorrect(item){
    var id=item.id;
    var answer=$("#"+id+" .answerHead").html();
    console.log(answer);
    
    if(answer==activeGrid.question.correct_answer){
        stage.removeChild(activeGrid);
        //Clear the question pane
        clearPane();
    }
    else {
        clearPane();
        if(extraQuestions.questionList.length == 0) {
            extraQuestionsPromise = extraQuestions.requestData();
            extraQuestionsPromise.then(function() {
                console.log("Refreshed questions.");
            });
        }
        else {
            activeGrid.question = extraQuestions.questionList.pop();
            console.log(extraQuestions.questionList.length);
        }
    }
}