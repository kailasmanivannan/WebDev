var text = document.getElementById("status");
function initGame() {
  gameData.currentPlayer = true; //true for white ;false for black
  gameData.isPieceSet = false;
  gameData.spot = boardData.getBoard();
  gameData.moves = [];
  gameData.status = STATUS.NOTHING;
  STATUS.WINNER = "NOONE";
}
initGame();

function playGame(index) {
  gameData.spot = boardData.getBoard();
  if (gameData.currentPlayer) {
    if (!gameData.isPieceSet) {
      gameData.currentPiece = gameData.spot[index + 1];
      if (gameData.currentPiece !== null && gameData.currentPiece.isWhite()) {
        if (GameStatus.getStatus() === STATUS.CHECK) {
          if(!validCheckMoves(index)){return;}
        } else {
          gameData.moves =gameData.currentPiece.validMoves(index, gameData.spot,GameStatus.getStatus());
        }
        boardData.setHighlight(gameData.moves, index); 
        //render the highlighted positions
        gameData.oldIndex = index;
        gameData.isPieceSet = true;
        return;
      } else {
        // not a white piece select a white piece;
        text.innerText = GAMEMESSAGE.SELECTWHITE;
      }
    } else {
      var canIMove = gameData.moves.includes(index);
      if (canIMove) {
        doMove(index);
        text.innerText = GAMEMESSAGE.BLACKMOVE;
        return;
      } else {
        gameData.isPieceSet = false;
        text.innerText = GAMEMESSAGE.NOTMOVE;
        drawBoard();
        return;
      }
    }
  } else {
    //black
    if (!gameData.isPieceSet) {
      gameData.currentPiece = gameData.spot[index + 1];
      if (gameData.currentPiece !== null && !gameData.currentPiece.isWhite()) {
        if (GameStatus.getStatus() === STATUS.CHECK) {
          if(!validCheckMoves(index)){return;}
        } else {
          gameData.moves = gameData.currentPiece.validMoves(index, gameData.spot,GameStatus.getStatus());
        }
        boardData.setHighlight(gameData.moves, index);
        //render the highlighted positions
        gameData.oldIndex = index;
        gameData.isPieceSet = true;
        return;
      } else {
        // not a black piece select a black piece;
        text.innerText = GAMEMESSAGE.SELECTBLACK;
      }
    } else {
      var canIMove = gameData.moves.includes(index);
      if (canIMove) {
        doMove(index);
        text.innerText = GAMEMESSAGE.WHITEMOVE;
        drawBoard();
        return;
      } else {
        gameData.isPieceSet = false;
        text.innerText = GAMEMESSAGE.NOTMOVE;
        drawBoard();
        return;
      }
    }
  }
}
var GameStatus = {
  checkStatus: function (player, id) {
    var pos;
    player ? (pos = getking(false)) : (pos = getking(true));
    var list = gameData.spot[id + 1].validMoves(id, gameData.spot);
    if (list.includes(pos)) {
      //king in check
      gameData.status = STATUS.CHECK;
      gameData.checkPiece = id;
      gameData.kingPiece = pos;
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
    return;
    //render and exit
  },
  checkMate: function (player, index) {
    // true , so white is current player check if black king in checkmate
    //else false , so black is current player check if white king in checkmate
    var pos;
    player ? (pos = getking(false)) : (pos = getking(true));
    var result = gameData.spot[pos + 1].checkMate(gameData.spot, pos, index);
    if (result) {
      if (player) {
        STATUS.WINNER = "WHITE";
        return true;
      } else {
        STATUS.WINNER = "BLACK";
        return true;
      }
    } else {
      return false;
    }
  },
};
function getking(color) {
  for (var i = 1; i <= 64; i++) {
    if (
      gameData.spot[i] !== null &&
      gameData.spot[i].pieceName === TYPE.KING &&
      gameData.spot[i].isWhite() === color
    )
      return i - 1;
  }
}
function doPromotion(index) {
  if (
    gameData.currentPiece.getName() === TYPE.PAWN &&
    (Math.floor(index / 8) === 0 || Math.floor(index / 8) === 7)
  ) {
    var choice = prompt(GAMEMESSAGE.PROMOTION);
    if (choice !== null || choice !== "") {
      gameData.spot[index + 1] = factory.getPiece(
        choice,
        gameData.currentPlayer
      );
    }
    return true;
  }
}
function doEnpassant(index) {
  var oldPos = gameData.oldIndex;
  var diagPos = [
    oldPos + 1 + 8,
    oldPos - 1 + 8,
    oldPos + 1 - 8,
    oldPos - 1 - 8,
  ];
  if (
    gameData.currentPiece.pieceName === TYPE.PAWN &&
    diagPos.includes(index) &&
    gameData.spot[index + 1] === null
  ) {
    var updateIndex = gameData.currentPlayer ? index + 8 : index - 8;
    boardData.updateBoard(gameData.oldIndex, updateIndex);
    boardData.updateBoard(updateIndex, index);
    return true;
  }
}
function setPieceProp(index) {
  var currentName = gameData.currentPiece.getName();
  if (currentName === TYPE.KING || currentName === TYPE.ROOK) {
    gameData.currentPiece.setMove();
  }
  if (currentName === TYPE.PAWN) {
    gameData.currentPiece.setEnpassant(
      index === gameData.oldIndex - 16 || index === gameData.oldIndex + 16
    );
  }
}
function doMove(index) {
  if (
    gameData.currentPiece.getName() === TYPE.KING &&
    (index === gameData.oldIndex + 2 || index === gameData.oldIndex - 2)
  ) {
    if (index === gameData.oldIndex + 2) {
      gameData.currentPiece.setMove();
      gameData.spot[index + 2].setMove();
      boardData.updateBoard(gameData.oldIndex, index);
      boardData.updateBoard(index + 1, index - 1);
     drawBoard();
    } else {
      gameData.currentPiece.setMove();
      gameData.spot[index - 1].setMove();
      boardData.updateBoard(gameData.oldIndex, index);
      boardData.updateBoard(index - 2, index + 1);
      drawBoard();
    }
  } else if (doEnpassant(index)) {
    drawBoard();
    // return; // render and exit
  } else {
    boardData.updateBoard(gameData.oldIndex, index);
    drawBoard();
  }
  if (doPromotion(index)) {
    drawBoard();
    // render
  }
  setPieceProp(index);
  GameStatus.checkStatus(gameData.currentPlayer, index);
  if (GameStatus.getStatus() === STATUS.CHECK) {
    if (GameStatus.checkMate(gameData.currentPlayer, index)) {
      //reset game
      let result = (STATUS.WINNER += GAMEMESSAGE.RESULT);
      alert(result);
      GameStatus.resetGame();
      drawBoard();
      return;
    }
    alert(STATUS.CHECK);
  }
  setEnpassant();
  gameData.currentPlayer = !gameData.currentPlayer;
  gameData.isPieceSet = false;
}
function setEnpassant() {
  for (var i = 1; i <= 64; i++) {
    if (
      gameData.spot[i] !== null &&
      gameData.spot[i].getName() === TYPE.PAWN &&
      gameData.spot[i].isWhite() !== gameData.currentPlayer
    ) {
      gameData.spot[i].setEnpassant(false);
    }
  }
}
function getBlockPos(checkPiece, kingPiece) {
  var blockMoves = [];
  var minId = Math.min(checkPiece, kingPiece);
  var maxId = Math.max(checkPiece, kingPiece);
  if (maxId - minId === 1) {
    blockMoves.push(checkPiece);
    return;
  }
  if (gameData.spot[checkPiece + 1].getName() === TYPE.KNIGHT) {
    blockMoves.push(checkPiece);
    return blockMoves;
  }
  if (Math.floor(checkPiece / 8) === Math.floor(kingPiece)) {
    // on sameline
    while (minId < maxId) {
      minId++;
      blockMoves.push(minId);
    }
    blockMoves.push(checkPiece);
    return blockMoves;
  }
  if ((maxId - minId) % 8 === 0) {
    //up or down
    while (minId < maxId) {
      minId += 8;
      blockMoves.push(minId);
    }
    blockMoves.push(checkPiece);
    return blockMoves;
  }
  var rows = Math.floor(checkPiece / 8) - Math.floor(kingPiece / 8);
  if (checkPiece > kingPiece) {
    //upper diag
    if (checkPiece - 8 * rows - rows === kingPiece) {
      //left upper diag
      for (var i = 1; i <= rows; i++) {
        checkPiece -= 8;
        blockMoves.push(checkPiece - i);
      }
      return blockMoves;
    } else if (currentPiece - 8 * rows + rows === kingPiece) {
      //right upper diag
      for (var i = 1; i <= rows; i++) {
        checkPiece -= 8;
        blockMoves.push(checkPiece + i);
      }
      return blockMoves;
    }
  } else {
    //bottom diag
    if (checkPiece + 8 * rows - rows === kingPiece) {
      //left bottom diag
      for (var i = 1; i <= rows; i++) {
        checkPiece += 8;
        blockMoves.push(checkPiece - i);
      }
      return blockMoves;
    } else if (checkPiece - 8 * rows + rows === kingPiece) {
      //right bottom diag
      for (var i = 1; i <= rows; i++) {
        checkPiece += 8;
        blockMoves.push(checkPiece + i);
      }
      return blockMoves;
    }
  }
}
function validCheckMoves(index) {
  var blockPos = getBlockPos(gameData.checkPiece, gameData.kingPiece);
  var piecemoves =
    gameData.currentPiece.getName() === TYPE.KING
      ? gameData.currentPiece.validMoves(
          index,
          gameData.spot,
          GameStatus.getStatus()
        )
      : gameData.currentPiece.validMoves(index, gameData.spot);
  if (
    gameData.currentPiece.getName() === TYPE.KING ||
    piecemoves.some(function(r) { return blockPos.includes(r)})
  ) {
    //yes can move
    gameData.moves = piecemoves;
    return true;
  } else {
    alert(GAMEMESSAGE.SELECTVALID);
    gameData.isPieceSet = false;
    return false;
  }
}