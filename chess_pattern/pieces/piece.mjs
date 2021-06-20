export function Piece(name, color) {
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
