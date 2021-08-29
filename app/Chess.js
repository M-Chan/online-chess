import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let chessPiece;
let chessPiece2;
let pieceObj;
let availableMoveLocations;
let HTMLElement;

var piecesClass =   ["whitePawn", "blackPawn", "whiteRook", "blackRook", "whiteKing", "blackKing", "whiteQueen", "blackQueen", 
                     "whiteBishop", "blackBishop","whiteKnight", "blackKnight" ]
                    
/*
while game not concluded, alternate between white and black
*/

function removeAvailableSquares() {
    availableMoveLocations.forEach(element => {
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

// IF THE PIECE IS A PAWN AND IT HAS MADE OVER 5 MOVES THEN CHECK IT HAS REACHED THE EDGE OF THE BOARD AND CALL THE UPGRADE METHOD
function checkPawnUpgrade(item, chessObj) {

    console.log("hi")
    //     let piece = chessBoard.getPiece(activeSquare.id)
//     let description
//     //reached the end of board
//     if ((piece.description === "white pawn") && (piece.oI === 0) || (piece.description === "black pawn") && (piece.oI === 7)){ 
        
//         switch(piece.upgrade()) {
//             case k:
//                 chessBoard.makeNewKnight(piece.oI, piece.iI, piece.colour)         
//                 description = `${piece.getColour()}Knight`
//                 break;
//             case b:
//                 chessBoard.makeNewBishop(piece.oI, piece.iI, piece.colour)
//                 description = `${piece.getColour()}Bishop`
//                 break;
//             case r:
//                 chessBoard.makeNewRook(piece.oI, piece.iI, piece.colour)
//                 description = `${piece.getColour()}Rook`
//                 break;
//             case q:
//                 chessBoard.makeNewQueen(piece.oI, piece.iI, piece.colour)
//                 description = `${piece.getColour()}Queen`
//                 break;
//             default:
//                 piece.upgrade()
//         }
//         //now we need to actually reflect this change in the 2D array on the actual chessboard

//         item.classList.remove(chessObj)
//         item.classList.add(description)

//     }

//     else return //if the piece is not a pawn then we don't want to do anything

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
            
            //check if the piece is a pawn and if it is eligible to be upgraded
            checkPawnUpgrade(item, chessPiece2)

        }
    }

    // making the move - //if empty and active square is defined - can only move to a valid square
    else if (item.classList.contains("empty") && activeSquare !== undefined){ 

        if (item.classList.contains("availableSquares")){
            chessPiece = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value))
            item.classList.remove("empty")
            activeSquare.classList.remove(chessPiece)
            activeSquare.classList.remove("activeSquare")
            activeSquare.classList.add("empty")
            item.classList.add(chessPiece)
    
            removeAvailableSquares()
            updateChessPiece(item)

            //check if the piece is a pawn and if it is eligible to be upgraded
            checkPawnUpgrade(item, chessPiece)
        }

        else {
            activeSquare.classList.remove("activeSquare")
            removeAvailableSquares()
        }

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
            HTMLElement = document.getElementById(`${element[0]}${element[1]}`)
            if (!HTMLElement.classList.contains("empty")){
                HTMLElement.classList.add("pieceInDanger")
            }
            
            HTMLElement.classList.add("availableSquares")
            
        })
    }

})})

