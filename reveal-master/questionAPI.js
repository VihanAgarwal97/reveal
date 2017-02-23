/*This class makes calls to the question API and keeps track of already seen questions/

/*Stores the URL for the API call*/
var url = "https://opentdb.com/api.php?amount=1&difficulty=easy";

/*Holds all the questions already seen by the user*/
var questions_seen = new Array();

/*Stores the current question returned*/
var question;

/*Request the API for 1 question*/
var requestData = function(url) {
        dataPromise = new Promise(function(resolve, reject) {
            $.ajax({

                url: url,
                origin: "https://opentdb.com/",
                type: 'GET',
                dataType: 'json',

                success: function(result) {
                    var quest = result.results[0];
                    question = quest;
                    resolve(question);
                },

                error: function() {
                    alert("Failed");
                    reject(Error("Oh no"));
                },
            });
        })
        
        dataPromise.then(function(res) {
            console.log(res);
        });
    }

/*Processes the question and re requests API if necessary*/
function processQuestion(quest){
    // WARNING: THIS CAN INFINITELY LOOP. Probably would look like a 
    // DDOS
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