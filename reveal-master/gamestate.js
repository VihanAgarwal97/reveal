/*This file holds the current game state*/
define([], function() {
    return {
        GameState: function() {
            /*Stores the current points of the game*/
            this.points = 0;
            /*Stores the current time of the game*/
            this.time = 0;
            
            /*Add points to the current points*/
            this.addPoints = function(pointstoadd) {
                this.points += pointstoadd;
                if(this.points<0) {
                    this.points = 0;
                }
            }
            
            /*Update the time (in seconds) of the game*/
            this.updateTime = function(timeinseconds) {
                this.time += timeinseconds;
            }
        }
    }
});

