function Queen(name, color) {
  Piece.call(this, name, color);
}
Queen.prototype = Object.assign({}, Piece.prototype);
Queen.prototype.validMoves = function (position,data) {
  var validPositions = [];
  validPositions = validPositions.concat(Bishop.prototype.validMoves.call(this,position,data));
  validPositions = validPositions.concat(Rook.prototype.validMoves.call(this,position,data));
  return validPositions;
};
