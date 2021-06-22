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
  if (!this.isOn_RightEdge(position)) {
    this._addIfInBound(movePos, spot, moves);
  }
  movePos = position - 17; //top left
  if (!this.isOn_LeftEdge(position)) {
    this._addIfInBound(movePos, spot, moves);
  }
  movePos = position + 15; //bottom left;
  if (!this.isOn_LeftEdge(position)) {
    this._addIfInBound(movePos, spot, moves);
  }
  movePos = position + 17; //bottom right;
  if (!this.isOn_RightEdge(position)) {
    this._addIfInBound(movePos, spot, moves);
  }
  movePos = position - 10; //left upper positions;
  if (!this.isOn_LeftEdge(position) && !this.isOn_LeftEdge(position - 1)) {
    this._addIfInBound(movePos, spot, moves);
  }
  movePos = position + 6; //left lower position
  if (!this.isOn_LeftEdge(position) && !this.isOn_LeftEdge(position - 1)) {
    this._addIfInBound(movePos, spot, moves);
  }
  movePos = position + 10; //right lower positions;
  if (!this.isOn_RightEdge(position) && !this.isOn_RightEdge(position + 1)) {
    this._addIfInBound(movePos, spot, moves);
  }
  movePos = position - 6; //right uppper position
  if (!this.isOn_RightEdge(position) && !this.isOn_RightEdge(position + 1)) {
    this._addIfInBound(movePos, spot, moves);
  }
  return moves;
};
Knight.prototype._addIfInBound = function (pos, spot, moves) {
  if (
    pos >= 0 &&
    pos <= 64 &&
    (spot[pos + 1] === null || !this.isSamecolor(spot[pos + 1]))
  ) {
    moves.push(pos);
  }
};