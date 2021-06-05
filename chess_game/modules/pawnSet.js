export function pawnSet(position, gameside) {
  if (gameside === "white") {
    // if the piece is white
    if ((position + 1) % 8 === 0) return [position + 8, position + 7];
    else if (position % 8 === 0) return [position + 8, position + 9];
    else return [position + 8, position + 7, position + 9];
  } else {
    // if the piece is black'
    if ((position + 1) % 8 === 0) return [position - 8, position - 7];
    else if (position % 8 === 0) return [position - 8, position - 9];
    else return [position - 8, position - 7, position - 9];
  }
}
