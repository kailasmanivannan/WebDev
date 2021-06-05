export function kingSet(position) {
  let validMoves = [];
  if (position % 8 === 0) {
    //left edge
    console.log("in left");
    validMoves.push(position + 8); //bottom mid
    validMoves.push(position - 8); //top mid
    validMoves.push(position + 1); //mid right
    validMoves.push(position - 7); //top right corner
    validMoves.push(position + 9); //bottom right corner
  } else if ((position + 1) % 8 === 0) {
    //right edge
    console.log("in right");
    validMoves.push(position + 8); //bottom mid
    validMoves.push(position - 8); //top mid
    validMoves.push(position - 1); //mid left
    validMoves.push(position - 9); //top left corner
    validMoves.push(position + 7); //bottom left corner
  } else {
    validMoves.push(position + 8); //bottom mid
    validMoves.push(position - 8); //top mid
    validMoves.push(position - 1); //mid left
    validMoves.push(position + 1); //mid right
    validMoves.push(position - 9); //top left corner
    validMoves.push(position - 7); //top right corner
    validMoves.push(position + 9); //bottom right corner
    validMoves.push(position + 7); //bottom left corner
  }
  return validMoves;
}
