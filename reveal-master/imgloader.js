/*Handles loading a random image behind the grid*/

class Imgloader {
/*Constructor for the imgloader class*/
    constructor() {
        /*Array to store all the possible images*/
        this.imginfo=new Array();
        
        /*Reads a local text file that contains info about each image, creates an image object and stores it in imginfo*/
        var currentObj = this;
        this.imgPromise = new Promise(function(resolve, reject) {
            $.get("resources/imginfo.txt", function(data) {

                var lines=data.split("\n");

                for(var i=0;i<lines.length;i++){
                    var info=lines[i].split("$");
                    currentObj.imginfo[i]=
                        currentObj.createImage(info[0],info[1]);
                };
                resolve(currentObj.imginfo);
            },"text");
        });
    }

    /*Create an image object*/
    createImage(url, name){
        var obj = new Object();
        obj.url = url;
        obj.name = name;
        return obj;
    }
}