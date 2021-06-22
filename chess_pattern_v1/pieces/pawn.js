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
  var movePos,
    moves = [];
  this.isWhite() ? (movePos = position - 8) : (movePos = position + 8);
  if (spot[movePos + 1] === null) {
    moves.push(movePos);
  }
  
  //if first move then two moves
  if (this.isWhite() && Math.floor(position / BOARD.ROWS) === 6) {
    movePos = position - 16;
    moves.push(movePos);
  } else if (!this.isWhite() && Math.floor(position / BOARD.ROWS) === 1) {
    movePos = position + 16;
    moves.push(movePos);
  }

  if (!this.isOn_LeftEdge(position)) {
    this.isWhite() ? (movePos = position - 7) : (movePos = position + 7);
    if (spot[movePos + 1] !== null && !this.isSamecolor(spot[movePos + 1])) {
      moves.push(movePos);
    }
    //enpassant move
    if (
      (Math.floor(position / BOARD.ROWS) === 3 ||
        Math.floor(position / BOARD.ROWS) === 4) &&
      spot[position + 1].getName() === TYPE.PAWN &&
      spot[position + 1].getEnpassant()
    ) {
      moves.push(position + 1);
    }
  }
  if (!this.isOn_RightEdge(position)) {
    this.isWhite() ? (movePos = position - 9) : (movePos = position + 9);
    if (spot[movePos + 1] !== null && !this.isSamecolor(spot[movePos + 1])) {
      moves.push(movePos);
    }
    // en passant move
    if (
      (Math.floor(position / BOARD.ROWS) === 3 ||
        Math.floor(position / BOARD.ROWS) === 4) &&
      spot[position + 1].getName() === TYPE.PAWN &&
      spot[position + 1].getEnpassant()
    ) {
      moves.push(position - 1);
    }
  }
  return moves;
};