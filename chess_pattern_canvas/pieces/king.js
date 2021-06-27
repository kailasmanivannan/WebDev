function King(name, color) {
  Piece.call(this, name, color);
  this.move = false;
}
King.prototype = Object.assign({}, Piece.prototype);
King.prototype.isMoved = function () {
  return this.move;
};
King.prototype.setMove = function () {
  this.move = true;
};
King.prototype.validMoves = function (position, data, status) {
  var validPositions = [];
  var spot = data;
  if (status === "CHECK") {
    validPositions = this.checkMoves(position, spot);
    return validPositions;
  }
  validPositions = this.calcMoves(position, spot);
  this.castleMoves(position, spot, status, validPositions);
  return validPositions;
};
King.prototype.checkMate = function (spot, kingId, checkId) {
  var kingMoves = this.validMoves(kingId, spot);
  var checkPiece = spot[checkId + 1];
  var ignoreCheckPiece = kingMoves.includes(checkId);
  var otherMoves = [],
    safePositon = false,
    cankill = false;
  for (var i = 1; i <= 64; i++) {
    if (ignoreCheckPiece) {
      spot[checkId + 1] = null;
    }
    if (spot[i] !== null) {
      if (!this.isSamecolor(spot[i])) {
        otherMoves = spot[i].validMoves(i - 1, spot);
        for (var j = 0; j < kingMoves.length; j++) {
          // console.log(spot[i],otherMoves);
          if (otherMoves.indexOf(kingMoves[j]) !== -1) {
            kingMoves.splice(j, 1);
          }
        }
        if (!ignoredMoves && kingMoves.length === 0) {
          safePositon = true;
          break;
        }
      }
    }
    spot[checkId + 1] = checkPiece;
  }
  if (ignoreCheckPiece) {
    var ignoredMoves = spot[checkId + 1].validMoves(checkId, spot);
    for (var i = 0; i < ignoredMoves.length; i++) {
      for (var j = 0; j < kingMoves.length; i++) {
        if (ignoredMoves.indexOf(kingMoves[j]) !== -1) {
          kingMoves.splice(j, 1);
        }
      }
    }
    if (kingMoves.length === 0) {
      safePositon = true;
    }
  }

  if (kingMoves.length !== 0 && ignoreCheckPiece) {
    return false;
  }
  cankill = this.canIkill([checkId], this.isWhite(), spot);
  // console.log("Kmoves",kingMoves);
  // console.log(safePositon, cankill);
  return safePositon && cankill;
};
King.prototype.calcMoves = function (position, spot) {
  var moves = [],
    movePos = position + 8; //bottom mid
  this.addIfInbound(movePos, spot, moves);
  movePos = position - 8; //top mid
  this.addIfInbound(movePos, spot, moves);
  movePos = position - 1; //mid left
  if (!this.isOnLeftEdge(position)) {
    this.addIfInbound(movePos, spot, moves);
  }
  movePos = position + 7; //bottom left corner
  if (!this.isOnLeftEdge(position)) {
    this.addIfInbound(movePos, spot, moves);
  }
  movePos = position - 9; //top left corner
  if (!this.isOnLeftEdge(position)) {
    this.addIfInbound(movePos, spot, moves);
  }
  movePos = position + 1; //mid right
  if (!this.isOnRightEdge(position)) {
    this.addIfInbound(movePos, spot, moves);
  }
  movePos = position - 7; //top right corner
  if (!this.isOnRightEdge(position)) {
    this.addIfInbound(movePos, spot, moves);
  }
  movePos = position + 9; //bottom right corner
  if (!this.isOnRightEdge(position)) {
    this.addIfInbound(movePos, spot, moves);
  }
  return moves;
};
King.prototype.addIfInbound = function (pos, spot, moves) {
  if (
    pos >= 0 &&
    pos <= 64 &&
    (spot[pos + 1] === null || !this.isSamecolor(spot[pos + 1]))
  ) {
    moves.push(pos);
  }
};
King.prototype.castleMoves = function (position, spot, status, validPositions) {
  var blackRook1 = spot[1];
  var blackRook2 = spot[8];
  var whiteRook1 = spot[57];
  var whiteRook2 = spot[64];
  var leftMoves = [position - 2, position - 1];
  var rightMoves = [position + 2, position + 1];
  if (status !== "CHECK" && !this.isWhite() && !this.isMoved()) {
    //black king castle
    if (
      spot[leftMoves[0] + 1] === null &&
      spot[leftMoves[1] + 1] === null &&
      blackRook1.getName() === "ROOK" &&
      !blackRook1.isMoved()
    ) {
      //left castle
      if (canICastle([2, 3], !this.isWhite(), spot)) {
        validPositions.push(leftMoves[0]);
      }
    }
    if (
      spot[rightMoves[0] + 1] === null &&
      spot[rightMoves[1] + 1] === null &&
      blackRook2.getName() === "ROOK" &&
      !blackRook2.isMoved()
    ) {
      //right castle
      if (canICastle([5, 6], !this.isWhite(), spot)) {
        validPositions.push(rightMoves[0]);
      }
    }
  } else if (status !== "CHECK" && this.isWhite() && !this.isMoved()) {
    //white king castle
    if (
      spot[leftMoves[0] + 1] === null &&
      spot[leftMoves[1] + 1] === null &&
      whiteRook1.getName() === "ROOK" &&
      !whiteRook1.isMoved()
    ) {
      //left castle
      if (canICastle([58, 59], !this.isWhite(), spot)) {
        validPositions.push(leftMoves[0]);
      }
    }
    if (
      spot[rightMoves[0] + 1] === null &&
      spot[rightMoves[1] + 1] === null &&
      whiteRook2.getName() === "ROOK" &&
      !whiteRook2.isMoved()
    ) {
      //right castle
      if (canICastle([61, 62], !this.isWhite(), spot)) {
        validPositions.push(rightMoves[0]);
      }
    }
  }
};
King.prototype.checkMoves = function (position, spot) {
  var kingMoves = this.validMoves(position, spot);
  for (var i = 1; i <= 64; i++) {
    if (spot[i] !== null) {
      if (!this.isSamecolor(spot[i])) {
        otherMoves = spot[i].validMoves(i - 1, spot);
        for (var j = 0; j < kingMoves.length; j++) {
          if (otherMoves.indexOf(kingMoves[j]) !== -1) {
            kingMoves.splice(j, 1);
          }
        }
      }
    }
  }
  return kingMoves;
};
function canICastle(moves, color, spot) {
  var otherMoves = [];
  //check if can attack
  for (var i = 1; i <= 64; i++) {
    if (spot[i] !== null && spot[i].isWhite() === color) {
      otherMoves = spot[i].validMoves(i - 1, spot);
      for (var j = 0; j < moves.length; j++) {
        if (otherMoves.indexOf(moves[j]) !== -1) {
          return false;
        }
      }
    }
  }
  return true;
}
King.prototype.canIkill = function (moves, color, spot) {
  for (var i = 1; i <= 64; i++) {
    if (
      spot[i] !== null &&
      spot[i].isWhite() === color &&
      spot[i].getName() !== "KING"
    ) {
      otherMoves = spot[i].validMoves(i - 1, spot);
      for (var j = 0; j < moves.length; j++) {
        if (otherMoves.indexOf(moves[j]) !== -1) {
          return false;
        }
      }
    }
  }
  return true;
};
