import { factory } from "./pieceFactory.mjs";

var Type = {
  BISHOP: "BISHOP",
  KING: "KING",
  KNIGHT: "KNIGHT",
  PAWN: "PAWN",
  QUEEN: "QUEEN",
  ROOK: "ROOK",
};
var pieceOrder = [
  Type.ROOK,
  Type.KNIGHT,
  Type.BISHOP,
  Type.QUEEN,
  Type.KING,
  Type.BISHOP,
  Type.KNIGHT,
  Type.ROOK,
];

export var boardData = (function() {
    var boardData = ["dummydata"];
    function init() {
      var i;
      for (i = 0; i < 8; i++) {
        boardData.push(factory.getPiece(pieceOrder[i],false));
      }
      for (i = 0; i < 8; i++) {
        boardData.push(factory.getPiece("PAWN",false));
      }
      for (i = 0; i < 32; i++) {
        boardData.push(null);
      }
      for (i = 0; i < 8; i++) {
        boardData.push(factory.getPiece("PAWN",true));
      }
      for (i = 0; i < 8; i++) {
        boardData.push(factory.getPiece(pieceOrder[i],true));
      }
    }
    init();
    var highlight = [];
    return {
      getBoard: function () {
        // All private members are accessible here
        return boardData;
      },
      updateBoard: function(a,b) {
          //update board
          boardData[b+1]=boardData[a+1];
          boardData[a+1]=null;
      },
      reset: function(){
        //reset board
        boardData = ["dummydata"];
        init();
        highlight = [];
      },
      getHighlight : function(){
        return highlight;
      },
      setHighlight : function(values){
        highlight=[];
        highlight.concat(values);
      }
    };
})();