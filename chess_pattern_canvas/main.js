var canva = document.getElementById("board");
var context = canva.getContext("2d");
var boardspaces = canva.offsetWidth / 8;
canva.addEventListener("mousedown", function(e) {getCordinates(e);});

function getCordinates(e) {
    let rect = canva.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.floor(x / boardspaces);
    y = Math.floor(y / boardspaces);
    getIndex(x, y);
  }
  
  function getIndex(x, y) {
    let clickedIndex = x + y * 8;
    // console.log("postion", clickedIndex);
    getSquare(clickedIndex);
  }

function getSquare(index){
    playGame(index);
}

