onmessage = function (e) {
  let validPos = [],
  i;
let curpos = Math.floor(e.data[1] / 8);
let temp = e.data[1];
for (i = 0; i < curpos; i++) {
  temp -= 8;
  validPos.push(temp);
  if (e.data[0][temp + 1].pieceName !== null) break;
}
temp = e.data[1];
for (i = curpos; i < 7; i++) {
  temp += 8;
  validPos.push(temp);
  if (e.data[0][temp + 1].pieceName !== null) break;
}

let left = curpos * 8;
let right = (curpos + 1) * 8;
i = e.data[1] - 1;
let j = e.data[1] + 1;
while (i >= left) {
  validPos.push(i);
  if (e.data[0][i + 1].pieceName !== null) break;
  i--;
}
while (j < right) {
  validPos.push(j);
  if (e.data[0][j + 1].pieceName !== null) break;
  j++;
}
postMessage(validPos);
};
