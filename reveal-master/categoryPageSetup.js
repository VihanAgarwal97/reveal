/*Handles the category page. Adds category buttons and sets the category for the main app.*/

require.config({
    baseUrl: ".",
    paths: {
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min",
        categoryParser: "categoryParser",
    }
});

require(["categoryParser", "jquery"], function(categoryParser, $) {
    
    catParse = new categoryParser.CategoryParser();
    catParse.categoryPromise.then(function() {
        for(var category in catParse.categoryList) {
            var id = category.trim() + "button"; // Example ID: "ComputerSciencebutton"
            makeCategoryButton("index.html", id, category);
            $(id).on("click", function() {
                localStorage.setItem("category", category);
            });
        }
    });
    
    /*Makes the inner HTML for every category button*/
    function makeCategoryButton(linkTarget, id, category) {
        var categoryCode = catParse.categoryList[category];
        
        $("body").append("<div id=" + id + " class=button> <a href=" + linkTarget 
                         + "#" + categoryCode  + ">" + category + "</a> </div>");
    }
    /*Adds links to the target page to all buttons*/
    function addLink(linkTarget, id, category) {
        var htmlString = jQuery("<a></a>", {
            href: linkTarget,
            style: "color: #ffffff",
            text: category
        });
    }
});