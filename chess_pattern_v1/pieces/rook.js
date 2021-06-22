function Rook(name,color) {
    Piece.call(this,name,color);
    this.move = false;
}
Rook.prototype = Object.assign({},Piece.prototype);
Rook.prototype.isMoved = function(){
    return this.move;
}
Rook.prototype.setMove= function(){
  this.move = true; 
}
Rook.prototype.validMoves = function(position,data){
  var validPositions = [];
  var curpos = Math.floor(position / 8);
  var leftPos = curpos * 8;
  var rightPos = (curpos + 1) * 8;
  var leftMovePos = position - 1;
  var rightMovePos = position + 1;
  validPositions = validPositions.concat(this.validUpMoves(curpos,position,data));
  validPositions = validPositions.concat(this.validDownMoves(curpos,position,data));
  validPositions = validPositions.concat(this.validSideMoves(leftMovePos,rightMovePos,leftPos,rightPos,data));
  return validPositions;
}

Rook.prototype.validUpMoves = function(curpos,movePos,spot){
  var moves = [],i;
  for (i = 0; i < curpos; i++) {
    movePos -= 8;
    if(spot[movePos+1]===null){
      moves.push(movePos);
    }
    else{
      if (!this.isSamecolor(spot[movePos+1])) {
        moves.push(movePos);
      }
      break;
    }
  }
  return moves;
}
Rook.prototype.validDownMoves = function(curpos,movePos,spot){
  var moves =[],i;
  for (i = curpos; i < 7; i++) {
    movePos += 8;
    if(spot[movePos+1]===null){
      moves.push(movePos);
    }
    else{
      if (!this.isSamecolor(spot[movePos+1])) {
        moves.push(movePos);
      }
      break;
    }
  }
  return moves;
}
Rook.prototype.validSideMoves = function(leftMovePos,rightMovePos,leftPos,rightPos,spot){
  var moves =[];
  while (leftMovePos >= leftPos) {
    if(spot[leftMovePos+1]===null){
      moves.push(leftMovePos);
    }
    else{
      if (!this.isSamecolor(spot[movePos+1])) {
        moves.push(leftMovePos);
      }
      break;
    }
    leftMovePos--;
  }
  while (rightMovePos < rightPos) {
    if(spot[rightMovePos+1]===null){
      moves.push(rightMovePos);
    }
    else{
      if (!this.isSamecolor(spot[movePos+1])) {
        moves.push(rightMovePos);
      }
      break;
    }
    rightMovePos++;
  }
  return moves;
}

