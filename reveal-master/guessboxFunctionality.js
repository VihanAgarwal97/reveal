define(["sweetalert"], function(sweetalert){    
    /*Handles the guess functionality*/
    return {
        GuessboxFunctionality: function(imgloader, stage, boxList) {
            this.imgloader = imgloader;
            this.stage = stage;
            this.guessbox = null;
            this.boxList = boxList;
            this.pictureGuessedCorrectly = false;
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

            this.handleCorrectGuess = function(boxList) {
                this.pictureGuessedCorrectly = true;
                swal("Nice!", "You guessed correct!", "success");
                this.clearStage();
            }

            this.handleIncorrectGuess = function() {
                swal("Oops!","You guessed wrong!","error");
            }

            this.clearStage = function() {
                for (var i = stage.children.length - 1; i >= 0; i--) {
                    if(!(stage.children[i] in imgloader.imginfo)) {
                        stage.removeChild(stage.children[i]);
                    }
                }
            }
        }
    }
}
});