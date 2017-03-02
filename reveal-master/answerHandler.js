/*This deals with handling what happens once a certain answer is clicked. It handles checking if the answer is correct/wrong*/


$(".answer h2").click(function(event) {
    event.stopPropagation();
    //return false;   
});

/*Assign a click event to the answer options*/
$(".answer").click(function (event) {
    checkCorrect(event.target);
});



function checkCorrect(item){
    console.log(item);
    var id=item.id;
    var answer=$("#"+id+" .answerHead").html();
    console.log(answer);
}