export default class Square {

    active = false;
    threatened = false;
    piece = null;

    constructor(identifier){
        this.identifier = identifier; //a string with the file and rank describing the location of that square
    }

    setPiece(piece) {
        this.piece = piece;
    }

    isEmpty() {
        return (this.piece === null);
    }

    removePiece(){
        let x = this.piece;
        this.piece = null;
        return x;
    }

    getPiece(){
        return this.piece;
    }

    setActive() {
        this.active = true;
    }

    setUnActive(){
        this.active = false;
    }

    containsBlack(){
        try {
            return (this.piece.colour === "black");
        } catch (error) {
            return false;
        }
    }

    containsWhite(){
        try {
            return (this.piece.colour === "white");
        } catch (error) {
            return false;
        }
    }

    threaten() {
        this.threatened = true;
    }

    unthreaten() {
        this.threatened = false;
    }

}