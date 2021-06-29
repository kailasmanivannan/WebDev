function Bishop(name, color) {
  Piece.call(this, name, color);
}
Bishop.prototype = Object.assign({}, Piece.prototype);
Bishop.prototype.validMoves = function (position, data) {
  var validPositions = [];
  var curRow = Math.floor(position / BOARD.ROWS);
  var curpos = position;
  if (!this.isOnLeftEdge(position)) {
    validPositions = validPositions.concat(
      this.leftUppermoves(data, curRow, curpos)
    );
  }
  if (!this.isOnRightEdge(position)) {
    validPositions = validPositions.concat(
      this.rightUppermoves(data, curRow, curpos)
    );
  }
  curRow = 7 - curRow;
  if (!this.isOnRightEdge(position)) {
    validPositions = validPositions.concat(
      this.bottomRightmoves(data, curRow, curpos)
    );
  }
  if (!this.isOnLeftEdge(position)) {
    validPositions = validPositions.concat(
      this.bottomLeftmoves(data, curRow, curpos)
    );
  }
  return validPositions;
};
Bishop.prototype.leftUppermoves = function (spot, curRow, pos) {
  var moves = [];
  for (
    var i = 1, curpos = pos - 8;
    i <= curRow && (spot[curpos - i + 1] === null || !this.isSamecolor(spot[curpos - i + 1]));
    i++, curpos -= 8
  ) {
    //upper left part
    moves.push(curpos - i);
    if (this.isOnLeftEdge(curpos - i) || spot[curpos - i + 1] !== null) {
      break;
    }
  }
  return moves;
};
Bishop.prototype.rightUppermoves = function (spot, curRow, pos) {
  var moves = [];
  for (
    var i = 1, curpos = pos - 8;
    i <= curRow &&
    (spot[curpos + i + 1] === null || !this.isSamecolor(spot[curpos + i + 1]));
    i++, curpos -= 8
  ) {
    //upper right part
    moves.push(curpos + i);
    if (this.isOnRightEdge(curpos + i) || spot[curpos + i + 1] !== null) {
      break;
    }
  }
  return moves;
};
Bishop.prototype.bottomRightmoves = function (spot, curRow, pos) {
  var moves = [];
  for (
    var i = 1, curpos = pos + 8;
    i <= curRow &&
    (spot[curpos + i + 1] === null || !this.isSamecolor(spot[curpos + i + 1]));
    i++, curpos += 8
  ) {
    //bottom right part
    moves.push(curpos + i);
    if (this.isOnRightEdge(curpos + i) || spot[curpos + i + 1] !== null) {
      break;
    }
  }
  return moves;
};
Bishop.prototype.bottomLeftmoves = function (spot, curRow, pos) {
  var moves = [];
  for (
    var i = 1, curpos = pos + 8;
    i <= curRow &&
    (spot[curpos - i + 1] === null || !this.isSamecolor(spot[curpos - i + 1]));
    i++, curpos += 8
  ) {
    //bottom left part
    moves.push(curpos - i);
    if (this.isOnLeftEdge(curpos - i) || spot[curpos - i + 1] !== null) {
      break;
    }
  }
  return moves;
};
