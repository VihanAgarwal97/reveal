/*This handles creating a question bank*/

/*Stores the URL for the API call*/
var url = "https://opentdb.com/api.php?amount=50&difficulty=easy";

/*Holds all the questions*/
var questionBank = new Array();

/*Request the API and store the questions in questionBank*/
$.ajax({
        
        url: url,
        origin: "https://opentdb.com/",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
             for(i=0;i<result.results.length;i++){
                var thisQ=result.results[i];
                questionBank[i] = createQuestion(thisQ.question,thisQ.correct_answer,thisQ.incorrect_answers);
            }
        },
        error: function() {
            alert("Failed");
        },
    });

/*Create a new question object*/
function createQuestion(question,correct,incorrect){
        var obj=new Object();
        obj.question = question;
        obj.correct = correct;
        obj.incorrect = incorrect;
        return obj;
}