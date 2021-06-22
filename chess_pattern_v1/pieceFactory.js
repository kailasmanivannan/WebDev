var factory = {
  getPiece: function (pieceid, piececolor) {
    switch (pieceid) {
      case "ROOK":
        return new Rook("ROOK", piececolor);
        break;
      case "PAWN":
        return new Pawn("PAWN", piececolor);
        break;
      case "QUEEN":
        return new Queen("QUEEN", piececolor);
        break;
      case "BISHOP":
        return new Bishop("BISHOP", piececolor);
        break;
      case "KING":
        return new King("KING", piececolor);
        break;
      case "KNIGHT":
        return new Knight("KNIGHT", piececolor);
        break;
      default:
        return null;
        break;
    }
  },
};
