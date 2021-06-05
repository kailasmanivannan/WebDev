import { bishopSet } from "./modules/bishopSet.js";
import { drawChessboard } from "./modules/drawChessboard.js";
import { kingSet } from "./modules/kingSet.js";
import { knightSet } from "./modules/knightSet.js";
import { pawnSet } from "./modules/pawnSet.js";
import { queenSet } from "./modules/queenSet.js";
import { rookSet } from "./modules/rookSet.js";

//variables
var canva = document.getElementById("board");
var context = canva.getContext("2d");
var text = document.getElementById("status");
var boardspaces = canva.offsetWidth / 8;
var boardData = ["dummydata"];
var Type = {
  BISHOP: "BISHOP",
  KING: "KING",
  KNIGHT: "KNIGHT",
  PAWN: "PAWN",
  QUEEN: "QUEEN",
  ROOK: "ROOK",
};
var gameside = {
  white: "white",
  black: "black",
};

var imgUrl = {
  white: {
    BISHOP: "./images/white_bishop.png",
    KING: "./images/white_king.png",
    KNIGHT: "./images/white_horse.png",
    PAWN: "./images/white_sol.png",
    QUEEN: "./images/white_queen.png",
    ROOK: "./images/white_ele.png",
  },
  black: {
    BISHOP: "./images/black_bishop.png",
    KING: "./images/black_king.png",
    KNIGHT: "./images/black_horse.png",
    PAWN: "./images/black_sol.png",
    QUEEN: "./images/black_queen.png",
    ROOK: "./images/black_ele.png",
  },
};

let status = 0,
  currentPiece,
  isPieceSet = 0,
  oldIndex,
  checker;
let didwhiteplay, didblackplay;
let validMoves = [];
let winner = [];
//variables

canva.addEventListener("mousedown", (e) => getCordinates(e));

function init() {
  boardData = ["dummydata"];
  (status = 0), currentPiece, (isPieceSet = 0), oldIndex, checker;
  didwhiteplay, didblackplay;
  validMoves = [];
  text.innerText = "Start Game (white first)";
  initBoardData();

  attachCoordinates();

  drawChessboard(boardData, context);
}
init();

function GameStatus() {
  winner = [];
  for (let i = 1; i <= 64; i++) {
    if (boardData[i].pieceName === "KING") winner.push(boardData[i]);
  }
  if (winner.length === 1) {
    return true;
  }
}

function getCordinates(e) {
  let rect = canva.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  x = Math.floor(x / boardspaces);
  y = Math.floor(y / boardspaces);
  // console.log(x,y);
  getIndex(x, y);
}

function getIndex(x, y) {
  let clickedIndex = x + y * 8;
  // console.log("postion", clickedIndex);
  playGame(clickedIndex);
}

function initBoardData() {
  let pieceOrder = [
    Type.ROOK,
    Type.KNIGHT,
    Type.BISHOP,
    Type.QUEEN,
    Type.KING,
    Type.BISHOP,
    Type.KNIGHT,
    Type.ROOK,
  ];
  let imgpathW = [
    "./images/white_ele.png",
    "./images/white_horse.png",
    "./images/white_bishop.png",
    "./images/white_queen.png",
    "./images/white_king.png",
    "./images/white_bishop.png",
    "./images/white_horse.png",
    "./images/white_ele.png",
  ];
  let imgpathB = [
    "./images/black_ele.png",
    "./images/black_horse.png",
    "./images/black_bishop.png",
    "./images/black_queen.png",
    "./images/black_king.png",
    "./images/black_bishop.png",
    "./images/black_horse.png",
    "./images/black_ele.png",
  ];
  let i;
  for (i = 0; i < 8; i++) {
    let data = {};
    data.pieceName = pieceOrder[i];
    data.side = gameside.white;
    data.imgPath = imgpathW[i];
    boardData.push(data);
  }
  for (i = 0; i < 8; i++) {
    let data = {};
    data.pieceName = Type.PAWN;
    data.side = gameside.white;
    data.imgPath = imgUrl.white.PAWN;
    boardData.push(data);
  }
  for (i = 0; i < 32; i++) {
    let data = {};
    data.pieceName = null;
    data.side = null;
    data.imgPath = null;
    boardData.push(data);
  }
  for (i = 0; i < 8; i++) {
    let data = {};
    data.pieceName = Type.PAWN;
    data.side = gameside.black;
    data.imgPath = imgUrl.black.PAWN;
    boardData.push(data);
  }
  for (i = 0; i < 8; i++) {
    let data = {};
    data.pieceName = pieceOrder[i];
    data.side = gameside.black;
    data.imgPath = imgpathB[i];
    boardData.push(data);
  }
  // console.log(boardData);
}

