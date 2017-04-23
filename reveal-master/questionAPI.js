/*This class makes calls to the question API and keeps track of already seen questions*/

define(["jquery"], function($) {
    return {
    APIRequester: function(url="https://opentdb.com/api.php", 
                                 questionNum=30) {
        this.url = url;
        this.questionNum = questionNum;
        this.questions_seen = new Array();
        this.questionList = new Array();
        this.category = 0;
        
        this.setCategory = function(category) {
            this.category = category;
        }
        
        this.requestData = function() {
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
                        category: parentObj.category,
                        amount: parentObj.questionNum
                    },

                    success: function(result) {
                        parentObj.questionList = result.results;
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
    }
});

/*class APIRequester {

    /*Constructor
    constructor(url="https://opentdb.com/api.php", 
                          questionNum=30) {
        this.url = url;
        this.questionNum = questionNum;
        this.questions_seen = new Array();
        this.questionList = new Array();
    }
    
    /*Some setters
    setUrl(url) {
        this.url = url;
    }
    
    setQuestionNum(questionNum) {
        this.questionNum = questionNum;
    }
    
    setQuestionList(qList) {
        this.questionList = qList;
    }
    
    /*Request the API
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
}*/