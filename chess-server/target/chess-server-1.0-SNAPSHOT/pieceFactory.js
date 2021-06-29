var factory = {
  getPiece: function (pieceid, piececolor) {
    switch (pieceid) {
      case TYPE.ROOK:
        return new Rook(TYPE.ROOK, piececolor);
      case TYPE.PAWN:
        return new Pawn(TYPE.PAWN, piececolor);
      case TYPE.QUEEN:
        return new Queen(TYPE.QUEEN, piececolor);
      case TYPE.BISHOP:
        return new Bishop(TYPE.BISHOP, piececolor);
      case TYPE.KING:
        return new King(TYPE.KING, piececolor);
      case TYPE.KNIGHT:
        return new Knight(TYPE.KNIGHT, piececolor);
    }
  },
};
