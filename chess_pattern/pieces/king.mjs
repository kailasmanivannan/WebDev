import { Piece } from "./piece.mjs";

export function King(name, color) {
  Piece.call(this, name, color);
  var ismove = false;
}
King.prototype = Object.assign({}, Piece.prototype);
King.prototype.didMove = function () {
  return this.ismove;
};
King.prototype.itMoved = function () {
  this.ismove = true;
};
King.prototype.validMoves = function (position, data) {
  var validPositions = [];
  var spot = data;
  if (position % 8 === 0) {
    validPositions = this.leftEdgeMoves(position, spot);
  } else if ((position + 1) % 8 === 0) {
    validPositions = this.rightEdgeMoves(position, spot);
  } else {
    validPositions = this.noEdge(position, spot);

  }
  return validPositions;
};
King.prototype.checkMate = function (spot, kingId, color) {
  if (color) {
    // white king to be checked for mate
    var kingMoves = this.validMoves(kingId, spot);
    if (kingMoves.length === 0) {
      return false;
    }
    var otherMoves = [];
    for (var i = 1; i <= 64; i++) {
      if (spot[i] !== null) {
        if (!spot[i].isWhite()) {
          otherMoves = spot[i].validMoves(i-1,spot);
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
  } else {
    //black king to be checked
    var kingMoves = this.validMoves(kingId, spot);
    if (kingMoves.length === 0) {
      return false;
    }
    var otherMoves = [];
    for (var i = 1; i <= 64; i++) {
      if (spot[i] !== null) {
        if (spot[i].isWhite()) {
          otherMoves = spot[i].validMoves(i-1,spot);
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
  }
};
King.prototype.leftEdgeMoves = function (position, spot) {
  var moves = [],
    temp;
  temp = position + 8; //bottom mid
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 8; //top mid
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 1; //mid right
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 7; //top right corner
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 9; //bottom right corner
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  return moves;
};
King.prototype.rightEdgeMoves = function (position, spot) {
  var moves = [],
    temp;
  temp = position + 8; //bottom mid
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 8; //top mid
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 1; //mid left
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 7; //bottom left corner
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 9; //top left corner
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  return moves;
};
King.prototype.noEdge = function (position, spot) {
  var moves = [],
    temp;
  temp = position + 8; //bottom mid
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 8; //top mid
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 1; //mid left
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 7; //bottom left corner
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 9; //top left corner
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 1; //mid right
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 7; //top right corner
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 9; //bottom right corner
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  // castling positions
  if(!this.didMove()){
    if(Math.floor(position/8)===0){
      //black king
      temp = position+2;
      if(spot[temp + 1]===null){moves.push(temp);}
      temp = position-2;
      if(spot[temp + 1]===null){moves.push(temp);}
    }
    else if(Math.floor(position/8)===7){
      //white king
      temp = position+2;
      if(spot[temp + 1]===null){moves.push(temp);}
      temp = position-2;
      if(spot[temp + 1]===null){moves.push(temp);}
    }
  }
  return moves;
};
