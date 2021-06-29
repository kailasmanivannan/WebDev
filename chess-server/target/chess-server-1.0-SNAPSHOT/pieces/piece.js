function Piece(name, color) {
  this.pieceName = name;
  this.white = color;
}
Piece.prototype.getName = function () {
  return this.pieceName;
};
Piece.prototype.isWhite = function () {
  return this.white;
};
Piece.prototype.setWhite = function (color) {
  this.white = true;
};
Piece.prototype.setName = function (name) {
  this.pieceName = name;
};
Piece.prototype.isSamecolor = function (piece) {
  return this.isWhite() === piece.isWhite();
};
Piece.prototype.isOnLeftEdge = function (pos) {
  return pos % BOARD.ROWS === 0;
};
Piece.prototype.isOnRightEdge = function (pos) {
  return (pos + 1) % BOARD.ROWS === 0;
};
