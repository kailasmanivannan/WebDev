import { Bishop } from "./pieces/bishop.mjs";
import { Rook } from "./pieces/rook.mjs";
import { Knight } from "./pieces/knight.mjs";
import { King } from "./pieces/king.mjs";
import { Pawn } from "./pieces/pawn.mjs";
import { Queen } from "./pieces/queen.mjs";

export var factory = {
    getPiece : function(pieceid,piececolor){
        switch (pieceid){
            case "ROOK" : return new Rook("ROOK",piececolor);
                          break;
            case "PAWN" : return new Pawn("PAWN",piececolor);
                          break;
            case "QUEEN" : return new Queen("QUEEN",piececolor);
                          break;
            case "BISHOP" : return new Bishop("BISHOP",piececolor);
                          break;
            case "KING" : return new King("KING",piececolor);
                          break;
            case "KNIGHT" : return new Knight("KNIGHT",piececolor);
                          break;      
            default : return null;
                      break; 
        }
    }
}