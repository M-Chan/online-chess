import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let currentPiece;

let totalMoves = 0;
let pieceColour;

let i = 0

var whitePiecesClass =   ["whitePawn", "whiteRook", "whiteKing", "whiteQueen", "whiteBishop", "whiteKnight" ]

var blackPiecesClass =   ["blackPawn", "blackRook", "blackKing", "blackQueen", "blackBishop", "blackKnight" ]

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
        i = 0;
        while (i<=6) {
            if (item.classList.contains(whitePiecesClass[i])) {
                currentPiece = whitePiecesClass[i];
                pieceColour = "white";
                break;
            }
            else if (item.classList.contains(blackPiecesClass[i])) {
                currentPiece = blackPiecesClass[i];
                pieceColour = "black"; 
                break;
            }
            else i++;
        }
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

                if (totalMoves%2 === 0) { //show that it is white's turn
                    document.getElementById("black").classList.remove("turnText--visible");
                    document.getElementById("black").classList.add("turnText--hidden");
                    document.getElementById("white").classList.remove("turnText--hidden");
                    document.getElementById("white").classList.add("turnText--visible");
                }
                else { //show that it is black's turn
                    document.getElementById("white").classList.remove("turnText--visible");
                    document.getElementById("white").classList.add("turnText--hidden");
                    document.getElementById("black").classList.remove("turnText--hidden");
                    document.getElementById("black").classList.add("turnText--visible");
                }
            }
        })})
    }

})})


