/*This class makes calls to the question API and keeps track of already seen questions/

/*Stores the URL for the API call*/
var url = "https://opentdb.com/api.php";

/*Holds all the questions already seen by the user*/
var questions_seen = new Array();

/*Stores the current question returned*/
var question;

/*Number of squares in the main app*/
var squareNum;

/*Stores all questions to be displayed on the main app*/
var questionList = {};

/*Request the API*/
var requestData = function(url, questionNum) {
        dataPromise = new Promise(function(resolve, reject) {
            $.ajax({

                url: url,
                origin: "https://opentdb.com/",
                type: 'GET',
                dataType: 'json',
                data: {difficulty: 'easy', amount: questionNum},

                success: function(result) {
                    questionList = result.results;
                    question = questionList[0];
                    resolve(questionList);
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

/*Getter for the current question*/
function getQuestion(){
    return question;
}

requestData(url, 30);

