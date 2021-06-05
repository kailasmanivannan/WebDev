export function knightSet(position) {
  let validPositions = [];
  if (position % 8 == 0) {
    //left edge
    validPositions.push(position - 15); // top right;
    validPositions.push(position + 17); // bottom right;
    validPositions.push(position + 10); //right lower positions;
    validPositions.push(position - 6); // right upper positions;
  } else if ((position + 1) % 8 == 0) {
    //right edge
    validPositions.push(position - 17); // top left;
    validPositions.push(position + 15); //bottom left;
    validPositions.push(position - 10); //left upper position;
    validPositions.push(position + 6); //left lower position;
  } else if ((position - 1) % 8 === 0) {
    //one from left edge
    // console.log("left edge")
    validPositions.push(position - 15); // top right;
    validPositions.push(position - 17); // top left;
    validPositions.push(position + 15); //bottom left;
    validPositions.push(position + 17); // bottom right;
    validPositions.push(position + 10); //right lower positions;
    validPositions.push(position - 6); // right upper positions;
  } else if ((position + 2) % 8 === 0) {
    //one from right edge
    // console.log("right edge");
    validPositions.push(position - 15); // top right;
    validPositions.push(position - 17); // top left;
    validPositions.push(position + 15); //bottom left;
    validPositions.push(position + 17); // bottom right;
    validPositions.push(position - 10); //left upper position;
    validPositions.push(position + 6); //left lower position;
  } else {
    validPositions.push(position - 15); // top right;
    validPositions.push(position - 17); // top left;
    validPositions.push(position + 15); //bottom left;
    validPositions.push(position + 17); // bottom right;
    validPositions.push(position - 10); //left upper position;
    validPositions.push(position + 6); //left lower position;
    validPositions.push(position + 10); //right lower positions;
    validPositions.push(position - 6); // right upper positions;
  }
  // console.log(validPositions);
  return validPositions;
}
