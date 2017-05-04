/*Uses info from categories.txt to assign categories to numbers*/
define(["jquery"], function($) {
    return {
        
        /*Creates a CategoryParser object which does the following:
            Reads from categories.txt
            Grabs each category and its integer category code
            Puts the category name and code in an associative array.*/
        CategoryParser: function() {
            
            /*The associative array that stores names and IDs of categories*/
            this.categoryList = new Array();
            
            var currentObj = this;
            this.categoryPromise = new Promise(function(resolve, reject) {
                $.get("resources/util/categories.txt", function(data) {

                    var lines=data.split("\n");

                    for(var i=0; i<lines.length; i++) {
                        var info=lines[i].split(":");
                        if(info[0] != "") {
                            currentObj.categoryList[info[0]] = parseInt(info[1]); // Key: name, val: id
                        }
                    };
                    resolve(currentObj.categoryList);
                },"text");
            });
        }
        
    }
});