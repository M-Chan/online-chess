//NEED TO INCLUDE: en passant

export default class Pawn {

    #description

    constructor(oI,iI, colour, chessBoard) {
        this.oI = oI; //outer index
        this.iI = iI; //inner index
        this.colour = colour;
        this.moves = 0;  //number of moves that a piece has done
        this.chessBoard = chessBoard  //pass in the chessBoard object
        this.aML = []  //aML = availableMoveLocations
        this.description = `${colour} pawn`
        
    }

    upgrade() {
        return prompt("Which piece would you like to upgrade to, enter 'k' 'b' 'r' or 'q'?", "q").charAt(0).toLowerCase();
    }

    getColour(){
        return this.colour;
    }

    updateLocation(oI, iI){
        this.oI = oI;
        this.iI = iI;
    }

    increaseMoves() {
        this.moves++;
    }

    getDescription(){
        return this.description;
    }

    possibleCaptures() {

        if (this.colour === "white"){
            try {
                if ((this.chessBoard[this.oI-1][this.iI-1]).containsBlack()) { //"capturable" position (top left)
                    this.aML.push([this.oI-1,this.iI-1])
                } 
            } catch (error) {
                
            }

            try {
                if ((this.chessBoard[this.oI-1][this.iI+1]).containsBlack()) { //"capturable" position (top right)
                    this.aML.push([this.oI-1,this.iI+1])
                }
            } catch (error) {
                
            }

            //en passant capture

            // try {
            //     let piece = this.chessBoard[this.oI][this.iI-1].getPiece()
            //     if ((piece.getDescription() === "black pawn") && (piece.getMoves() === 1)){
            //         this.aML.push([this.oI,this.iI-1])
            //     }

            //     console.log("hello")
            // } catch (error) {
                
            // }

            // //en passant capture
            // try {
            //     let piece = this.chessBoard[this.oI][this.iI+1].getPiece()
            //     if ((piece.getDescription() === "black pawn") && (piece.getMoves() === 1)){
            //         this.aML.push([this.oI,this.iI+1])
            //     }
            //     console.log("hello")
            // } catch (error) {
                
            // }
        }

        else {
            try {
                if ((this.chessBoard[this.oI+1][this.iI-1]).containsWhite()) { //"capturable" position (top left)
                    this.aML.push([this.oI+1,this.iI-1])
                }
            } catch (error) {
                
            }

            try {
                if((this.chessBoard[this.oI+1][this.iI+1]).containsWhite()) { //"capturable" position (top right)
                    this.aML.push([this.oI+1,this.iI+1])
                }
            } catch (error) {
                
            }

            //en passant capture
            // try {
            //     let piece = this.chessBoard[this.oI][this.iI-1].getPiece()
            //     if ((piece.getDescription() === "white pawn") && (piece.getMoves() === 1)){
            //         this.aML.push([this.oI,this.iI-1])
            //     }
            //     console.log("hello")
            // } catch (error) {
                
            // }

            // //en passant capture
            // try {
            //     let piece = this.chessBoard[this.oI][this.iI+1].getPiece()
            //     if ((piece.getDescription() === "white pawn") && (piece.getMoves() === 1)){
            //         this.aML.push([this.oI,this.iI+1])
            //     }
            //     console.log("hello")
            // } catch (error) {
                
            // }
        }

    }

    firstMove(){
        if (this.colour === "white"){
            if (this.chessBoard[this.oI-1][this.iI].isEmpty()){      //one square ahead
                this.aML.push([this.oI-1,this.iI])
                
                if ((this.chessBoard[this.oI-2][this.iI]).isEmpty()) { //two squares ahead
                    this.aML.push([this.oI-2,this.iI])
                }
            }
        }

        else { //when it's a black pawn
            
            if ((this.chessBoard[this.oI+1][this.iI]).isEmpty()){      //one square ahead
                this.aML.push([this.oI+1,this.iI])
                
                if ((this.chessBoard[this.oI+2][this.iI]).isEmpty()) { //two squares ahead
                    this.aML.push([this.oI+2,this.iI])
                }
            }

        }

        this.possibleCaptures()
        return this.aML

    }

    move() { //this method also incorporates capture

        this.aML = []
    
        if (this.moves === 0){
            return this.firstMove()
        }

        else { // second move onwards
            this.possibleCaptures();

            try {
                if (this.colour === "white" && this.chessBoard[this.oI-1][this.iI].isEmpty()) { //one square ahead
                    this.aML.push([this.oI-1,this.iI])
                }
                else if ((this.chessBoard[this.oI+1][this.iI]).isEmpty()) { //if the chess piece is black  //one square ahead
                    this.aML.push([this.oI+1,this.iI])
                }    
            } catch (error) {
                
            }

            return this.aML;
        }
    }

}