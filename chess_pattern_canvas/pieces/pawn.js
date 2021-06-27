function Pawn(name, color) {
  Piece.call(this, name, color);
  this.enPassant = false;
}
Pawn.prototype = Object.assign({}, Piece.prototype);
Pawn.prototype.validMoves = function (position, data) {
  var validPositions = this.calcMoves(position, data);
  return validPositions;
};
Pawn.prototype.getEnpassant = function () {
  return this.enPassant;
};
Pawn.prototype.setEnpassant = function (setPassant) {
  this.enPassant = setPassant;
};
Pawn.prototype.calcMoves = function (position, spot) {
  var moves = [];
  this.oneMove(position, spot, moves);
  this.twoMove(position, spot, moves);
  this.leftCrossMove(position, spot, moves);
  this.rightCrossMove(position, spot, moves);
  this.calcEnpassant(position, spot, moves);
  return moves;
};
Pawn.prototype.oneMove = function (position, spot, moves) {
  var movePos = this.isWhite() ? position - 8 : position + 8;
  var spotId = movePos + 1;
  if (spot[spotId] === null) {
    moves.push(movePos);
  }
};
Pawn.prototype.twoMove = function (position, spot, moves) {
  var movePos;
  if (this.isWhite() && Math.floor(position / BOARD.ROWS) === 6) {
    movePos = position - 16;
    if (spot[movePos + 1] !== null ) {
      return;
    }
    moves.push(movePos);
  } else if (!this.isWhite() && Math.floor(position / BOARD.ROWS) === 1) {
    movePos = position + 16;
    if (spot[movePos + 1] !== null ) {
      return;
    }
    moves.push(movePos);
  }
};
Pawn.prototype.leftCrossMove = function (position, spot, moves) {
  var movePos;
  if (!this.isOnLeftEdge(position)) {
    movePos = this.isWhite() ? position - 9 : position + 7;
    var spotId = movePos + 1;
    if (spot[spotId] !== null && !this.isSamecolor(spot[spotId])) {
      moves.push(movePos);
    }
    movePos = position - 1;
  }
};
Pawn.prototype.rightCrossMove = function (position, spot, moves) {
  var movePos;
  if (!this.isOnRightEdge(position)) {
    movePos = this.isWhite() ? position - 7 : position + 9;
    var spotId = movePos + 1;
    if (spot[spotId] !== null && !this.isSamecolor(spot[spotId])) {
      moves.push(movePos);
    }
    movePos = position + 1;
  }
};
Pawn.prototype.calcEnpassant = function (position, spot, moves) {
  if (this.isWhite() && Math.floor(position / 8) === 3) {
    if (
      !this.isOnLeftEdge(position) &&
      spot[position] !== null &&
      spot[position].getName() === TYPE.PAWN &&
      !this.isSamecolor(spot[position]) &&
      spot[position].getEnpassant()
    ) {
      moves.push(position - 1);
    }
    if (
      !this.isOnRightEdge(position) &&
      spot[position + 2] !== null &&
      spot[position + 2].getName() === TYPE.PAWN &&
      !this.isSamecolor(spot[position + 2]) &&
      spot[position + 2].getEnpassant()
    ) {
      moves.push(position + 1);
    }
  } else if (!this.isWhite() && Math.floor(position / 8) === 4) {
    if (
      !this.isOnLeftEdge(position) &&
      spot[position - 1 + 1] !== null &&
      spot[position - 1 + 1].getName() === TYPE.PAWN &&
      !this.isSamecolor(spot[position]) &&
      spot[position].getEnpassant()
    ) {
      moves.push(position - 1);
    }
    if (
      !this.isOnRightEdge(position) &&
      spot[position + 2] !== null &&
      spot[position + 2].getName() === TYPE.PAWN &&
      !this.isSamecolor(spot[position + 2]) &&
      spot[position + 2].getEnpassant()
    ) {
      moves.push(position + 1);
    }
  }
};
