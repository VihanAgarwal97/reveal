/*REQUIRE JS FIX NEEDED*/
/*This file holds the current game state*/
class GameState {
    constructor() {
        this.points = 0;
        this.time = 0;
        
        this.addPoints = function(pointstoadd) {
            this.points += pointstoadd;
        }
        
        this.updateTime = function(timeinseconds) {
            this.time += timeinseconds;
        }
    }
    
}