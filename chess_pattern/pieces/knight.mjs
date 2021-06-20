import { Piece } from "./piece.mjs";

export function Knight(name, color) {
  Piece.call(this, name, color);
}
Knight.prototype = Object.assign({}, Piece.prototype);
Knight.prototype.validMoves = function (position, data) {
  var validPositions = [];
  console.log(validPositions);
  var spot = data;
  console.log("in spot");
  if (position % 8 == 0) {
    //left edge
    validPositions = this.knightLeftEdge(spot, position);
  } else if ((position + 1) % 8 == 0) {
    //right edge
    validPositions = this.knightRightEdge(spot, position);
  } else if ((position - 1) % 8 === 0) {
    //one from left edge
    validPositions = this.knightOneLeftEdge(spot, position);
  } else if ((position + 2) % 8 === 0) {
    //one from right edge
    validPositions = this.knightOneRightEdge(spot, position);
  } else {
    validPositions = this.knightNoEdge(spot, position);
  }

  return validPositions;
};
Knight.prototype.knightLeftEdge = function (spot, position) {
  var temp;
  var moves = [];
  console.log("leftedge");
  temp = position - 15; //top right
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 17; // bottom right
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 10; //right lower positions;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 6; //right upper positions;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  return moves;
};
Knight.prototype.knightRightEdge = function (spot, position) {
  var moves = [];
  var temp;
  console.log("right edge");
  temp = position - 17; //top left
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 15; //bottom left;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 10; //left upper position
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 6; //left lower positon;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  return moves;
};
Knight.prototype.knightOneLeftEdge = function (spot, position) {
  var temp,
    moves = [];
  console.log("oneleftedge");
  temp = position - 15; //top right
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 17; //top left
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 15; ////bottom left;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 17; //bottom right;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 10; //right lower positions;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 6; //right upper positions;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  return moves;
};
Knight.prototype.knightOneRightEdge = function (spot, position) {
  var temp,
    moves = [];
  console.log("onerightedge");
  temp = position - 15; //top right
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 17; //top left
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 15; ////bottom left;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 17; //bottom right;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 10; //left upper positions;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 6; //left lower position
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  return moves;
};
Knight.prototype.knightNoEdge = function (spot, position) {
  var temp,
    moves = [];
  console.log("noedge");
  temp = position - 15; //top right
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 17; //top left
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 15; ////bottom left;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 17; //bottom right;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 10; //left upper positions;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 6; //left lower position
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position + 10; //right lower positions;
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  temp = position - 6; //right uppper position
  if (
    temp >= 0 &&
    temp <= 64 &&
    (spot[temp + 1] === null || spot[temp + 1].isWhite() !== this.isWhite())
  ) {
    moves.push(temp);
  }
  return moves;
};
