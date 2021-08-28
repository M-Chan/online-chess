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