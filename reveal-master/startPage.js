require.config({
    baseUrl: ".",
    paths: {
        Howler: "https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.3/howler.min"}
});
require(["Howler"]), 
    function(Howler) 
    {
        var sound = new Howl({
            src: ['resources/Primavera.wav']
        });
        sound.play();
    
}
function showInstructions(){
    /*swal({
        title: "Instructions!",
        text: "Welcome to Reveal. The object is to guess the hidden picture in the fastest amount of time and revealing the least amount of square. You can choose the category of questions.",
        confirmButtonText: "close",
    });*/
    alert("Welcome to Reveal. The object is to guess the hidden picture in the fastest amount of time and revealing the least amount of square. You can choose the category of questions.");
}






