onmessage = function (e) {
  var queenMoves = [],
    result = [];
  var subworker = new Worker("./bishopSet.js");
  subworker.postMessage([e.data[0], e.data[1]]);
  subworker.onmessage = function (a) {
    queenMoves.push(...a.data);
  };
  subworker = new Worker("./rookSet.js");
  subworker.postMessage([e.data[0], e.data[1]]);
  subworker.onmessage = function (a) {
    queenMoves.push(...a.data);
    postMessage(queenMoves);
  };
};
