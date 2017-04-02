/*This file holds the current game state*/
define([], function() {
    return {
        GameState: function() {
            this.points = 0;
            this.time = 0;

            this.addPoints = function(pointstoadd) {
                this.points += pointstoadd;
                if(this.points<0) {
                    this.points = 0;
                }
            }

            this.updateTime = function(timeinseconds) {
                this.time += timeinseconds;
            }
        }
    }
});

