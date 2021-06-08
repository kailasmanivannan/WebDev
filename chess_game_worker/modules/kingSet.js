onmessage = function(e){
  let validMoves = [];
  if (e.data % 8 === 0) {
    //left edge
    console.log("in left");
    validMoves.push(e.data + 8); //bottom mid
    validMoves.push(e.data - 8); //top mid
    validMoves.push(e.data + 1); //mid right
    validMoves.push(e.data - 7); //top right corner
    validMoves.push(e.data + 9); //bottom right corner
  } else if ((e.data + 1) % 8 === 0) {
    //right edge
    console.log("in right");
    validMoves.push(e.data + 8); //bottom mid
    validMoves.push(e.data - 8); //top mid
    validMoves.push(e.data - 1); //mid left
    validMoves.push(e.data - 9); //top left corner
    validMoves.push(e.data + 7); //bottom left corner
  } else {
    validMoves.push(e.data + 8); //bottom mid
    validMoves.push(e.data - 8); //top mid
    validMoves.push(e.data - 1); //mid left
    validMoves.push(e.data + 1); //mid right
    validMoves.push(e.data - 9); //top left corner
    validMoves.push(e.data - 7); //top right corner
    validMoves.push(e.data + 9); //bottom right corner
    validMoves.push(e.data + 7); //bottom left corner
  }
  // console.log(validPositions);
  postMessage(validMoves);
}

