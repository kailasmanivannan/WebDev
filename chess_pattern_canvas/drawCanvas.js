var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var data;
var IMGPATH = {
  false: {
    ROOK: "♜",
    BISHOP: "♝",
    KING: "♚",
    KNIGHT: "♞	",
    QUEEN: "♛",
    PAWN: "♟︎	",
  },
  true: {
    ROOK: "♖",
    BISHOP: "♗",
    KING: "♔",
    KNIGHT: "♘",
    QUEEN: "♕",
    PAWN: "♙",
  },
};

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
      var [xcord, ycord] = getAB(i - 1);
      context.fillText(piece, xcord * 90, (ycord + 1) * 90 - 10);
    }
  }
};

drawBoard();

var drawHighlight = function () {
  data = boardData.getBoard();
  var highlightPos = boardData.getHighlight();
  if (highlightPos.length === 0) {
    return;
  }
  var highlightColor;
  for (var i = 0; i < highlightPos.length - 1; i++) {
    highlightColor = data[highlightPos[i] + 1] === null ? "#1FF51B" : "red";
    context.fillStyle = highlightColor;
    var [x, y] = getAB(highlightPos[i]);
    context.clearRect(x * 90, y * 90, 90, 90);
    context.fillRect(x * 90, y * 90, 90, 90);
  }
  context.fillStyle ="#1FF51B" ;
  var [x, y] = getAB(highlightPos[highlightPos.length-1]);
  context.clearRect(x * 90, y * 90, 90, 90);
  context.fillRect(x * 90, y * 90, 90, 90);

};

function getAB(n) {
  let y = Math.floor(n / 8);
  let x = n - 8 * y;
  return [x, y];
}

function getImgPath(color, name) {
  var path = color ? IMGPATH.true : IMGPATH.false;
  switch (name) {
    case TYPE.ROOK:
      return path.ROOK;
    case TYPE.PAWN:
      return path.PAWN;
    case TYPE.QUEEN:
      return path.QUEEN;
    case TYPE.BISHOP:
      return path.BISHOP;
    case TYPE.KING:
      return path.KING;
    case TYPE.KNIGHT:
      return path.KNIGHT;
  }
}
