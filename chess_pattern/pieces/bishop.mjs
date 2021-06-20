import { Piece } from "./piece.mjs";

export function Bishop(name, color) {
  Piece.call(this, name, color);
}
Bishop.prototype = Object.assign({}, Piece.prototype);
Bishop.prototype.validMoves = function (position,data) {
  var validPositions = [];
  var spot = data;
  var n = Math.floor(position / 8);
  var temp = position;
  validPositions = validPositions.concat(this.leftUppermoves(spot, n, temp));
  // console.log(this.leftUppermoves(spot, n, temp));
  validPositions = validPositions.concat(this.rightUppermoves(spot, n, temp));
  n = 7 - n;
  validPositions = validPositions.concat(this.bottomRightmoves(spot, n, temp));
  validPositions = validPositions.concat(this.bottomLeftmoves(spot, n, temp));
  return validPositions;
};

Bishop.prototype.leftUppermoves = function (spot, n, temp) {
  var moves = [];
  for (var i = 1; i <= n; i++) {
    //upper left part
    temp -= 8;
    if (spot[temp - i + 1] === null) {
      moves.push(temp - i);
      if ((temp - i) % 8 === 0){break};
    } else {
      if (spot[temp - i + 1].isWhite() !== this.isWhite()) {
        moves.push(temp - i);
      }
      break;
    }
  }
  return moves;
};
Bishop.prototype.rightUppermoves = function (spot, n, temp) {
  var moves = [];
  for (var i = 1; i <= n; i++) {
    //upper right part
    temp -= 8;
    if (spot[temp + i + 1] === null) {
      moves.push(temp + i);
      if ((temp + i + 1) % 8 === 0) {break};
    } else {
      if (spot[temp + i + 1].isWhite() !== this.isWhite()) {
        moves.push(temp + i);
      }
      break;
    }
  }
  return moves;
};
Bishop.prototype.bottomRightmoves = function (spot, n, temp) {
  var moves = [];
  for (var i = 1; i <= n; i++) {
    //bottom right part
    temp += 8;
    if (spot[temp + i + 1] === null) {
      moves.push(temp + i);
      if ((temp - i + 1) % 8 === 0){break};
    } else {
      if (spot[temp + i + 1].isWhite() !== this.isWhite()) {
        moves.push(temp + i);
      }
      break;
    }
  }
  return moves;
}
Bishop.prototype.bottomLeftmoves = function (spot, n, temp) {
  var moves = [];
  for (var i = 1; i <= n; i++) {
    //bottom left part
    temp += 8;
    if (spot[temp - i + 1] === null) {
      moves.push(temp - i);
      if ((temp - i) % 8 === 0){break};
    } else {
      if (spot[temp - i + 1].isWhite() !== this.isWhite()) {
        moves.push(temp - i);
      }
      break;
    }
  }
  return moves;
}
