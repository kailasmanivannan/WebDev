import { bishopSet } from "./bishopSet.js";
import { rookSet } from "./rookSet.js";

export function queenSet(boardData, id) {
  let queenMoves = [];
  let result = bishopSet(boardData, id);
  queenMoves.push(...result);
  result = rookSet(boardData, id);
  queenMoves.push(...result);
  return queenMoves;
}
