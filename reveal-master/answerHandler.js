/*This deals with handling what happens once a certain answer is clicked. It handles checking if the answer is correct/wrong*/

/*Stores extra questions to be used for refreshing box questions*/
var extraQuestions = new APIRequester();
var extraQuestionsPromise = extraQuestions.requestData();
extraQuestionsPromise.then(function() {
    console.log("Extra questions ready.");
});

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
   
    if(answer==activeGrid.question.correct_answer){
        stage.removeChild(activeGrid);
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
        hidePaneElements();
        clearPane();
        activeGrid.texture = new PIXI.Texture.fromImage("resources/quizbox150.png");
        activeGrid = null;
        isClicked= false;
}   

