function Knight(name, color) {
  Piece.call(this, name, color);
}
Knight.prototype = Object.assign({}, Piece.prototype);
Knight.prototype.validMoves = function (position, data) {
  var validPositions = [];
  var spot = data;
  validPositions = this.calcMoves(spot, position);
  return validPositions;
};
Knight.prototype.calcMoves = function (spot, position) {
  var movePos,
    moves = [];
  movePos = position - 15; //top right
  if (!this.isOnRightEdge(position)) {
    King.prototype.addIfInbound.call(this, movePos, spot, moves);
  }
  movePos = position - 17; //top left
  if (!this.isOnLeftEdge(position)) {
    King.prototype.addIfInbound.call(this, movePos, spot, moves);
  }
  movePos = position + 15; //bottom left;
  if (!this.isOnLeftEdge(position)) {
    King.prototype.addIfInbound.call(this, movePos, spot, moves);
  }
  movePos = position + 17; //bottom right;
  if (!this.isOnRightEdge(position)) {
    King.prototype.addIfInbound.call(this, movePos, spot, moves);
  }
  movePos = position - 10; //left upper positions;
  if (!this.isOnLeftEdge(position) && !this.isOnLeftEdge(position - 1)) {
    King.prototype.addIfInbound.call(this, movePos, spot, moves);
  }
  movePos = position + 6; //left lower position
  if (!this.isOnLeftEdge(position) && !this.isOnLeftEdge(position - 1)) {
    King.prototype.addIfInbound.call(this, movePos, spot, moves);
  }
  movePos = position + 10; //right lower positions;
  if (!this.isOnRightEdge(position) && !this.isOnRightEdge(position + 1)) {
    King.prototype.addIfInbound.call(this, movePos, spot, moves);
  }
  movePos = position - 6; //right uppper position
  if (!this.isOnRightEdge(position) && !this.isOnRightEdge(position + 1)) {
    King.prototype.addIfInbound.call(this, movePos, spot, moves);
  }
  return moves;
};
