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

    removePiece(){
        let x = this.piece
        this.piece = null
        return x
    }

    getPiece() {
        return this.piece
    }

    threaten() {
        this.threatened = true
    }

    unthreaten() {
        this.threatened = false
    }

}