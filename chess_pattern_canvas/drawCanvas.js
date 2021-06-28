var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var data;
function getXY(n) {
  let y = Math.floor(n / 8);
  let x = n - 8 * y;
  return { X: x, Y: y };
}

var drawBoard = function () {
  data = boardData.getBoard();
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      context.fillStyle = (i + j) % 2 == 0 ? "white" : "gray";
      let x_coordinate = 0 + j * 90;
      let y_coorodinate = 0 + i * 90;
      context.fillRect(x_coordinate, y_coorodinate, 90, 90);
    }
  }
  context.font = "80px Georgia";
  context.fillStyle = "black";
  for (var i = 1; i <= 64; i++) {
    if (data[i] !== null) {
      var color = data[i].isWhite();
      var name = data[i].getName();
      var piece = getImgPath(color, name);
      var cords = getXY(i - 1);
      context.fillText(piece, cords.X * 90, (cords.Y + 1) * 90 - 10);
    }
  }
};

drawBoard();

var drawHighlight = function () {
  context.globalAlpha = 0.5;
  data = boardData.getBoard();
  var highlightPos = boardData.getHighlight();
  if (highlightPos.length === 0) {
    return;
  }
  var highlightColor;
  for (var i = 0; i < highlightPos.length - 1; i++) {
    highlightColor = data[highlightPos[i] + 1] === null ? "#1FF51B" : "red";
    context.fillStyle = highlightColor;
    var cords = getXY(highlightPos[i]);
    context.clearRect(cords.X * 90, cords.Y * 90, 90, 90);
    context.fillRect(cords.X * 90, cords.Y * 90, 90, 90);
  }
  context.fillStyle = "#1FF51B";
  var cords = getXY(highlightPos[highlightPos.length - 1]);
  context.clearRect(cords.X * 90, cords.y * 90, 90, 90);
  context.fillRect(cords.X * 90, cords.Y * 90, 90, 90);
  context.globalAlpha = 1.0;
};