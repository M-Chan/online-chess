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
    
    /*console.log(chessBoard.board[item.id.charAt(1)][item.id.charCodeAt(0) - 97]) */ // --> converting ID to board[][] indicies
    
    if (!item.classList.contains("empty")) { //not empty then make it active square
        if (activeSquare !== undefined){
            activeSquare.classList.remove("activeSquare")
        }
        activeSquare = item
        activeSquare.classList.add("activeSquare")
    }

    else if (item.classList.contains("empty") && activeSquare !== undefined){ //if empty and active square is defined
        item.classList.remove("empty")
        chessPiece = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value))
        activeSquare.classList.remove(chessPiece)
        activeSquare.classList.remove("activeSquare")
        activeSquare.classList.add("empty")
        item.classList.add(chessPiece)
        

        //now we need to update the 2D array so that whatever the user has done is reflected in the data structure
        chessBoard.board[activeSquare.id.charAt(1)][activeSquare.id.charCodeAt(0) - 97].removePiece()
        chessBoard.board[item.id.charAt(1)][item.id.charCodeAt(0) - 97].addPiece()



        activeSquare = undefined
    }

})})



