/*This file holds the current game state*/
define([], function() {
    return {
        Gamestate: function(numPlayers=1, level=1) {
            this.numPlayers = numPlayers;
            this.level = level;
            this.elapsedTurns = 0;
        }
    }
});
/*class Gamestate {

    constructor(numPlayers=1, level=1) {
        this.numPlayers = numPlayers;
        this.level = level;
        this.elapsedTurns = 0;
    }
    //buildPlayerQueue() {}
}*/