define(["sweetalert"], function(sweetalert){    
    /*Handles the guess functionality*/
    return {
        GuessboxFunctionality: function(imgloader, stage, boxList) {
            this.imgloader = imgloader;
            this.stage = stage;
            this.guessbox = null;
            this.boxList = boxList;
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
                            console.log(guess);
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
                  title: "WRONG!",
                  text: "Are you really a detective?",
                    confirmButtonText: "Of course I am! Just wait!",
                  imageUrl: "resources/Villian2.png"
                });
            }

            /*Removes all graphical elements from the app's main stage*/
            /*this.clearStage = function() {
                for (var i = stage.children.length - 1; i >= 0; i--) {
                    if(!(stage.children[i] in imgloader.imginfo)) {
                        stage.removeChild(stage.children[i]);
                    }
                }
            }*/
        }
    }
}
});