export default class Square {

    threatened = false
    piece = null

    constructor(identifier){
        this.identifier = identifier //a string with the file and rank describing the location of that square
    }

    addPiece(piece) {
        this.piece = piece
    }

    setPiece(piece) {
        this.piece = piece
    }
    
    isEmpty() {
        return (this.piece === null)
    }

    removePiece(){
        let x = this.piece
        this.piece = null
        return x
    }

    getPiece() {
        return this.piece
    }

    containsBlack(){
        try {
            return (this.piece.colour === "black")
        } catch (error) {
            return false;
        }
    }
    
    containsWhite(){
        try {
            return (this.piece.colour === "white")
        } catch (error) {
            return false;
        }
    }

    threaten() {
        this.threatened = true
    }

    unthreaten() {
        this.threatened = false
    }

}




// if (activeSquare.classList.contains("whitePawn") || activeSquare.classList.contains("whitePawn")){
//     //calling the move method for the pawn object


// }


// else if (activeSquare.classList.contains("whiteKing") || activeSquare.classList.contains("whiteKing")){
//     //call the move method for the king object
// }



// else if (activeSquare.classList.contains("whiteQueen") || activeSquare.classList.contains("whiteQueen")){
//     //call the move method for the queen object
// }


// else if (activeSquare.classList.contains("whiteRook") || activeSquare.classList.contains("whiteRook")){
//     //call the move method for the rook object
// }


// else if (activeSquare.classList.contains("whiteKnight") || activeSquare.classList.contains("whiteKnight")){
//     //call the move method for the knight object
// }


// else if (activeSquare.classList.contains("whiteBishop") || activeSquare.classList.contains("whiteBishop")){
//     //call the move method for the bishop object
// }