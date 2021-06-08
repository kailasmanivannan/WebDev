onmessage = function (e) {
  var moves = [];
  if (e.data[1] === "white") {
    // if the piece is white
    if ((e.data[0] + 1) % 8 === 0) {
      moves.push(e.data[0] + 8);
      moves.push(e.data[0] + 7);
    } 
    else if (e.data[0] % 8 === 0){
      moves.push(e.data[0] + 8);
      moves.push(e.data[0] + 9);
    }
    else{
      moves.push(e.data[0] + 8);
      moves.push(e.data[0] + 7);
      moves.push(e.data[0] + 9);
    }
  } else {
    // if the piece is black'

    if ((e.data[0] + 1) % 8 === 0) {
      moves.push(e.data[0] - 8);
      moves.push(e.data[0] - 7);
    }
    else if (e.data[0] % 8 === 0){
      moves.push(e.data[0] - 8);
      moves.push(e.data[0] - 9);
    }
    else{
      moves.push(e.data[0] - 8);
      moves.push(e.data[0] - 7);
      moves.push(e.data[0] - 9);
    }
  }
  postMessage(moves);
};
