export function bishopSet(boardData, position) {
  let validmoves = [];
  let n = Math.floor(position / 8);
  let temp = position,
    i;
  for (i = 1; i <= n; i++) {
    //upper left part
    temp -= 8;
    validmoves.push(temp - i);
    if (boardData[temp - i + 1].pieceName !== null || (temp - i) % 8 === 0) {
      break;
    }
  }

  temp = position;
  for (i = 1; i <= n; i++) {
    //upper right part
    temp -= 8;
    validmoves.push(temp + i);
    if (
      boardData[temp + i + 1].pieceName !== null ||
      (temp + i + 1) % 8 === 0
    ) {
      break;
    }
  }
  n = 7 - n;
  // console.log(n);
  temp = position;
  for (i = 1; i <= n; i++) {
    //bottom right part
    temp += 8;
    validmoves.push(temp + i);
    if (
      boardData[temp + i + 1].pieceName !== null ||
      (temp + i + 1) % 8 === 0
    ) {
      break;
    }
  }
  temp = position;
  for (i = 1; i <= n; i++) {
    //bottom left part
    temp += 8;
    validmoves.push(temp - i);
    // console.log(temp-i);
    if (boardData[temp - i + 1].pieceName !== null || (temp - i) % 8 === 0) {
      break;
    }
  }
  // console.log(validmoves);
  return validmoves;
}
