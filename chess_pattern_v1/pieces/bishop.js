function Bishop(name, color) {
  Piece.call(this, name, color);
}
Bishop.prototype = Object.assign({}, Piece.prototype);
Bishop.prototype.validMoves = function (position, data) {
  var validPositions = [];
  var curRow = Math.floor(position / BOARD.ROWS);
  var curpos = position;
  validPositions = validPositions.concat(
    this.leftUppermoves(data, curRow, curpos)
  );
  validPositions = validPositions.concat(
    this.rightUppermoves(data, curRow, curpos)
  );
  curRow = 7 - curRow;
  validPositions = validPositions.concat(
    this.bottomRightmoves(data, curRow, curpos)
  );
  validPositions = validPositions.concat(
    this.bottomLeftmoves(data, curRow, curpos)
  );
  return validPositions;
};
Bishop.prototype.leftUppermoves = function (spot, curRow, curpos) {
  var moves = [];
  for (var i = 1; i <= curRow; i++) {
    //upper left part
    curpos -= 8;
    if (spot[curpos - i + 1] === null) {
      moves.push(curpos - i);
      if (this.isOn_LeftEdge(curpos - i)) {
        break;
      }
    } else {
      if (!this.isSamecolor(spot[curpos - i + 1])) {
        moves.push(curpos - i);
      }
      break;
    }
  }
  return moves;
};
Bishop.prototype.rightUppermoves = function (spot, curRow, curpos) {
  var moves = [];
  for (var i = 1; i <= curRow; i++) {
    //upper right part
    curpos -= 8;
    if (spot[curpos + i + 1] === null) {
      moves.push(curpos + i);
      if (this.isOn_RightEdge(curpos + i)) {
        break;
      }
    } else {
      if (!this.isSamecolor(spot[curpos + i + 1])) {
        moves.push(curpos + i);
      }
      break;
    }
  }
  return moves;
};
Bishop.prototype.bottomRightmoves = function (spot, curRow, curpos) {
  var moves = [];
  for (var i = 1; i <= curRow; i++) {
    //bottom right part
    curpos += 8;
    if (spot[curpos + i + 1] === null) {
      moves.push(curpos + i);
      if (this.isOn_RightEdge(curpos + i)) {
        break;
      }
    } else {
      if (!this.isSamecolor(spot[curpos + i + 1])) {
        moves.push(curpos + i);
      }
      break;
    }
  }
  return moves;
};
Bishop.prototype.bottomLeftmoves = function (spot, curRow, curpos) {
  var moves = [];
  for (var i = 1; i <= curRow; i++) {
    //bottom left part
    curpos += 8;
    if (spot[curpos - i + 1] === null) {
      moves.push(curpos - i);
      if (this.isOn_LeftEdge(curpos - i)) {
        break;
      }
    } else {
      if (!this.isSamecolor(spot[curpos - i + 1])) {
        moves.push(curpos - i);
      }
      break;
    }
  }
  return moves;
};