var gameData = {
  currentPlayer: null,
  isPieceSet: null,
  currentPiece: null,
  spot: null,
  moves: null,
  oldIndex: null,
  status: null,
};
var STATUS = {
  NOTHING: "NOTHING",
  CHECK: "CHECK",
  CHECKMATE: "CHECKMATE",
};
function initGame() {
  gameData.currentPlayer = true; //true for white ;false for black
  gameData.isPieceSet = false;
  gameData.spot = boardData.getBoard();
  gameData.moves = [];
  gameData.status = STATUS.NOTHING;
}
initGame();
function playGame(index) {
  gameData.spot = boardData.getBoard();
  if (gameData.currentPlayer) {
    if (!gameData.isPieceSet) {
      gameData.currentPiece = gameData.spot[index + 1];
      if (gameData.currentPiece.isWhite()) {
        gameData.moves = gameData.currentPiece.validMoves(index, gameData.spot);
        boardData.setHighlight(moves);
        //render the highlighted positions
        gameData.oldIndex = index;
        gameData.isPieceSet = true;
        return;
      } else {
        // not a white piece select a white piece;
      }
    } else {
      var canIMove = gameData.moves.includes(index);
      if (canIMove) {
        doMove(index);
      } else {
        gameData.isPieceSet = false;
        return;
      }
      boardData.setHighlight([]);
    }
  } else {
    //black
    if (!gameData.isPieceSet) {
      gameData.currentPiece = gameData.spot[index + 1];
      if (!gameData.currentPiece.isWhite()) {
        gameData.moves = gameData.currentPiece.validMoves(index, gameData.spot);
        boardData.setHighlight(moves);
        //render the highlighted positions
        gameData.oldIndex = index;
        gameData.isPieceSet = true;
        return;
      } else {
        // not a black piece select a black piece;
      }
    } else {
      var canIMove = gameData.moves.includes(index);
      if (canIMove) {
        doMove(index);
      } else {
        gameData.isPieceSet = false;
        return;
      }
      boardData.setHighlight([]);
    }
  }
}
var GameStatus = {
  checkStatus: function (player, id) {
    //check if black king is in check
    var pos;
    player ? (pos = getking(false)) : (pos = getking(true));
    pos = getking(false);
    var list = gameData.spot[id + 1].validMoves(id, gameData.spot);
    if (list.includes(pos)) {
      //king in check
      gameData.status = STATUS.CHECK;
    } else {
      gameData.status = STATUS.NOTHING;
    }
  },
  getStatus: function () {
    return gameData.status;
  },
  resetGame: function () {
    initGame(); // reset game data
    boardData.reset(); // reset board data
    //render and exit
    return;
  },
  checkMate: function (player) {
    // true , so white is current player check if black king in checkmate
    //else false , so black is current player check if white king in checkmate
    var pos;
    player ? (pos = getking(false)) : (pos = getking(true));
    var result = gameData.spot[pos + 1].checkMate(spot, pos);
    if (result) {
      if (player) {
        return { report: STATUS.CHECKMATE, winner: true };
      } else {
        return { report: STATUS.CHECKMATE, winner: false };
      }
    } else {
      return false;
    }
  },
};
function getking(color) {
  //true search for white king
  //false search for black king
  for (var i = 1; i <= 64; i++) {
    if (gameData.spot[i].pieceName === TYPE.KING && spot[i].isWhite() === color)
      return i;
  }
}
function castleCheck(position, kingPiece) {
  var blackRook1 = gameData.spot[1];
  var blackRook2 = gameData.spot[8];
  var whiteRook1 = gameData.spot[57];
  var whiteRook2 = gameData.spot[64];
  var blacklongCastle = 2;
  var whitelongCastle = 2;
  if (GameStatus.getStatus() === STATUS.CHECK) {
    return false;
  }
  if (kingPiece.isMoved()) {
    return false;
  }
  if (!kingPiece.isWhite()) {
    //black
    if (
      position === blacklongCastle &&
      blackRook1.getName() === TYPE.ROOK &&
      !blackRook1.isMoved()
    ) {
      if (castleCheck([2, 3], kingPiece.isWhite())) {
        blackRook1.setMoved();
        kingPiece.setMoved();
        boardData.updateBoard(4, 2);
        boardData.updateBoard(0, 3);
        return true;
      } else {
        return false;
      }
    } else {
      if (blackRook2.getName() === TYPE.ROOK && !blackRook2.isMoved()) {
        if (castleCheck([5, 6], kingPiece.isWhite())) {
          blackRook2.setMoved();
          kingPiece.setMoved();
          boardData.updateBoard(4, 6);
          boardData.updateBoard(7, 5);
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  } else {
    //white
    if (
      position === whitelongCastle &&
      whiteRook1.getName() === TYPE.ROOK &&
      !whiteRook1.isMoved()
    ) {
      if (castleCheck([58, 59], !kingPiece.isWhite())) {
        whiteRook1.setMoved();
        kingPiece.setMoved();
        boardData.updateBoard(60, 58);
        boardData.updateBoard(56, 59);
        return true;
      } else {
        return false;
      }
    } else {
      if (whiteRook2.getName() === TYPE.ROOK && !whiteRook2.isMoved()) {
        if (castleCheck([61, 62], !kingPiece.isWhite())) {
          whiteRook2.setMoved();
          kingPiece.setMoved();
          boardData.updateBoard(60, 62);
          boardData.updateBoard(63, 61);
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
}
function canICastle(moves, color) {
  var otherMoves = [];
  //check if can attack
  for (var i = 1; i <= 64; i++) {
    if (gameData.spot[i] !== null && gameData.spot[i].isWhite() === color) {
      otherMoves = gameData.spot[i].validMoves(i - 1, gameData.spot);
      for (var j = 0; j < moves.length; j++) {
        if (otherMoves.indexOf(moves[j]) !== -1) {
          return false;
        }
      }
    }
  }
  return true;
}
function doPromotion(index) {
  if (
    gameData.currentPiece.getName() === TYPE.PAWN &&
    (Math.floor(index / 8) === 0 || Math.floor(index / 8) === 7)
  ) {
    var choice = prompt("Please enter piece name");
    if (choice !== null || choice !== "") {
      gameData.spot[index + 1] = factory.getPiece(
        choice,
        gameData.currentPlayer
      );
    }
  }
}
function doCastle(index) {
  if (castleCheck(index, gameData.currentPiece)) {
    return true;
  }
  return false;
}
function doEnpassant(index) {
  var updateIndex;
  gameData.currentPlayer
    ? (updateIndex = index - 8)
    : (updateIndex = index + 8);
  if (
    gameData.currentPiece === TYPE.PAWN &&
    (index === gameData.oldIndex + 2 || index === gameData.oldIndex - 2)
  ) {
    boardData.updateBoard(gameData.oldIndex, index);
    boardData.updateBoard(index, updateIndex);
    return true;
  }
}
function setPieceProp(index) {
  if (
    gameData.currentPiece.getName() === TYPE.KING ||
    gameData.currentPiece.getName() === TYPE.ROOK
  ) {
    gameData.currentPiece.setMove();
    return;
  }
  if (
    (gameData.currentPiece.getName() === TYPE.PAWN &&
      index === gameData.oldIndex - 16) ||
    index === gameData.oldIndex + 16
  ) {
    gameData.currentPiece.setEnpassant(true);
    return;
  } else if (
    gameData.currentPiece.getName() === TYPE.PAWN &&
    (index !== gameData.oldIndex - 16)(index !== gameData.oldIndex + 16)
  ) {
    gameData.currentPiece.setEnpassant(false);
    return;
  }
}
function doMove(index) {
  if (
    gameData.currentPiece.getName === TYPE.KING &&
    (index === gameData.oldIndex + 2 || index === gameData.oldIndex - 2)
  ) {
    if (doCastle(index)) {
      return; // render and exit
    } else {
      gameData.isPieceSet = 0;
      return;
    }
  }
  if (doEnpassant(index)) {
    return; // render and exit
  } else {
    boardData.updateBoard(gameData.oldIndex, index);
  }
  if (doPromotion(index)) {
    return; // render and exit
  }
  setPieceProp(index);
  if (GameStatus.getStatus() === STATUS.CHECK) {
    if (GameStatus.checkMate(gameData.currentPlayer)) {
      //reset game
      return;
    }
  }
  GameStatus.checkStatus(gameData.currentPlayer, index);
  gameData.currentPlayer = !currentPlayer;
}