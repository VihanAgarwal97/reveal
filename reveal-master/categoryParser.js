/*Uses info from categories.txt to assign categories to numbers*/
define(["jquery"], function($) {
    return {
        
        CategoryParser: function() {
            
            this.categoryList = new Object();
            
            var currentObj = this;
            this.categoryPromise = new Promise(function(resolve, reject) {
                $.get("resources/categories.txt", function(data) {

                    var lines=data.split("\n");

                    for(var i=0; i<lines.length; i++) {
                        var info=lines[i].split(":");
                        if(info[0] != "") {
                            currentObj.categoryList[info[0]] = parseInt(info[1]);
                        }
                    };
                    resolve(currentObj.categoryList);
                },"text");
            });
        }
        
    }
});