function attachCoordinates() {
  let x, y;
  for (let i = 0; i < 64; i++) {
    [x, y] = getAB(i);
    // console.log(x,y);
    boardData[i + 1].xCord = x * 70;
    boardData[i + 1].yCord = y * 70;
  }
}

function getAB(n) {
  let y = Math.floor(n / 8);
  let x = n - 8 * y;
  return [x, y];
}

function playGame(id) {
  if (status === 0) {
    // white's turn
    if (isPieceSet === 0) {
      currentPiece = boardData[id + 1];
      // console.log(currentPiece);
      if (currentPiece.side === "white") {
        switch (currentPiece.pieceName) {
          case "PAWN":
            validMoves = pawnSet(id, currentPiece.side);
            oldIndex = id;
            break;
          case "ROOK":
            validMoves = rookSet(boardData, id);
            oldIndex = id;
            break;
          case "KNIGHT":
            validMoves = knightSet(id);
            oldIndex = id;
            break;
          case "QUEEN":
            validMoves = queenSet(boardData, id);
            oldIndex = id;
            break;
          case "BISHOP":
            validMoves = bishopSet(boardData, id);
            oldIndex = id;
            break;
          case "KING":
            validMoves = kingSet(id);
            oldIndex = id;
            break;
          default:
            console.log("wrong one");
            break;
        }
        isPieceSet = 1;
      } else {
        // not a white piece;
        // console.log("please a white piece");
        text.innerText = "Please select a white piece";
        didwhiteplay = 0;
      }
    } else {
      // piece is set;
      // console.log("check moves");
      let canIMove = validMoves.includes(id);
      if (canIMove) {
        //true can be moved
        // console.log("checking can it be moved");
        checker = updateBoard(oldIndex, id, currentPiece);
        if (checker) {
          //redraw frame
          if (GameStatus()) {
            let result = winner[0].side;
            result += " is the winner";
            alert(result);
            init();
            return;
          }
          context.clearRect(0, 0, canva.Width, canva.height);
          drawChessboard(boardData, context);
          didwhiteplay = 1;
          // console.log("yes it can be moved");
        } else {
          //false cannot move;
          // console.log("the selected move is not allowed select proper move");
          text.innerText = "this move cannot be done select proper positon";
          didwhiteplay = 0;
        }
      } else {
        //console.log("no cannot be moved");
        // console.log("not a proper rule learn chess");
        text.innerText = "wrong move try again ";
        didwhiteplay = 0;
      }
      //take the validmoves from the array check if id is available then move
      //else dont also if available to move check another opposite color piece is present or
      // not the edge case.
      if (didwhiteplay) {
        isPieceSet = 0;
        status = 1;
        // console.log("its black turn");
        text.innerText = "Its black turn";
      } else {
        isPieceSet = 0;
        status = 0;
      }
    }
  }

  //end of white
  else {
    //black's turn
    if (isPieceSet === 0) {
      currentPiece = boardData[id + 1];
      // console.log(currentPiece);
      if (currentPiece.side === "black") {
        switch (currentPiece.pieceName) {
          case "PAWN":
            validMoves = pawnSet(id, currentPiece.side);
            oldIndex = id;
            break;
          case "ROOK":
            validMoves = rookSet(boardData, id);
            oldIndex = id;
            break;
          case "KNIGHT":
            validMoves = knightSet(id);
            oldIndex = id;
            break;
          case "QUEEN":
            validMoves = queenSet(boardData, id);
            oldIndex = id;
            break;
          case "BISHOP":
            validMoves = bishopSet(boardData, id);
            oldIndex = id;
            break;
          case "KING":
            validMoves = kingSet(id);
            oldIndex = id;
            break;
          default:
            console.log("wrong one");
            break;
        }
        isPieceSet = 1;
      } else {
        // not a black piece;
        // console.log("select a black piece");
        text.innerText = "Please select a black piece";
        didblackplay = 0;
      }
    } else {
      // piece is set;
      // console.log("check moves");
      let canIMove = validMoves.includes(id);
      if (canIMove) {
        //true can be moved
        // console.log("checking can it be moved");
        checker = updateBoard(oldIndex, id, currentPiece);
        if (checker) {
          if (GameStatus()) {
            let result = winner[0].side;
            result += " is the winner";
            alert(result);
            init();
            return;
          }
          context.clearRect(0, 0, canva.Width, canva.height);
          drawChessboard(boardData, context);
          didblackplay = 1;
          // console.log("yes it can be moved");
        } else {
          //false cannot move;
          didblackplay = 0;
          // console.log("the selected move is not allowed select proper move");
          text.innerText = "this move cannot be done select proper positon";
        }
      } else {
        //console.log("no cannot be moved");
        didblackplay = 0;
        text.innerText = "wrong move try again";
        // console.log("not a proper rule learn chess");
      }
      //take the validmoves from the array check if id is available then move
      //else dont also if available to move check another opposite color piece is present or
      // not the edge case.
      if (didblackplay) {
        isPieceSet = 0;
        status = 0;
        // console.log("its white turn");
        text.innerText = "Its white turn";
      } else {
        isPieceSet = 0;
        status = 1;
      }
    }
  }
  return;
}

