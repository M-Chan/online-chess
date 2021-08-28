import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let chessPiece;
let chessPiece2;
let pieceObj;

let availableMoveLocations;

var piecesClass =   ["whitePawn", "blackPawn", "whiteRook", "blackRook", "whiteKing", "blackKing", "whiteQueen", "blackQueen", 
                     "whiteBishop", "blackBishop","whiteKnight", "blackKnight" ]
                    
/*
while game not concluded, alternate between white and black
*/

function removeAvailableSquares() {
    availableMoveLocations.forEach(element => {
        // if (!(document.getElementById(`${element[0]}${element[1]}`).classList.contains("empty"))){
        //     document.getElementById(`${element[0]}${element[1]}`).classList.remove("pieceInDanger")
        // }
        // else {
            //document.getElementById(`${element[0]}${element[1]}`).classList.add("availableSquares")
        //}
        
        document.getElementById(`${element[0]}${element[1]}`).classList.remove("availableSquares", "pieceInDanger")
    })
}

function updateChessPiece(item) {
    availableMoveLocations=[]
    pieceObj = chessBoard.getPiece(activeSquare.id)
    pieceObj.increaseMoves()
    pieceObj.updateLocation(Number(item.id.charAt(0)), Number(item.id.charAt(1)))

    //this method updates the 2D array so that whatever the user has done is reflected in the data structure
    chessBoard.movePiece(activeSquare.id.charAt(0), activeSquare.id.charAt(1), item.id.charAt(0), item.id.charAt(1))
    activeSquare = undefined
}


document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
    //whatever is here is executed whenever a square is clicked

    //when activeSquare is defined and the other square has a piece (i.e. a capture)
    if (!(item.classList.contains("empty") && activeSquare !== undefined) && item.classList.contains("availableSquares")){ 
        
        //colour of the piece we want to capture must be different to the piece we want to move
        if (chessBoard.getPiece(activeSquare.id).getColour() !== chessBoard.getPiece(item.id).getColour()){
            chessPiece = ($(item).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)) //captured piece
            chessPiece2 = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)) //capturing piece
    
            item.classList.remove(chessPiece)
            activeSquare.classList.remove(chessPiece2)
            activeSquare.classList.remove("activeSquare")
            activeSquare.classList.add("empty")
            item.classList.add(chessPiece2)

            removeAvailableSquares()
            updateChessPiece(item)
        }
    }

    // making the move - //if empty and active square is defined - can only move to a valid square
    else if (item.classList.contains("empty") && activeSquare !== undefined && item.classList.contains("availableSquares")){ 

        chessPiece = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value))
        item.classList.remove("empty")
        activeSquare.classList.remove(chessPiece)
        activeSquare.classList.remove("activeSquare")
        activeSquare.classList.add("empty")
        item.classList.add(chessPiece)

        removeAvailableSquares()
        updateChessPiece(item)

    }

    //selecting the active square
    else if (!item.classList.contains("empty")) { //not empty then make it active square
        if (activeSquare !== undefined){
            activeSquare.classList.remove("activeSquare")
            
            removeAvailableSquares()
        }
        activeSquare = item
        activeSquare.classList.add("activeSquare")
        
        //getting all the locations that the this piece is able to move to
        availableMoveLocations = chessBoard.getPiece(activeSquare.id).move()
        
        //marking all these locations on the chessboard with the "availableSquares class so they are marked with a green circle in them"
        availableMoveLocations.forEach(element => {
            // if (!(document.getElementById(`${element[0]}${element[1]}`).classList.contains("empty"))){ //if not empty then apply a different class
            //     document.getElementById(`${element[0]}${element[1]}`).classList.add("pieceInDanger")
            // }
            // else {
            //     document.getElementById(`${element[0]}${element[1]}`).classList.add("availableSquares")
            // }

            document.getElementById(`${element[0]}${element[1]}`).classList.add("availableSquares")
        })
    }

})})

