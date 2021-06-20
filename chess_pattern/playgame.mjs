import { boardData } from "./board.mjs";
import { factory } from "./pieceFactory.mjs";

var gameData = {
    currentPlayer : null,
    isPieceSet: null,
    currentPiece: null,
    spot: null,
    moves: null,
    oldIndex: null,
    status: null,
}
function initGame(){
    gameData.currentPlayer = true; //true for white // false for black
    gameData.isPieceSet = 0;
    gameData.spot = boardData.getBoard();
    gameData.moves =[];
    gameData.status = "nothing";
}

initGame();

export function playGame(index){
    gameData.spot = boardData.getBoard();
    if(gameData.currentPlayer){
        if(gameData.isPieceSet===0){
            //piece is not set
            gameData.currentPiece = gameData.spot[index+1];
            if(gameData.currentPiece.isWhite()){
                //its a white
                 gameData.moves = gameData.currentPiece.validMoves(index,gameData.spot);
                 boardData.setHighlight(moves);
                 //render

                 //render the highlighted positions
                 gameData.oldIndex = index;
                 gameData.isPieceSet = 1;
                 return;
            }
            else{
                // not a white piece
                //select a white piece;
                return;
            }
        }
        else{
            //white piece is set;
            //check for valid move
            // do the move and check if king is in check;
            var canIMove = gameData.moves.includes(index);
            if(canIMove){
                //yes can move and check for special moves and check status

                if(gameData.currentPiece.getName()==="king"&&
                (index===gameData.oldIndex+2||index===gameData.oldIndex-2)){
                    //castling is requested
                    if(castleCheck(index,gameData.currentPiece)){
                        // board is already updated render and exit
                        return;
                    }
                    else{
                        //cannot move
                        gameData.isPieceSet = 0;
                        return;
                    }

                }
                
                // checking promotion
                else if(gameData.currentPiece.getName()==="PAWN"&&
                (Math.floor(index/8)===0||Math.floor(index/8)===7)){
                    var promotedPiece = doPromotion(index);
                    gameData.spot[index+1] = promotedPiece;
                    // render again

                    return;

                }
                // check passant
                else if(gameData.currentPiece==="PAWN"&&
                (index === gameData.oldIndex+2 || index === gameData.oldIndex-2)){
                    boardData.updateBoard(gameData.oldIndex,index);
                    boardData.updateBoard(index,index-8);
                    //render again
                     
                   
                }
                else{
                    boardData.updateBoard(gameData.oldIndex,index);
                    //render again
                }

                if(gameData.currentPiece.getName()==="KING"||
                gameData.currentPiece.getName()==="ROOK"){gameData.currentPiece.itMoved();}

                if(gameData.currentPiece.getName()==="PAWN"&&
                (index === gameData.oldIndex-16)){
                    gameData.currentPiece.setEnpassant(true);
                }

                else if(gameData.currentPiece.getName()==="PAWN"&&
                (index !== gameData.oldIndex-16)){
                    gameData.currentPiece.setEnpassant(false);
                }

                if(GameStatus.getStatus()==="check"){
                    // check to checkmate in current player king
                    if(GameStatus.checkMate(gameData.currentPlayer)){
                        //reset game
                        return;
                    }
                }

                GameStatus.checkStatus(gameData.currentPlayer,index);
                gameData.currentPlayer = false;
            }
            else{
                //no cannot move
                gameData.isPieceSet = 0;
                // try again
                return;
            }
        }
    }
    else{
        //black
        if(gameData.isPieceSet===0){
            //piece is not set
            gameData.currentPiece = gameData.spot[index+1];
            if(gameData.currentPiece.isWhite()==false){
                //its a black
                 gameData.moves = gameData.currentPiece.validMoves(index,gameData.spot);
                 boardData.setHighlight(moves);
                 //render the highlighted positions
                 gameData.oldIndex = index;
                 gameData.isPieceSet = 1;
                 return ;
            }
            else{
                // not a black piece
                //select a black piece;
                return;
            }
        }
        else{
            //black piece is set;
            //check for valid move
            // do the move and check if king is in check;
            // if(castleCheck(index,gameData.currentPiece)){
            //     // true castling is done 
            //     // render again

            //     return;
            // }
            var canIMove = gameData.moves.includes(index);
            if(canIMove){
                //yes can move check for special moves and check 
                if(gameData.currentPiece.getName()==="king"&&
                (index===gameData.oldIndex+2||index===gameData.oldIndex-2)){
                    //castling is requested
                    if(castleCheck(index,gameData.currentPiece)){
                        // board is already updated render and exit
                        return;
                    }
                    else{
                        //cannot move
                        gameData.isPieceSet = 0;
                        return;

                    }

                }

                // checking promotion
                else if(gameData.currentPiece.getName()==="PAWN"&&
                (Math.floor(index/8)===0||Math.floor(index/8)===7)){
                    var promotedPiece = doPromotion(index);
                    gameData.spot[index+1] = promotedPiece;
                    // render again
                    return;
                    
                }
                //check en passant move
                else if(gameData.currentPiece==="PAWN"&&
                (index === gameData.oldIndex+2 || index === gameData.oldIndex-2)){
                    boardData.updateBoard(gameData.oldIndex,index);
                    boardData.updateBoard(index,index+8);
                    //render again
                }

                else{
                    boardData.updateBoard(gameData.oldIndex,index);
                    //render again
                }

                if(gameData.currentPiece.getName()==="PAWN"&&index === gameData.oldIndex+16){
                    gameData.currentPiece.setEnpassant(true);
                }
                else if(gameData.currentPiece.getName()==="PAWN"&&index!== gameData.oldIndex+16){
                    gameData.currentPiece.setEnpassant(false);
                }

                if(gameData.currentPiece.getName()==="KING"||
                gameData.currentPiece.getName()==="ROOK"){gameData.currentPiece.itMoved();}


                if(GameStatus.getStatus()==="check"){
                    // check to checkmate in current player king
                    if(GameStatus.checkMate(gameData.currentPlayer)){
                        //reset game
                        return;
                        
                    }
                }
                GameStatus.checkStatus(gameData.currentPlayer,index);
                gameData.currentPlayer = true;
            }
            else{
                //no cannot move
                gameData.isPieceSet = 0;
                // try again
                 return;
            }
        }
    }
}

