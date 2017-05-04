require.config({
    baseUrl: ".",
    paths: {
        Howler: "https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.3/howler.min",
        sweetalert2: "https://cdn.jsdelivr.net/sweetalert2/6.6.2/sweetalert2.min",
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min",
    }
});

require(["Howler", "sweetalert2", "jquery"], 
    
    function(Howler,sweetalert2,$) 
    {
        var sound = new Howler.Howl({
            src: ['resources/sounds/Primavera.wav']
        });
        sound.play();
    
    $("document").ready(function setup(){
        
        $("#helpButton").click(function() {
            const swal = require('sweetalert2');
            swal.setDefaults({
              confirmButtonText: 'Next &rarr;',
              progressSteps: ['', '', '','']
            })
            // the text for each modal respectivley 
            var steps = [
                  {
                    title: "Welcome Detective J.Query",
                    text: 'We finally meet! I am the Require Riddler and I have hidden pictures your city finds most valubale. The only way to recover the images is by answering my tricky questions. You will have to use your knowledge on the category of your choice, so pick wisely... ',
                    imageUrl: "resources/util/Villian2.png"
                  },
                {
                    title: 'In order to make it a fair fight, here is how to play:',
                    text:'There are 16 questions for you to answer in order to reveal parts of the picture',
                    imageUrl: 'resources/util/quizBox150.png'},
                {
                    title:'Answer the Question, Reveal Part of the Pic',
                    text: "Correct answer: +300 pts Incorrect answer: -50 pts",
                    imageUrl: "resources/util/mg.png"
                },
                {
                    title: "Guess the picture at any point in game",
                    text: "When you think you have solved my puzzle, type your guess in the text field above the grid! Final score is determined by amount of correct questions and the time it took to figure out the picture",
                    imageUrl: "resources/util/gamescreenshot copy.png"
                },
            ]

            //queue takes an array of modals to connect
            swal.queue(steps).then(function(result) {
                //resest to default values
              swal.resetDefaults()
              swal({
                  //the last modal page that will close pop up 
                title: 'Good Luck Detective, you will need it',
                imageUrl: "resources/util/detectivecopy.png",
                confirmButtonText: 'I got this!',
                showCancelButton: false
              })
            }, function () {
              swal.resetDefaults()
            });
        });
    });

});