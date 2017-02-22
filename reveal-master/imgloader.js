/*Handles loading a random image behind the grid*/

/*Array to store all the possible images*/
var imginfo=new Array();


/*Create an image object*/
function createImage(url, name){
    var obj = new Object();
    obj.url = url;
    obj.name = name;
    return obj;
}

/*Reads a local text file that contains info about each image, creates an image object and stores it in imginfo*/
$.get("resources/imginfo.txt", function(data) {
    
    var lines=data.split("\n");
    
    for(i=0;i<lines.length;i++){
        var info=lines[i].split("$");
        imginfo[i]=createImage(info[0],info[1]);
    };
    console.log(imginfo.length);
    console.log(imginfo);
},"text");