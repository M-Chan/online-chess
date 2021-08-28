import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let chessPiece;
let pieceObj;

let availableMoveLocations;

var piecesClass =   ["whitePawn", "blackPawn", "whiteRook", "blackRook", "whiteKing", "blackKing", "whiteQueen", "blackQueen", 
                     "whiteBishop", "blackBishop","whiteKnight", "blackKnight" ]
                    
/*
while game not concluded, alternate between white and black
*/

// WE NEED TO UPDATE THE LOCATIONS ATTRIBUTES OF THE PIECES WHEN THEY ARE MOVED TO A DIFFERENT SQUARE

document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
    //whatever is here is executed whenever a square is clicked
    
    //selecting the active square
    if (!item.classList.contains("empty")) { //not empty then make it active square
        if (activeSquare !== undefined){
            activeSquare.classList.remove("activeSquare")
            
            
            availableMoveLocations.forEach(element => {
                document.getElementById(`${element[0]}${element[1]}`).classList.remove("availableSquares")
            })
        }
        activeSquare = item
        activeSquare.classList.add("activeSquare")
        
        availableMoveLocations = chessBoard.board[Number(activeSquare.id.charAt(0))][Number(activeSquare.id.charAt(1))].getPiece().move()

        availableMoveLocations.forEach(element => {
           document.getElementById(`${element[0]}${element[1]}`).classList.add("availableSquares")
            
        })
    }

    // making the move
    else if (item.classList.contains("empty") && activeSquare !== undefined){ //if empty and active square is defined
        
        availableMoveLocations.forEach(element => {
           document.getElementById(`${element[0]}${element[1]}`).classList.remove("availableSquares")
        })
        
        availableMoveLocations=[]
        
        item.classList.remove("empty")
        chessPiece = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value))
        activeSquare.classList.remove(chessPiece)
        activeSquare.classList.remove("activeSquare")
        activeSquare.classList.add("empty")
        item.classList.add(chessPiece)

        if (activeSquare.classList.contains("whitePawn") || activeSquare.classList.contains("whitePawn")){
            //calling the move method for the pawn object


        }


        else if (activeSquare.classList.contains("whiteKing") || activeSquare.classList.contains("whiteKing")){
            //call the move method for the king object
        }



        else if (activeSquare.classList.contains("whiteQueen") || activeSquare.classList.contains("whiteQueen")){
            //call the move method for the queen object
        }


        else if (activeSquare.classList.contains("whiteRook") || activeSquare.classList.contains("whiteRook")){
            //call the move method for the rook object
        }


        else if (activeSquare.classList.contains("whiteKnight") || activeSquare.classList.contains("whiteKnight")){
            //call the move method for the knight object
        }


        else if (activeSquare.classList.contains("whiteBishop") || activeSquare.classList.contains("whiteBishop")){
            //call the move method for the bishop object
        }


        pieceObj = chessBoard.board[Number(activeSquare.id.charAt(0))][Number(activeSquare.id.charAt(1))].getPiece()
        pieceObj.increaseMoves()
        pieceObj.updateLocation(Number(item.id.charAt(0)), Number(item.id.charAt(1)))

        
        //this method updates the 2D array so that whatever the user has done is reflected in the data structure
        chessBoard.movePiece(   Number(activeSquare.id.charAt(0)), Number(activeSquare.id.charAt(1)), 
                                Number(item.id.charAt(0)), Number(item.id.charAt(1))
                            )


        activeSquare = undefined

        
    }

})})