var GameStatus = {
    checkStatus : function(player,id){
        if(player){
            //check if black king is in check
            var pos = getking(false);
            var list = gameData.spot[id+1].validMoves(id,gameData.spot);
           if(list.includes(pos)){
               //king in check
               gameData.status = "check";
           }
           else{
                gameData.status = "nothing";
           }
        }
        else{
            //check if white king is check
            var pos = getking(true);
            var list = gameData.spot[id+1].validMoves(id,gameData.spot);
           if(list.includes(pos)){
               //king in check
               gameData.status = "check";
           }
           else{
            gameData.status = "nothing";
           }
        }  
    },
    getStatus : function(){
        return gameData.status;
    },
    resetGame : function(){

    },
    checkMate : function(player){
        if(player) {
            // true , so white is current player check if black king in checkmate
            var position = getking(false);
            var result = gameData.spot[position+1].checkMate(spot,position,false);
            if(result){
                return {report : "checkmate",winner:"white"};
            }
            else{ return false;}
        }
        else{
            // false , so black is current player check if white king in checkmate
            var position = getking(true);
            var result = gameData.spot[position+1].checkMate(spot,position,true);
            if(result){
                return {report : "checkmate",winner:"white"};
            }
            else{ return false;}
        }
        
    }
}

function getking(color){
    if(color){
        //true search for white king
        for(var i =1;i<=64;i++){
            if(gameData.spot[i].pieceName==="KING"&&spot[i].isWhite()==true)
                return i;
        }
    }
    else{
        //search for black king
        for(var i =1;i<=64;i++){
            if(gameData.spot[i].pieceName==="KING"&&spot[i].isWhite()==false)
                return i;
        }
    }
}

