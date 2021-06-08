onmessage = function(e){
  let validmoves = [];
  let n = Math.floor(e.data[1] / 8);
  let temp = e.data[1],
    i;
  for (i = 1; i <= n; i++) {
    //upper left part
    temp -= 8;
    validmoves.push(temp - i);
    if (e.data[0][temp - i + 1].pieceName !== null || (temp - i) % 8 === 0) {
      break;
    }
  }

  temp = e.data[1];
  for (i = 1; i <= n; i++) {
    //upper right part
    temp -= 8;
    validmoves.push(temp + i);
    if (
      e.data[0][temp + i + 1].pieceName !== null ||
      (temp + i + 1) % 8 === 0
    ) {
      break;
    }
  }
  n = 7 - n;
  // console.log(n);
  temp = e.data[1];
  for (i = 1; i <= n; i++) {
    //bottom right part
    temp += 8;
    validmoves.push(temp + i);
    if (
      e.data[0][temp + i + 1].pieceName !== null ||
      (temp + i + 1) % 8 === 0
    ) {
      break;
    }
  }
  temp = e.data[1];
  for (i = 1; i <= n; i++) {
    //bottom left part
    temp += 8;
    validmoves.push(temp - i);
    // console.log(temp-i);
    if (e.data[0][temp - i + 1].pieceName !== null || (temp - i) % 8 === 0) {
      break;
    }
  }
  postMessage(validmoves);
}
