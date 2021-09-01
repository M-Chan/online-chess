import ChessBoard from "./Chessboard.js"

let chessBoard = new ChessBoard();

let activeSquare;
let chessPiece;
let chessPiece2;
let chessPiece3;
let availableMoveLocations;
let HTMLElement;
let piece;
let description;
let result;
let whoseTurn;
let pieceObj;
let lastActiveSquares = [];

const turnElement =  document.getElementById("turn")

const piecesClass =   ["whitePawn", "blackPawn", "whiteRook", "blackRook", "whiteKing", "blackKing", "whiteQueen", "blackQueen", 
                     "whiteBishop", "blackBishop","whiteKnight", "blackKnight" ]
                    
function removeAvailableSquares() {
    availableMoveLocations.forEach(element => {
        document.getElementById(`${element[0]}${element[1]}`).classList.remove("availableSquares", "pieceInDanger", "enPassant")
    })

    // document.querySelectorAll('.availableSquares').forEach(item => {
    //     item.classList.remove("availableSquares", "pieceInDanger", "enPassant")
    // })

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
                checkPawnUpgrade(item, chessObj) //calling recursively until a valid input is given
        }
        
        //reflecting this change on output chessboard
        item.classList.remove(chessObj)
        item.classList.add(description)

    }

    else return //if the piece is not a pawn then we don't want to do anything

}

function updateChessPiece(item) {

    lastActiveSquares.unshift(activeSquare)
    try {
        lastActiveSquares[0].classList.add("lastLocation")
        lastActiveSquares[1].classList.remove("lastLocation")
    } catch (error) {
        
    }

    while (lastActiveSquares.length > 2){
        lastActiveSquares.pop()
    }

    
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

    whoseTurn = chessBoard.whoseTurn().substring(0,5).toLocaleLowerCase() // is equal to either "white" or "black"

    //when activeSquare is defined and the other square has a piece (i.e. a capture)
    if (!item.classList.contains("empty") && item.classList.contains("availableSquares")){ 
        
        //console.log("capture")

        //colour of the piece we want to capture must be different to the piece we want to move
        if (chessBoard.getPiece(activeSquare.id).getColour() !== chessBoard.getPiece(item.id).getColour()){
            chessPiece = ($(item).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)).toString() //captured piece
            chessPiece2 = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)).toString() //capturing piece
            // the jQuery code ABOVE returns an array but we need a string and hence the .toString() method is used 

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
            chessPiece = ($(activeSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)).toString()
            // the jQuery code ABOVE returns an array but we need a string and hence the .toString() method is used 
            
            item.classList.remove("empty")
            activeSquare.classList.remove(chessPiece)
            activeSquare.classList.remove("activeSquare")
            activeSquare.classList.add("empty")
            item.classList.add(chessPiece)

            //for en passant captures
            if (item.classList.contains("enPassant")){
                
                if (chessPiece === "whitePawn"){
                    let belowActiveSquare = document.getElementById(`${Number(item.id.charAt(0))+1}${item.id.charAt(1)}`)
                    chessPiece2 = ($(belowActiveSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)).toString()
                    belowActiveSquare.classList.remove(chessPiece2)
                    chessBoard.clearSquare(belowActiveSquare.id) //we also update the 2D array to reflect that this en-passant capture
                    belowActiveSquare.classList.add("empty")
                }

                else { //must be a black piece then
                    let aboveActiveSquare = document.getElementById(`${Number(item.id.charAt(0))-1}${item.id.charAt(1)}`)
                    chessPiece2 = ($(aboveActiveSquare).attr("class").split(/\s+/)).filter(value => piecesClass.includes(value)).toString()
                    aboveActiveSquare.classList.remove(chessPiece2)
                    chessBoard.clearSquare(aboveActiveSquare.id) //we also update the 2D array to reflect that this en-passant capture
                    aboveActiveSquare.classList.add("empty")
                }
            }

            removeAvailableSquares()
            updateChessPiece(item)
            
            //check if the piece is a pawn and if it is eligible to be upgraded
            checkPawnUpgrade(item, chessPiece)
            
            //after the move we don't want any piece to be active
            activeSquare = undefined
        }

        else {
            activeSquare.classList.remove("activeSquare")
            activeSquare = undefined
            removeAvailableSquares()
        }

    }

    //selecting the active square
    else if (!item.classList.contains("empty")) { //not empty then make it active square
        
        if (chessBoard.getPiece(item.id).getColour() == whoseTurn){
        
            turnElement.classList.remove("wrongTurn")
        
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
            
            //this is the actual piece object that the user is interested in moving
            chessPiece3 = chessBoard.getPiece(activeSquare.id)
    
            //marking all these locations on the chessboard with the "availableSquares class so they are marked with a green circle in them"
            availableMoveLocations.forEach(element => {
                HTMLElement = document.getElementById(`${element[0]}${element[1]}`)

                
                if (!HTMLElement.classList.contains("empty")){
                    HTMLElement.classList.add("pieceInDanger") //if there's a piece then we make it red basically
                }

                else if (chessPiece3.colour === "white"){
                    if (chessPiece3.enPassantRight){
                        document.getElementById(`${Number(activeSquare.id.charAt(0))-1}${Number(activeSquare.id.charAt(1))+1}`).classList.add("enPassant")
                    }
                    else if (chessPiece3.enPassantLeft){
                        document.getElementById(`${Number(activeSquare.id.charAt(0))-1}${Number(activeSquare.id.charAt(1))-1}`).classList.add("enPassant")
                    }
                }

                //if it's a black chess piece
                else { 
                    
                    if (chessPiece3.enPassantRight){
                        document.getElementById(`${Number(activeSquare.id.charAt(0))+1}${Number(activeSquare.id.charAt(1))+1}`).classList.add("enPassant")
                    }

                    else if(chessPiece3.enPassantLeft){
                        document.getElementById(`${Number(activeSquare.id.charAt(0))+1}${Number(activeSquare.id.charAt(1))-1}`).classList.add("enPassant")
                    }
                }

                HTMLElement.classList.add("availableSquares")
                
            })
        }

        else {
            turnElement.className = "wrongTurn"
        }

    }

})})