function castleCheck(position,selectedPiece){
    if(GameStatus.getStatus()==="check"){return false;}
        if(!selectedPiece.isWhite()){
            //black
            if((position===2&&gameData.spot[1].getName()==="ROOK")||(position==6&&gameData.spot[8].getName()==="ROOK")){
                //castle check
                if(position === 2 &&(gameData.spot[3]===null && gameData.spot[4]===null)){
                    //left castle
                    if(gameData.spot[1].didMove()&&selectedPiece.didMove()){
                        //pieces should not moved before
                        if(canICastle([2,3],true)){
                            // can castle updateboard;
                            gameData.spot[1].itMoved();
                            selectedPiece.itMoved();
                            boardData.updateBoard(4,2);
                            boardData.updateBoard(0,3);
                            return true;
                        }else{return false;}
                    }else{return false;}
                }
                else if(position === 6 &&(gameData.spot[6]===null && gameData.spot[7]===null)){
                    //right castle
                    if(gameData.spot[8].didMove()&&selectedPiece.didMove()){
                        //pieces should not moved before
                        if(canICastle([5,6],true)){
                            //can castle update board;
                            gameData.spot[8].itMoved();
                            selectedPiece.itMoved();
                            boardData.updateBoard(4,6);
                            boardData.updateBoard(7,5);
                            return true;
                        }else{return false;}
                    }else{return false;}
                }else{return false;}
            }else{return false;}
        }
        else{
            //white
            if((position===58&&gameData.spot[57].getName()==="ROOK")||(position==62&&gameData.spot[64].getName()==="ROOK")){
                //castle check
                if(position === 58 &&(gameData.spot[59]===null && gameData.spot[60]===null)){
                    //left castle
                    if(gameData.spot[57].didMove()&&selectedPiece.didMove()){
                        //pieces should not moved before
                        if(canICastle([58,59],true)){
                            // can castle updateboard;
                            gameData.spot[57].itMoved();
                            selectedPiece.itMoved();
                            boardData.updateBoard(60,58);
                            boardData.updateBoard(56,59);
                            return true;
                        }else{return false;}
                    }else{return false;}
                }
                else if(position === 62 &&(gameData.spot[62]===null && gameData.spot[63]===null)){
                    //right castle
                    if(gameData.spot[64].didMove()&&selectedPiece.didMove()){
                        //pieces should not moved before
                        if(canICastle([61,62],true)){
                            //can castle update board;
                            gameData.spot[64].itMoved();
                            selectedPiece.itMoved();
                            boardData.updateBoard(60,62);
                            boardData.updateBoard(63,61);
                            return true;
                        }else{return false;}
                    }else{return false;}
                }else{return false;}
            }else{return false;}
        }
}

function canICastle (moves,color) {
    var otherMoves=[];
    if(color){
        //check if white can attack
        for (var i = 1; i <= 64; i++) {
            if (gameData.spot[i] !== null) {
              if (gameData.spot[i].isWhite()) {
                otherMoves = gameData.spot[i].validMoves(i-1,gameData.spot);
                for (var j = 0; j < moves.length; j++) {
                  if (otherMoves.indexOf(moves[j]) !== -1) {
                    return false;
                  }
                }
              }
            }
        }
        return true;
    }
    else{
        //check if black can attack
        for (var i = 1; i <= 64; i++) {
            if (gameData.spot[i] !== null) {
              if (!gameData.spot[i].isWhite()) {
                otherMoves = gameData.spot[i].validMoves(i-1,gameData.spot);
                for (var j = 0; j < moves.length; j++) {
                  if (otherMoves.indexOf(moves[j]) !== -1) {
                    return false;
                  }
                }
              }
            }
        }
        return true;
    }
}

function doPromotion(position){
    if(Math.floor(position/8)===0){
        //white promotion
        var choice= prompt("Please enter piece name");
        if (choice !== null || choice !== "") {
            return factory.getPiece(choice,true);
        }
    }
    else{
        //black promotion
        var choice= prompt("Please enter piece name");
        if (choice !== null || choice !== "") {
            return factory.getPiece(choice,false);
        }
    }
}




// import { boardData } from "./board.mjs";
// import { factory } from "./pieceFactory.mjs";

// var g = boardData.getBoard();
// // console.log(g);
// boardData.updateBoard(12,24);
// boardData.updateBoard(59,28);
// // console.log(g);
// // g = boardData.getBoard();
// var obj = factory.getPiece("KING",false);
// console.log(obj.checkMate(g,4,false));

// // var obj = factory.getPiece("QUEEN",true);
// // console.log(obj.validMoves(28,g));