function updateBoard(oldIndex, curIndex, currentPiece) {
  if (currentPiece.pieceName === "PAWN") {
    //one move only if no piece is available || else move to sides if opposite color is present
    if (validMoves[0] == curIndex) {
      // front move
      if (boardData[curIndex + 1].pieceName !== null) return false;
      else {
        boardData[curIndex + 1].pieceName = currentPiece.pieceName;
        boardData[curIndex + 1].side = currentPiece.side;
        boardData[curIndex + 1].imgPath = currentPiece.imgPath;
        boardData[oldIndex + 1].pieceName = null;
        boardData[oldIndex + 1].side = null;
        boardData[oldIndex + 1].imgPath = null;
        return true;
      }
    } else {
      // cross cut moves
      if (
        boardData[curIndex + 1].pieceName === null &&
        boardData[curIndex + 1].side !== boardData[oldIndex + 1].side
      )
        return false;
      else {
        boardData[curIndex + 1].pieceName = currentPiece.pieceName;
        boardData[curIndex + 1].side = currentPiece.side;
        boardData[curIndex + 1].imgPath = currentPiece.imgPath;
        boardData[oldIndex + 1].pieceName = null;
        boardData[oldIndex + 1].side = null;
        boardData[oldIndex + 1].imgPath = null;
        return true;
      }
    }
  } else {
    //other pieces update (since they follow same move types).
    if (
      boardData[curIndex + 1].side === null ||
      boardData[curIndex + 1].side !== boardData[oldIndex + 1].side
    ) {
      //valid to move
      boardData[curIndex + 1].pieceName = currentPiece.pieceName;
      boardData[curIndex + 1].side = currentPiece.side;
      boardData[curIndex + 1].imgPath = currentPiece.imgPath;
      boardData[oldIndex + 1].pieceName = null;
      boardData[oldIndex + 1].side = null;
      boardData[oldIndex + 1].imgPath = null;
      return true;
    } else {
      // a opposite color is present
      // cannot move
      return false;
    }
  }
}
