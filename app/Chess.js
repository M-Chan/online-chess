import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let chessPiece;

let pieceObj;
let availableMoveLocations;

let totalMoves = 0;
let pieceColour;

var tempElement
let i = 0

var whitePiecesClass =   ["whitePawn", "whiteRook", "whiteKing", "whiteQueen", "whiteBishop", "whiteKnight" ]

var blackPiecesClass =   ["blackPawn", "blackRook", "blackKing", "blackQueen", "blackBishop", "blackKnight" ]


var avaiablePlacesDiv = document.createElement("div");
avaiablePlacesDiv.classList.add('availableSquares');


document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
    
    //whatever is here is executed whenever a square is clicked
    //console.log(chessBoard.board[item.id.charAt(1)][item.id.charCodeAt(0) - 97])
    
    if (activeSquare === undefined) {
        if (!item.classList.contains("empty")) { //has a chess piece on it
            findchessPiece();
            if (((totalMoves%2 === 0) && (pieceColour === "white")) || ((totalMoves%2 != 0) && (pieceColour === "black"))) {
                makeActive();
            }
        }
    }
    else { //square already selected
        if (!item.classList.contains("empty")) { //has a chess piece on it
            activeSquare.classList.remove("activeSquare");
            availableMoveLocations.forEach(element => {
                tempElement = document.getElementById(`${element[0]}${element[1]}`);
                // tempElement.removeChild(tempElement.firstChild);
            })
            availableMoveLocations=[]

            findchessPiece();
            if (((totalMoves%2 === 0) && (pieceColour === "white")) || ((totalMoves%2 != 0) && (pieceColour === "black"))) {
                makeActive();
            }
        }
    }
    
    function findchessPiece() { //sets the current piece to the piece on the selected square
        i = 0;
        while (i<=6) {
            if (item.classList.contains(whitePiecesClass[i])) {
                chessPiece = whitePiecesClass[i];
                pieceColour = "white";
                break;
            }
            else if (item.classList.contains(blackPiecesClass[i])) {
                chessPiece= blackPiecesClass[i];
                pieceColour = "black"; 
                break;
            }
            else i++;
        }
    }

    function makeActive() { //selects the current square and allows its piece to move to an empty quare
        activeSquare = item;
        activeSquare.classList.add("activeSquare");
        console.log("Current piece is", chessPiece);

        availableMoveLocations = chessBoard.board[Number(activeSquare.id.charAt(0))][Number(activeSquare.id.charAt(1))].getPiece().move();

        availableMoveLocations.forEach(element => {
           tempElement = document.getElementById(`${element[0]}${element[1]}`);
           tempElement.appendChild(avaiablePlacesDiv)

        })

        document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
            if ((item.classList.contains("empty") && chessPiece != null) && (((totalMoves%2 === 0) && (pieceColour === "white")) || ((totalMoves%2 != 0) && (pieceColour === "black")))) {
                activeSquare.classList.remove("activeSquare");
                activeSquare.classList.remove(chessPiece);
                activeSquare.classList.add("empty")
                activeSquare === undefined;
                item.classList.remove("empty");
                item.classList.add(chessPiece);
                chessPiece = null;
                totalMoves++;
                console.log(totalMoves);
                pieceColour = null;
                
                if (activeSquare.classList.contains("whitePawn") || activeSquare.classList.contains("blackPawn")) {
                    // call the move method for the pawn piece
                }
                
                else if (activeSquare.classList.contains("whiteKnight") || activeSquare.classList.contains("blackKnight")) {
                    // call the move method for the knight piece
                }

                else if (activeSquare.classList.contains("whiteBishop") || activeSquare.classList.contains("blackBishop")) {
                    // call the move method for the bishop piece
                }

                else if (activeSquare.classList.contains("whiteQueen") || activeSquare.classList.contains("blackQueen")) {
                    // call the move method for the queen piece
                }

                else if (activeSquare.classList.contains("whiteKing") || activeSquare.classList.contains("blackKing")) {
                    // call the move method for the king piece
                }

                else if (activeSquare.classList.contains("whiteRook") || activeSquare.classList.contains("blackRook")) {
                    // call the move method for the rook piece
                }
                

                pieceObj = chessBoard.board[Number(activeSquare.id.charAt(0))][Number(activeSquare.id.charAt(1))].getPiece()
                pieceObj.increaseMoves()
                pieceObj.updateLocation(Number(item.id.charAt(0)), Number(item.id.charAt(1)))


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


