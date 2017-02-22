/*This class makes calls to the question API and keeps track of already seen questions/

/*Stores the URL for the API call*/
var url = "https://opentdb.com/api.php?amount=1&difficulty=easy";

/*Holds all the questions already seen by the user*/
var questions_seen = new Array();

/*Stores the current question returned*/
var question;

/*Request the API for 1 question*/
var requestData = function(url) {
        $.ajax({

            url: url,
            origin: "https://opentdb.com/",
            type: 'GET',
            dataType: 'json',
            
            success: function(result) {
                var quest = result.results[0];
                processQuestion(quest);
            },
            
            error: function() {
                alert("Failed");
            },
        });
    }

/*Processes the question and re requests API if necessary*/
function processQuestion(quest){
    
    if(questions_seen.indexOf(quest.question)<0){
        requestData(url);
    } else {
        questions_seen.push(quest.question);
        question = quest;
    }
     
}

/*Getter for the current question*/
function getQuestion(){
    return question;
}