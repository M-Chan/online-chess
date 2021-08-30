export default class Square {

    threatenedByWhite = false
    threatenedByBlack = false
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

    containsOppositeColour(colour) {
        try {
            return (this.piece.colour !== colour)
        } catch (error) {
            return true
        }
        
    }

    containsOnlyOppositeColour(colour) {
        try {
            return (this.piece.colour !== colour)
        } catch (error) {
            return false
        }
    }

    whichColourPiece(){
        if (this.piece == null){
            return "empty"
        }

        else return this.piece.colour
    }

    threaten(colour) {
        if (colour === "white"){
            this.threatenedByWhite = true
        }

        else if (colour === "black") {
            this.threatenedByBlack = true
        }

        else return
        
    }

    unthreaten(colour) {
        if (colour === "white"){
            this.threatenedByWhite = false
        }

        else if (colour === "black") {
            this.threatenedByBlack = false
        }

        else return
    }

}
