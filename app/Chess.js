import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let currentPiece;


let piecesClass =   ["whitePawn", "blackPawn", "whiteRook", "blackRook", "whiteKing","blackKing", "whiteQueen",   "blackQueen", 
                     "whiteBishop",  "blackBishop", "whiteKnight",  "blackKnight" ]
                    
/*
while game not concluded, alternate between white and black
*/

document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
    
    //whatever is here is executed whenever a square is clicked
    //console.log(chessBoard.board[item.id.charAt(1)][item.id.charCodeAt(0) - 97])
    
    if (activeSquare === undefined){
        if (!item.classList.contains("empty")) { //has a chess piece on it
            activeSquare = item
            activeSquare.classList.add("activeSquare")
        }
    }
    else { //if there is already a piece on that square
        if (!item.classList.contains("empty")) { //has a chess piece on it
            activeSquare.classList.remove("activeSquare")
            activeSquare = item
            activeSquare.classList.add("activeSquare")
        }
    }

})})
