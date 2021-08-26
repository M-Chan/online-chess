export default class Square {

    active = false
    threatened = false
    piece = null

    constructor(identifier){
        this.identifier = identifier //a string with the file and rank describing the location of that square
    }

    addPiece(piece) {
        this.piece = piece
    }

    removePiece(){
        this.piece = null
    }

    setActive() {
        this.active = true
    }

    setUnActive(){
        this.active = false
    }

    threaten() {
        this.threatened = true
    }

    unthreaten() {
        this.threatened = false
    }

}