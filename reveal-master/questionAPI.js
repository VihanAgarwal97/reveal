/*This class makes calls to the question API and keeps track of already seen questions*/

define(["jquery"], function($) {
    return {
    APIRequester: function(url="https://opentdb.com/api.php", questionNum=30) {
        this.url = url;
        
        /*Sets number of requested questions*/
        this.questionNum = questionNum;
        
        this.questions_seen = new Array();
        this.questionList = new Array();
        
        /*Each category in the API has a code. 0 is all*/
        this.category = 0;
        
        this.setCategory = function(category) {
            this.category = category;
        }
        
        /*Request data from the API asynchroniously. Returns a promise*/
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