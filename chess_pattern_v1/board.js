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
var BOARD ={
  ROWS : 8
}
var boardData = (function() {
    var boardData = ["dummydata"];
    function init() {
      var i;
      for (i = 0; i < 8; i++) {
        boardData.push(factory.getPiece(PIECE_ORDER[i],false));
      }
      for (i = 0; i < 8; i++) {
        boardData.push(factory.getPiece(TYPE.PAWN,false));
      }
      for (i = 0; i < 32; i++) {
        boardData.push(null);
      }
      for (i = 0; i < 8; i++) {
        boardData.push(factory.getPiece(TYPE.PAWN,true));
      }
      for (i = 0; i < 8; i++) {
        boardData.push(factory.getPiece(PIECE_ORDER[i],true));
      }
    }
    init();
    var highlight = [];
    return {
      getBoard: function () {
        // All private members are accessible here
        return boardData;
      },
      updateBoard: function(oldIndex,newIndex) {
          //update board
          boardData[newIndex+1]=boardData[oldIndex+1];
          boardData[oldIndex+1]=null;
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