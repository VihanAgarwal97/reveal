/*This class makes calls to the question API and keeps track of already seen questions*/

class APIRequester {

    /*Constructor*/
    constructor(url="https://opentdb.com/api.php", 
                          questionNum=30) {
        this.url = url;
        this.questionNum = questionNum;
        this.questions_seen = new Array();
        this.questionList = new Array();
    }
    
    /*Some setters*/
    setUrl(url) {
        this.url = url;
    }
    
    setQuestionNum(questionNum) {
        this.questionNum = questionNum;
    }
    
    setQuestionList(qList) {
        this.questionList = qList;
    }
    
    /*Stores the URL for the API call*/
    //var url = "https://opentdb.com/api.php";

    /*Holds all the questions already seen by the user*/
    //var questions_seen = new Array();

    /*Stores all questions to be displayed on the main app*/
    //var questionList = new Array();
    
    //parentObj = this;

    /*Request the API*/
    requestData() {
        var parentObj = this;
        var dataPromise = new Promise(function(resolve, reject) {
                $.ajax({

                    url: parentObj.url,
                    origin: "https://opentdb.com/",
                    type: 'GET',
                    dataType: 'json',
                    data: 
                    {
                        difficulty: 'easy', 
                        amount: parentObj.questionNum
                    },

                    success: function(result) {
                        parentObj.setQuestionList(result.results);
                        resolve(parentObj.questionList);
                    },

                    error: function() {
                        alert("Failed");
                        reject(Error("Oh no"));
                    },
                });
            })

        return dataPromise;
    }
}