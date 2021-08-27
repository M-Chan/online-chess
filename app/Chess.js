import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let currentPiece;


var piecesClass =   ["whitePawn", "blackPawn", "whiteRook", "blackRook", "whiteKing", "blackKing", "whiteQueen", "blackQueen", 
                     "whiteBishop", "blackBishop","whiteKnight", "blackKnight" ]
                    
/*
while game not concluded, alternate between white and black
*/

document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
    
    //whatever is here is executed whenever a square is clicked
    //console.log(chessBoard.board[item.id.charAt(1)][item.id.charCodeAt(0) - 97])
    
    if (activeSquare === undefined) {
        if (!item.classList.contains("empty")) { //has a chess piece on it
            findCurrentPiece();
            makeActive();
        }
    }
    else { //square already selected
        if (!item.classList.contains("empty")) { //has a chess piece on it
            activeSquare.classList.remove("activeSquare");
            findCurrentPiece();
            makeActive();
        }
    }
    
    function findCurrentPiece() { //sets the current piece to the piece on the selected square
        if (item.classList.contains("whitePawn")) currentPiece = "whitePawn";
        else if (item.classList.contains("whiteRook")) currentPiece = "whiteRook";
        else if (item.classList.contains("whiteKnight")) currentPiece = "whiteKnight";
        else if (item.classList.contains("whiteBishop")) currentPiece = "whiteBishop";
        else if (item.classList.contains("whiteQueen")) currentPiece = "whiteQueen";
        else if (item.classList.contains("whiteKing")) currentPiece = "whiteKing";
        else if (item.classList.contains("blackPawn")) currentPiece = "blackPawn";
        else if (item.classList.contains("blackRook")) currentPiece = "blackRook";
        else if (item.classList.contains("blackKnight")) currentPiece = "blackKnight";
        else if (item.classList.contains("blackBishop")) currentPiece = "blackBishop";
        else if (item.classList.contains("blackQueen")) currentPiece = "blackQueen";
        else currentPiece = "blackKing"
    }

    function makeActive() { //selects the current square and allows its piece to move to an empty quare
        activeSquare = item;
        activeSquare.classList.add("activeSquare");
        console.log("Current piece is", currentPiece);

        document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
            if (item.classList.contains("empty") && currentPiece != null) {
                activeSquare.classList.remove("activeSquare");
                activeSquare.classList.remove(currentPiece);
                activeSquare.classList.add("empty")
                activeSquare === undefined;
                item.classList.remove("empty");
                item.classList.add(currentPiece);
                currentPiece = null;
            }
        })})
    }

    // if (activeSquare === undefined){
    //     if (!item.classList.contains("empty")) { //has a chess piece on it
    //         activeSquare = item
    //         activeSquare.classList.add("activeSquare")
    //     }
    // }
    // else { //if there is already a piece on that square
    //     if (!item.classList.contains("empty")) { //has a chess piece on it
    //         activeSquare.classList.remove("activeSquare")
    //         activeSquare = item
    //         activeSquare.classList.add("activeSquare")
    //     }
    // }
})})


