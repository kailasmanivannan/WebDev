import { Piece } from "./piece.mjs";

export function Rook(name,color) {
    Piece.call(this,name,color);
    var ismove = false;
}
Rook.prototype = Object.assign({},Piece.prototype);
Rook.prototype.didMove = function(){
    return this.ismove;
}
Rook.prototype.itMoved = function(){
  this.ismove = true; 
}
Rook.prototype.validMoves = function(position,data){
  var spot = data;
  var validPositions = [];
  var curpos = Math.floor(position / 8);
  var left = curpos * 8;
  var right = (curpos + 1) * 8;
  var i = position - 1;
  var j = position + 1;
  validPositions = validPositions.concat(this.validUpMoves(curpos,position,spot));
  validPositions = validPositions.concat(this.validDownMoves(curpos,position,spot));
  validPositions = validPositions.concat(this.validSideMoves(i,j,left,right,spot));
  return validPositions;
}

Rook.prototype.validUpMoves = function(curpos,temp,spot){
  var moves = [],i;
  for (i = 0; i < curpos; i++) {
    temp -= 8;
    if(spot[temp+1]===null){
      moves.push(temp);
    }
    else{
      if (spot[temp+1].isWhite() !== this.isWhite()) {
        moves.push(temp);
      }
      break;
    }
  }
  return moves;
}
Rook.prototype.validDownMoves = function(curpos,temp,spot){
  var moves =[],i;
  for (i = curpos; i < 7; i++) {
    temp += 8;
    if(spot[temp+1]===null){
      moves.push(temp);
    }
    else{
      if (spot[temp+1].isWhite() !== this.isWhite()) {
        moves.push(temp);
      }
      break;
    }
  }
  return moves;
}
Rook.prototype.validSideMoves = function(fi,fj,fleft,fright,spot){
  var i=fi,j=fj,left=fleft,right=fright;
  var moves =[];
  while (i >= left) {
    if(spot[i+1]===null){
      moves.push(i);
    }
    else{
      if (spot[i+1].isWhite() !== this.isWhite()) {
        moves.push(i);
      }
      break;
    }
    i--;
  }
  while (j < right) {
    if(spot[j+1]===null){
      moves.push(j);
    }
    else{
      if (spot[j+1].isWhite() !== this.isWhite()) {
        moves.push(j);
      }
      break;
    }
    j++;
  }
  return moves;
}

