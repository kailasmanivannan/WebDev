function Rook(name, color) {
  Piece.call(this, name, color);
  this.move = false;
}
Rook.prototype = Object.assign({}, Piece.prototype);
Rook.prototype.isMoved = function () {
  return this.move;
};
Rook.prototype.setMove = function () {
  this.move = true;
};
Rook.prototype.validMoves = function (position, data) {
  var validPositions = [];
  var curpos = Math.floor(position / 8);
  var leftPos = curpos * 8;
  var rightPos = (curpos + 1) * 8;
  var leftMovePos = position - 1;
  var rightMovePos = position + 1;
  validPositions = validPositions.concat(
    this.validUpMoves(curpos, position, data)
  );
  validPositions = validPositions.concat(
    this.validDownMoves(curpos, position, data)
  );
  validPositions = validPositions.concat(
    this.validSideMoves(leftMovePos, rightMovePos, leftPos, rightPos, data)
  );
  return validPositions;
};

Rook.prototype.validUpMoves = function (curpos, movePos, spot) {
  var moves = [],
    i;
  for (
    i = 0, movePos -= 8;
    i < curpos &&
    (spot[movePos + 1] === null || !this.isSamecolor(spot[movePos + 1]));
    i++, movePos -= 8
  ) {
    moves.push(movePos);
    if (spot[movePos + 1] !== null) {
      break;
    }
  }
  return moves;
};
Rook.prototype.validDownMoves = function (curpos, movePos, spot) {
  var moves = [],
    i;
  for (
    i = curpos, movePos += 8;
    i < 7 &&
    (spot[movePos + 1] === null || !this.isSamecolor(spot[movePos + 1]));
    i++, movePos += 8
  ) {
    moves.push(movePos);
    if (spot[movePos + 1] !== null) {
      break;
    }
  }
  return moves;
};
Rook.prototype.validSideMoves = function (
  leftMovePos,
  rightMovePos,
  leftPos,
  rightPos,
  spot
) {
  var moves = [];
  while (
    leftMovePos >= leftPos &&
    (spot[leftMovePos + 1] === null || !this.isSamecolor(spot[leftMovePos + 1]))
  ) {
    moves.push(leftMovePos);
    if (spot[leftMovePos + 1] !== null) {
      break;
    }
    leftMovePos--;
  }
  while (
    rightMovePos < rightPos &&
    (spot[rightMovePos + 1] === null || !this.isSamecolor(spot[rightMovePos + 1]))
  ) {
    moves.push(rightMovePos);
    if (spot[rightMovePos + 1] !== null) {
      break;
    }
    rightMovePos++;
  }
  return moves;
};