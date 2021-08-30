import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let chessPiece;
let chessPiece2;
let availableMoveLocations;
let HTMLElement;
let piece;
let description;
let result;
let whoseTurn;
let pieceObj;

const piecesClass =   ["whitePawn", "blackPawn", "whiteRook", "blackRook", "whiteKing", "blackKing", "whiteQueen", "blackQueen", 
                     "whiteBishop", "blackBishop","whiteKnight", "blackKnight" ]
                    
/*
while game not concluded, alternate between white and black
*/

function removeAvailableSquares() {
    availableMoveLocations.forEach(element => {
        document.getElementById(`${element[0]}${element[1]}`).classList.remove("availableSquares", "pieceInDanger")
    })

}

// if the piece is a pawn and it has made over 5 moves then check it has reached the edge of the board and call the upgrade method
function checkPawnUpgrade(item, chessObj) { //item is a HTML DOM element and the second is a string describing the piece

    piece = chessBoard.getPiece(item.id)
    
    //reached the end of board
    if ((piece.description === "whitePawn") && (piece.oI === 0) || (piece.description === "blackPawn") && (piece.oI === 7)){ 
        
        result = piece.upgrade()  //NOTE: result only contains the first character of the string returned

        //now we need to actually reflect this change in the 2D array on the actual chessboard
        switch(result) {
            case "k":
                description = chessBoard.makeNewKnight(piece.oI, piece.iI, piece.colour)         
                break;
            case "b":
                description = chessBoard.makeNewBishop(piece.oI, piece.iI, piece.colour)
                break;
            case "r":
                description = chessBoard.makeNewRook(piece.oI, piece.iI, piece.colour)
                break;
            case "q":
                description = chessBoard.makeNewQueen(piece.oI, piece.iI, piece.colour)
                break;
            default:
                piece.upgrade()
        }
        
        //reflecting this change on output chessboard
        item.classList.remove(chessObj)
        item.classList.add(description)

    }

    else return //if the piece is not a pawn then we don't want to do anything

}

function updateChessPiece(item) {

    availableMoveLocations=[]
    pieceObj = chessBoard.getPiece(activeSquare.id)
    pieceObj.increaseMoves()
    pieceObj.updateLocation(Number(item.id.charAt(0)), Number(item.id.charAt(1)))

    //this method updates the 2D array so that whatever the user has done is reflected in the data structure
    whoseTurn = chessBoard.movePiece(activeSquare.id.charAt(0), activeSquare.id.charAt(1), item.id.charAt(0), item.id.charAt(1))
    document.getElementById("turn").innerText = whoseTurn
}


function deactivateActiveSquare(){
    activeSquare.classList.remove("activeSquare")
    removeAvailableSquares()
}


document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
    //whatever is here is executed whenever a square is clicked

    //when activeSquare is defined and the other square has a piece (i.e. a capture)
    if (!item.classList.contains("empty") && item.classList.contains("availableSquares")){ 
        
        //console.log("capture")

        //colour of the piece we want to capture must be different to the piece we want to move
        if (chessBoard.getPiece(activeSquare.id).getColour() !== chessBoard.getPiece(item.id).getColour()){
            chessPiece = ($(item).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)) //captured piece
            chessPiece2 = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)) //capturing piece
    
            // the jQuery code above returns an array but we need a string and hence the .toString() method is used 
            chessPiece.toString()
            chessPiece2.toString()

            item.classList.remove(chessPiece)
            activeSquare.classList.remove(chessPiece2)
            activeSquare.classList.remove("activeSquare")
            activeSquare.classList.add("empty")
            item.classList.add(chessPiece2)

            removeAvailableSquares()
            updateChessPiece(item)
            //check if the piece is a pawn and if it is eligible to be upgraded
            checkPawnUpgrade(item, chessPiece2)

            //after the move we don't want any piece to be active
            activeSquare = undefined

        }
    }

    // making the move - //if empty and active square is defined - can only move to a valid square
    else if (item.classList.contains("empty") && activeSquare !== undefined){ 

        if (item.classList.contains("availableSquares")){
            //console.log("moving to empty square")
            chessPiece = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value))
            
            // the jQuery code above returns an array but we need a string and hence the .toString() method is used 
            chessPiece.toString()
            
            item.classList.remove("empty")
            activeSquare.classList.remove(chessPiece)
            activeSquare.classList.remove("activeSquare")
            activeSquare.classList.add("empty")
            item.classList.add(chessPiece)
    
            removeAvailableSquares()
            updateChessPiece(item)
            
            //check if the piece is a pawn and if it is eligible to be upgraded
            checkPawnUpgrade(item, chessPiece)

            //after the move we don't want any piece to be active
            activeSquare = undefined
        }

        else {
            //console.log("unselected the piece")
            activeSquare.classList.remove("activeSquare")
            activeSquare = undefined
            removeAvailableSquares()
        }

    }

    //selecting the active square
    else if (!item.classList.contains("empty")) { //not empty then make it active square
        
        if (item.classList.contains("activeSquare")){
            deactivateActiveSquare()
            return
        }
        
        else if (activeSquare !== undefined){
            deactivateActiveSquare()
        }
        activeSquare = item
        activeSquare.classList.add("activeSquare")
        
        //getting all the locations that the this piece is able to move to
        availableMoveLocations = chessBoard.getPiece(activeSquare.id).move()
        console.log(availableMoveLocations)

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

