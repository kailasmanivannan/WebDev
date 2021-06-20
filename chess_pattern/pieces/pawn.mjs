import { Piece } from "./piece.mjs";

export function Pawn(name, color) {
  Piece.call(this, name, color);
  var enPassant = false;
}
Pawn.prototype = Object.assign({}, Piece.prototype);
Pawn.prototype.validMoves = function (position, data) {
  var spot = data;
  var validPositions = [];
  if (this.isWhite()) {
    //white piece
    if (Math.floor(position / 8) === 6) {
      validPositions = this.whiteTwoMoves(position, spot);
    } else {
      validPositions = this.whiteOneMove(position, spot);
    }
  } else {
    //black piece
    if (Math.floor(position / 8) === 1) {
      validPositions = this.blackTwoMoves(position, spot);
    } else {
      validPositions = this.blackOneMove(position, spot);
    }
  }
  return validPositions;
};
Pawn.prototype.getEnpassant = function () {
   return this.enPassant;
};
Pawn.prototype.setEnpassant = function(setPassant){
  this.enPassant = setPassant;
}
Pawn.prototype.whiteTwoMoves = function (position, spot) {
  var temp,
    moves = [];
  temp = position - 8;
  if (spot[temp + 1] === null) {
    moves.push(temp);
  }
  temp = position - 16;
  if (spot[temp + 1] === null) {
    moves.push(temp);
  }
  if (position % 8 !== 0) {
    temp = position - 7;
    if (
      spot[temp + 1] !== null &&
      spot[temp + 1].isWhite() !== this.isWhite()
    ) {
      moves.push(temp);
    }
    // enpassant move
    if(Math.floor(position/8)===3&&(spot[position+1].getName()==="PAWN")){
      if(spot[position+1].getEnpassant()){
        moves.push(position+1);
      }
    }
  }
  if ((position + 1) % 8 !== 0) {
    temp = position - 9;
    if (
      spot[temp + 1] !== null &&
      spot[temp + 1].isWhite() !== this.isWhite()
    ) {
      moves.push(temp);
    }
    // en passant move
    if(Math.floor(position/8)===3&&(spot[position-1].getName()==="PAWN")){
      if(spot[position-1].getEnpassant()){
        moves.push(position-1);
      }
    }
    return moves;
  }
};
Pawn.prototype.whiteOneMove = function (position, spot) {
  var temp,
    moves = [];
  temp = position - 8;
  if (spot[temp + 1] === null) {
    moves.push(temp);
  }
  if (position % 8 !== 0) {
    temp = position - 7;
    if (
      spot[temp + 1] !== null &&
      spot[temp + 1].isWhite() !== this.isWhite()
    ) {
      moves.push(temp);
    }
  }
  if ((position + 1) % 8 !== 0) {
    temp = position - 9;
    if (
      spot[temp + 1] !== null &&
      spot[temp + 1].isWhite() !== this.isWhite()
    ) {
      moves.push(temp);
    }
  }
  return moves;
};
Pawn.prototype.blackTwoMoves = function (position, spot) {
  var temp,
    moves = [];
  temp = position + 8;
  if (spot[temp + 1] === null) {
    moves.push(temp);
  }
  temp = position + 16;
  if (spot[temp + 1] === null) {
    moves.push(temp);
  }
  if (position % 8 !== 0) {
    temp = position + 7;
    if (
      spot[temp + 1] !== null &&
      spot[temp + 1].isWhite() !== this.isWhite()
    ) {
      moves.push(temp);
    }
    //check en passant moves
  if(Math.floor(position/8)===4&&(spot[position+1].getName()==="PAWN")){
    if(spot[position+1].getEnpassant()){
      moves.push(position+1);
    }
  }
  }
  if ((position + 1) % 8 !== 0) {
    temp = position + 9;
    if (
      spot[temp + 1] !== null &&
      spot[temp + 1].isWhite() !== this.isWhite()
    ) {
      moves.push(temp);
    }
    // check en passant move
    if(Math.floor(position/8)===3&&(spot[position-1].getName()==="PAWN")){
      if(spot[position-1].getEnpassant()){
        moves.push(position-1);
      }
    }
  }
  return moves;
};
Pawn.prototype.blackOneMove = function (position, spot) {
  var temp,
    moves = [];
  temp = position + 8;
  if (spot[temp + 1] === null) {
    moves.push(temp);
  }
  if (position % 8 !== 0) {
    temp = position + 7;
    if (
      spot[temp + 1] !== null &&
      spot[temp + 1].isWhite() !== this.isWhite()
    ) {
      moves.push(temp);
    }
  }
  if ((position + 1) % 8 !== 0) {
    temp = position + 9;
    if (
      spot[temp + 1] !== null &&
      spot[temp + 1].isWhite() !== this.isWhite()
    ) {
      moves.push(temp);
    }
  }
  return moves;
};
