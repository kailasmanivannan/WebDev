function King(name, color) {
  Piece.call(this, name, color);
  this.move = false;
}
King.prototype = Object.assign({}, Piece.prototype);
King.prototype.isMoved = function () {
  return this.move;
};
King.prototype.setMove = function () {
  this.move = true;
};
King.prototype.validMoves = function (position, data) {
  var validPositions = [];
  var spot = data;
  validPositions = this.calcMoves(position, spot);
  return validPositions;
};
King.prototype.checkMate = function (spot, kingId) {
  // white king to be checked for mate
  var kingMoves = this.validMoves(kingId, spot);
  if (kingMoves.length === 0) {
    return false;
  }
  var otherMoves = [];
  for (var i = 1; i <= 64; i++) {
    if (spot[i] !== null) {
      if (!this.isSamecolor(spot[i])) {
        otherMoves = spot[i].validMoves(i - 1, spot);
        for (var j = 0; j < kingMoves.length; j++) {
          if (otherMoves.indexOf(kingMoves[j]) !== -1) {
            kingMoves.splice(j, 1);
          }
        }
        if (kingMoves.length === 0) {
          return true;
        }
      }
    }
  }
  return false;
};
King.prototype.calcMoves = function (position, spot) {
  var moves = [],
    movePos = position + 8; //bottom mid
  this._addIfInbound(movePos, spot, moves);
  movePos = position - 8; //top mid
  this._addIfInbound(movePos, spot, moves);
  movePos = position - 1; //mid left
  if (!this.isOn_LeftEdge(position)) {
    this._addIfInbound(movePos, spot, moves);
  }
  movePos = position + 7; //bottom left corner
  if (!this.isOn_LeftEdge(position)) {
    this._addIfInbound(movePos, spot, moves);
  }
  movePos = position - 9; //top left corner
  if (!this.isOn_LeftEdge(position)) {
    this._addIfInbound(movePos, spot, moves);
  }
  movePos = position + 1; //mid right
  if (!this.isOn_RightEdge(position)) {
    this._addIfInbound(movePos, spot, moves);
  }
  movePos = position - 7; //top right corner
  if (!this.isOn_RightEdge(position)) {
    this._addIfInbound(movePos, spot, moves);
  }
  movePos = position + 9; //bottom right corner
  if (!this.isOn_RightEdge(position)) {
    this._addIfInbound(movePos, spot, moves);
  }
  // castling positions
  if (!this.isMoved()) {
    if (Math.floor(position / BOARD.ROWS) === 0) {
      //black king
      if (spot[position + 2] === null) {
        moves.push(movePos);
      }
      if (spot[position - 2] === null) {
        moves.push(movePos);
      }
    } else if (Math.floor(position / BOARD.ROWS) === 7) {
      //white king
      if (spot[position + 2] === null) {
        moves.push(movePos);
      }
      if (spot[position - 2] === null) {
        moves.push(movePos);
      }
    }
  }
  return moves;
};
King.prototype._addIfInbound = function (pos, spot, moves) {
  if (
    pos >= 0 &&
    pos <= 64 &&
    (spot[pos + 1] === null || !this.isSamecolor(spot[pos + 1]))
  ) {
    moves.push(pos);
  }
};
