var TYPE = {
  BISHOP: "BISHOP",
  KING: "KING",
  KNIGHT: "KNIGHT",
  PAWN: "PAWN",
  QUEEN: "QUEEN",
  ROOK: "ROOK",
};
var PIECE_ORDER = [
  TYPE.ROOK,
  TYPE.KNIGHT,
  TYPE.BISHOP,
  TYPE.QUEEN,
  TYPE.KING,
  TYPE.BISHOP,
  TYPE.KNIGHT,
  TYPE.ROOK,
];
var BOARD = {
  ROWS: 8,
};
var IMGPATH = {
  black: {
    ROOK: "♜",
    BISHOP: "♝",
    KING: "♚",
    KNIGHT: "♞",
    QUEEN: "♛",
    PAWN: "♟︎	",
  },
  white: {
    ROOK: "♖",
    BISHOP: "♗",
    KING: "♔",
    KNIGHT: "♘",
    QUEEN: "♕",
    PAWN: "♙",
  },
};
var gameData = {
  currentPlayer: null,
  isPieceSet: null,
  currentPiece: null,
  spot: null,
  moves: null,
  oldIndex: null,
  status: null,
  checkPiece: null,
  kingPiece: null,
};
var STATUS = {
  NOTHING: "NOTHING",
  CHECK: "CHECK",
  CHECKMATE: "CHECKMATE",
  WINNER: "NOONE",
};
var GAMEMESSAGE = {
  SELECTVALID : "select a valid piece",
  SELECTWHITE : "select a white piece",
  SELECTBLACK : "select a black piece",
  BLACKMOVE : "Black's move",
  WHITEMOVE : "White's move",
  NOTMOVE : "Not a valid move try again",
  PROMOTION : "please enter a piece name (in CAPITAL letters)",
  RESULT : " has won the game congrats"
}