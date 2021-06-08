export function drawChessboard(boardData, ctx) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle = (i + j) % 2 == 0 ? "white" : "gray";
      let x_coordinate = 0 + j * 70;
      let y_coorodinate = 0 + i * 70;
      ctx.fillRect(x_coordinate, y_coorodinate, 70, 70);
    }
  }
  for (let i = 1; i < boardData.length; i++) {
    if (boardData[i].imgPath !== null) {
      let img = new Image();
      img.src = boardData[i].imgPath;
      // console.log(img.src);
      img.onload = function () {
        ctx.drawImage(img, boardData[i].xCord, boardData[i].yCord);
      };
    }
  }
}
