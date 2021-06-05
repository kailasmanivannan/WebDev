export function rookSet(boardData, position) {
  let validPos = [],
    i;
  let curpos = Math.floor(position / 8);
  console.log(curpos);
  let temp = position;
  for (i = 0; i < curpos; i++) {
    temp -= 8;
    validPos.push(temp);
    if (boardData[temp + 1].pieceName !== null) break;
  }
  temp = position;
  for (i = curpos; i < 7; i++) {
    temp += 8;
    validPos.push(temp);
    if (boardData[temp + 1].pieceName !== null) break;
  }

  let left = curpos * 8;
  let right = (curpos + 1) * 8;
  i = position - 1;
  let j = position + 1;
  while (i >= left) {
    validPos.push(i);
    if (boardData[i + 1].pieceName !== null) break;
    i--;
  }
  while (j < right) {
    validPos.push(j);
    if (boardData[j + 1].pieceName !== null) break;
    j++;
  }
  // console.log(validPos);
  return validPos;
}
