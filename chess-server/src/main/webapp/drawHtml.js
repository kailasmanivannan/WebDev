var doc = document.getElementById("chessboard");
var data;

function createBoxElement(styleClass,piece,i) {
  var newDiv = document.createElement("div");
  newDiv.classList.add("box",styleClass); 
  newDiv.innerText = piece;
  newDiv.setAttribute("id", i);
  newDiv.addEventListener('click',function () {
    playGame(this.id - 1);
  });
  return newDiv;
}

var drawBoard = function () {
  doc.innerHTML = " ";
  data = boardData.getBoard();
  var colorA = "white",
    colorB = "black";
  for (var i = 1; i <= 64; i++) {
    var styleClass = i & 1 ? colorA : colorB;
    var piece = " ";
    if (data[i] !== null) {
      var color = data[i].isWhite();
      var name = data[i].getName();
      piece = getImgPath(color, name);
    }
    var boxEle = createBoxElement(styleClass,piece,i);
    doc.appendChild(boxEle);
    if (i % 8 === 0) {
      var swap = colorA;
      colorA = colorB;
      colorB = swap;
    }
  }
};

drawBoard();

var highlightBox = function () {
  data = boardData.getBoard();
  var highlightPos = boardData.getHighlight();
  if (highlightPos.length === 0) {
    return;
  }
  var highlightColor;
  for (var i = 0; i < highlightPos.length - 1; i++) {
    highlightColor = data[highlightPos[i] + 1] === null ? "#1FF51B" : "red";
    document.getElementById(highlightPos[i] + 1).style.background =
      highlightColor;
  }
  document.getElementById(highlightPos[highlightPos.length-1]+1).style.background = "#1FF51B";
};
