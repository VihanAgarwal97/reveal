define(["sweetalert"], function(sweetalert){    
    /*Handles the guess functionality*/
    return {
        GuessboxFunctionality: function(qah, imgloader, stage, boxList) {
            this.imgloader = imgloader;
            this.stage = stage;
            this.guessbox = null;
            this.boxList = boxList;
            this.qah = qah;
            
            /*Checks to see if the user already correctly guessed the picture*/
            this.pictureGuessedCorrectly = false;
            
            /*Makes the text entry field work and sets the placeholder text. 
            After 'enter' is pressed, the handle guess functions start.*/
            this.prepareGuessbox = function() {
                var currentObj = this;
                var answer = this.imgloader.currentImage.name.toLowerCase().trim();
                var letterString = "Guess the picture (" + answer.length + " letters)";
                $("#guessinp").attr('placeholder', letterString);
                
                this.guessbox.on("click", function() {
                    if(!this.pictureGuessedCorrectly) {
                        var userGuess = $("#guessinp").val();
                        
                        if(!userGuess){
                            swal("Oops", "Please make a valid guess","error");
                        } else {
                            guess = userGuess.toLowerCase();
                            var correctAnswer = guess.search(answer);
                            if (correctAnswer!= -1 ) {
                                currentObj.handleCorrectGuess();
                            }else {
                                currentObj.handleIncorrectGuess();
                            }
                        }
                              
                    } else {
                        swal("Oops", "You have already guessed the picture","error");
                    }
            });

            /*If the user's answer is correct, this ends the game*/
            this.handleCorrectGuess = function(boxList) {
                this.pictureGuessedCorrectly = true;
            }

            /*If the user's answer is incorrect, this gives an indication for it.*/
            this.handleIncorrectGuess = function() {
                swal({
                  title: "WRONG! (-100 points)",
                  text: "Are you really a detective?",
                    confirmButtonText: "Of course I am! Just wait!",
                  imageUrl: "resources/util/Villian2.png"
                });
                $("#guessinp").val('');
                qah.gamestate.addPoints(-100);
                qah.addPointsLabel(qah.gamestate.points,true);
            }

        }
    }
}
});