function Queen(name, color) {
  Piece.call(this, name, color);
}
Queen.prototype = Object.assign({}, Piece.prototype);
Queen.prototype.validMoves = function (position, data) {
  var validPositions = [];
  var bishop_obj = new Bishop(TYPE.BISHOP, this.isWhite());
  var rook_obj = new Rook(TYPE.ROOK, this.isWhite());
  validPositions = validPositions.concat(bishop_obj.validMoves(position,data));
  validPositions = validPositions.concat(rook_obj.validMoves(position,data));
  return validPositions;
};
