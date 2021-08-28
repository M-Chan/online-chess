import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let currentPiece;

let totalMoves = 0;
let pieceColour;

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
            if (((totalMoves%2 === 0) && (pieceColour === "white")) || ((totalMoves%2 != 0) && (pieceColour === "black"))) {
                makeActive();
            }
        }
    }
    else { //square already selected
        if (!item.classList.contains("empty")) { //has a chess piece on it
            activeSquare.classList.remove("activeSquare");
            findCurrentPiece();
            if (((totalMoves%2 === 0) && (pieceColour === "white")) || ((totalMoves%2 != 0) && (pieceColour === "black"))) {
                makeActive();
            }
        }
    }
    
    function findCurrentPiece() { //sets the current piece to the piece on the selected square
        if (item.classList.contains("whitePawn")) {currentPiece = "whitePawn"; pieceColour = "white";}
        else if (item.classList.contains("whiteRook")) {currentPiece = "whiteRook"; pieceColour = "white";}
        else if (item.classList.contains("whiteKnight")) {currentPiece = "whiteKnight"; pieceColour = "white";}
        else if (item.classList.contains("whiteBishop")) {currentPiece = "whiteBishop"; pieceColour = "white";}
        else if (item.classList.contains("whiteQueen")) {currentPiece = "whiteQueen"; pieceColour = "white";}
        else if (item.classList.contains("whiteKing")) {currentPiece = "whiteKing"; pieceColour = "white";}
        else if (item.classList.contains("blackPawn")) {currentPiece = "blackPawn"; pieceColour = "black";}
        else if (item.classList.contains("blackRook")) {currentPiece = "blackRook"; pieceColour = "black";}
        else if (item.classList.contains("blackKnight")) {currentPiece = "blackKnight"; pieceColour = "black";}
        else if (item.classList.contains("blackBishop")) {currentPiece = "blackBishop"; pieceColour = "black";}
        else if (item.classList.contains("blackQueen")) {currentPiece = "blackQueen"; pieceColour = "black";}
        else {currentPiece = "blackKing"; pieceColour = "black";}
    }

    function makeActive() { //selects the current square and allows its piece to move to an empty quare
        activeSquare = item;
        activeSquare.classList.add("activeSquare");
        console.log("Current piece is", currentPiece);

        document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
            if ((item.classList.contains("empty") && currentPiece != null) && (((totalMoves%2 === 0) && (pieceColour === "white")) || ((totalMoves%2 != 0) && (pieceColour === "black")))) {
                activeSquare.classList.remove("activeSquare");
                activeSquare.classList.remove(currentPiece);
                activeSquare.classList.add("empty")
                activeSquare === undefined;
                item.classList.remove("empty");
                item.classList.add(currentPiece);
                currentPiece = null;
                totalMoves++;
                console.log(totalMoves);
                pieceColour = null;

                if (totalMoves%2 === 0) {
                    document.getElementById("black").classList.remove("turnText--visible");
                    document.getElementById("black").classList.add("turnText--hidden");
                    document.getElementById("white").classList.remove("turnText--hidden");
                    document.getElementById("white").classList.add("turnText--visible");
                }
                else {
                    document.getElementById("white").classList.remove("turnText--visible");
                    document.getElementById("white").classList.add("turnText--hidden");
                    document.getElementById("black").classList.remove("turnText--hidden");
                    document.getElementById("black").classList.add("turnText--visible");
                }
            }
        })})
    }

})})


