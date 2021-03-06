import { Piece } from "./piece.mjs";
import { Bishop } from "./bishop.mjs";
import { Rook } from "./rook.mjs";

export function Queen(name, color) {
  Piece.call(this, name, color);
}
Queen.prototype = Object.assign({}, Piece.prototype);
Queen.prototype.validMoves = function (position,data) {
  var validPositions = [];
  var bishop_obj = new Bishop("BISHOP", this.isWhite());
  var rook_obj = new Rook("ROOK", this.isWhite());
  validPositions = validPositions.concat(bishop_obj.validMoves(position,data));
  validPositions = validPositions.concat(rook_obj.validMoves(position,data));
  return validPositions;
};
