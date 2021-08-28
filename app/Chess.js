import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let chessPiece;

var piecesClass =   ["whitePawn", "blackPawn", "whiteRook", "blackRook", "whiteKing", "blackKing", "whiteQueen", "blackQueen", 
                     "whiteBishop", "blackBishop","whiteKnight", "blackKnight" ]
                    
/*
while game not concluded, alternate between white and black
*/

document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
    //whatever is here is executed whenever a square is clicked
    
    //selecting the active square
    if (!item.classList.contains("empty")) { //not empty then make it active square
        if (activeSquare !== undefined){
            activeSquare.classList.remove("activeSquare")
        }
        activeSquare = item
        activeSquare.classList.add("activeSquare")
        
    }

    // making the move
    else if (item.classList.contains("empty") && activeSquare !== undefined){ //if empty and active square is defined
        item.classList.remove("empty")
        chessPiece = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value))
        activeSquare.classList.remove(chessPiece)
        activeSquare.classList.remove("activeSquare")
        activeSquare.classList.add("empty")
        item.classList.add(chessPiece)
        
        //this method updates the 2D array so that whatever the user has done is reflected in the data structure
        chessBoard.movePiece(   Number(activeSquare.id.charAt(0)), Number(activeSquare.id.charAt(1)), 
                                Number(item.id.charAt(0)), Number(item.id.charAt(1))
                            )
        activeSquare = undefined

    }

})})



