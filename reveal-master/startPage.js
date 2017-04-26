function showInstructions(){
    /*swal({
        title: "Instructions!",
        text: "Welcome to Reveal. The object is to guess the hidden picture in the fastest amount of time and revealing the least amount of square. You can choose the category of questions.",
        confirmButtonText: "close",
    });*/
    alert("Welcome to Reveal. The object is to guess the hidden picture in the fastest amount of time and revealing the least amount of square. You can choose the category of questions.");
}
function categoryDrop() {
    document.getElementById("categoriesDrop").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.startButton')) {

    var categories = document.getElementsByClassName("categories-list");
    var i;
    for (i = 0; i < categories.length; i++) {
      var openDropdown = categories[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

}



