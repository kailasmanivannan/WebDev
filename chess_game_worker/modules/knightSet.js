onmessage = function(e){
  let validPositions = [];
  if (e.data % 8 == 0) {
    //left edge
    validPositions.push(e.data - 15); // top right;
    validPositions.push(e.data + 17); // bottom right;
    validPositions.push(e.data + 10); //right lower positions;
    validPositions.push(e.data - 6); // right upper positions;
  } else if ((e.data + 1) % 8 == 0) {
    //right edge
    validPositions.push(e.data - 17); // top left;
    validPositions.push(e.data + 15); //bottom left;
    validPositions.push(e.data - 10); //left upper e.data;
    validPositions.push(e.data + 6); //left lower e.data;
  } else if ((e.data - 1) % 8 === 0) {
    //one from left edge
    // console.log("left edge")
    validPositions.push(e.data - 15); // top right;
    validPositions.push(e.data - 17); // top left;
    validPositions.push(e.data + 15); //bottom left;
    validPositions.push(e.data + 17); // bottom right;
    validPositions.push(e.data + 10); //right lower positions;
    validPositions.push(e.data - 6); // right upper positions;
  } else if ((e.data + 2) % 8 === 0) {
    //one from right edge
    // console.log("right edge");
    validPositions.push(e.data - 15); // top right;
    validPositions.push(e.data - 17); // top left;
    validPositions.push(e.data + 15); //bottom left;
    validPositions.push(e.data + 17); // bottom right;
    validPositions.push(e.data - 10); //left upper e.data;
    validPositions.push(e.data + 6); //left lower e.data;
  } else {
    validPositions.push(e.data - 15); // top right;
    validPositions.push(e.data - 17); // top left;
    validPositions.push(e.data + 15); //bottom left;
    validPositions.push(e.data + 17); // bottom right;
    validPositions.push(e.data - 10); //left upper e.data;
    validPositions.push(e.data + 6); //left lower e.data;
    validPositions.push(e.data + 10); //right lower positions;
    validPositions.push(e.data - 6); // right upper positions;
  }
  // console.log(validPositions);
  postMessage(validPositions);
}
