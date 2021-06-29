var boardData = (function () {
  var boardData = ["dummydata"];
  function init() {
    var i;
    for (i = 0; i < 64; i++) {
      var piece = null,
        isWhite = i > 16;
      
      if (Math.floor(i / 8) === 0 || Math.floor(i / 8) === 7) {
        piece = factory.getPiece(PIECE_ORDER[i % 8], isWhite);
      } else if (Math.floor(i / 8) === 1 || Math.floor(i / 8) === 6) {
        piece = factory.getPiece(TYPE.PAWN, isWhite);
      }

      boardData.push(piece);
    }
  }
  init();
  var highlight = [];
  return {
    getBoard: function () {
      return boardData;
    },
    updateBoard: function (oldIndex, newIndex) {
      //update board
      boardData[newIndex + 1] = boardData[oldIndex + 1];
      boardData[oldIndex + 1] = null;
    },
    reset: function () {
      //reset board
      boardData = ["dummydata"];
      init();
      highlight = [];
    },
    getHighlight: function () {
      return highlight;
    },
    setHighlight: function (values, currentpos) {
      highlight = [];
      highlight = highlight.concat(values, currentpos);
      highlightBox();
    },
  };
})();
