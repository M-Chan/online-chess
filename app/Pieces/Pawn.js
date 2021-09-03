//NEED TO INCLUDE: en passant

export default class Pawn {

    constructor(oI, iI, colour, chessBoard) {
        this.oI = oI; //outer index
        this.iI = iI; //inner index
        this.colour = colour;
        this.moves = 0;  //number of moves that a piece has done
        this.chessBoard = chessBoard  //pass in the chessBoard object
        this.aML = []  //aML = availableMoveLocations
        this.description = `${colour}Pawn`
        this.enPassantRight = false;
        this.enPassantLeft = false;
    }

    upgrade() {
        let response = prompt("Which piece would you like to upgrade to, enter 'k' 'b' 'r' or 'q'?", "Queen").charAt(0).toLowerCase();
        return response.charAt(0);
    }

    updateLocation(oI, iI){
        this.oI = oI;
        this.iI = iI;
    }

    increaseMoves() {
        this.moves++;
    }

    getColour() {
        return this.colour
    }

    possibleCaptures() {
        
        let piece1 = null;
        let piece2 = null;

        if (this.colour === "white"){
            
            //"capturable" position (top left)
            if (this.oI>0 && this.iI>0 && this.chessBoard[this.oI-1][this.iI-1].containsOnlyOppositeColour(this.colour)) { 
                // console.log("there is a piece to the left that can be captured")
                this.aML.push([this.oI-1,this.iI-1])
            } 

            //"capturable" position (top right)
            if (this.oI>0 && this.iI<7 && this.chessBoard[this.oI-1][this.iI+1].containsOnlyOppositeColour(this.colour)) { 
                this.aML.push([this.oI-1,this.iI+1])
                // console.log("there is a piece to the right that can be captured")
            }

            //en passant
            if (this.oI === 3){

                try {
                    piece1 = this.chessBoard[this.oI][this.iI-1].getPiece()
                } catch (error) { piece1 = null}

                try {
                    piece2 = this.chessBoard[this.oI][this.iI+1].getPiece()
                } catch (error) { piece2 = null}
                
                
                if (piece1 !== null && piece1.description === "blackPawn" && piece1.moves === 1){
                    this.aML.push([this.oI-1,this.iI-1])
                    // console.log("can capture the black piece en passant")
                    this.enPassantLeft = true
                }
        
                if (piece2 !== null && piece2.description === "blackPawn" && piece2.moves === 1){
                    this.aML.push([this.oI-1,this.iI+1])
                    // console.log("can capture the black piece en passant")
                    this.enPassantRight = true
                }
            
            }

        }

        else { //if the piece is black
            
            //"capturable" position (bottom left)
            if (this.oI<7 && this.iI>0 && this.chessBoard[this.oI+1][this.iI-1].containsOnlyOppositeColour(this.colour)) { 
                this.aML.push([this.oI+1,this.iI-1])
                // console.log("there is a piece to the left bottom that can be captured")
            } 

            //"capturable" position (bottom right)
            if (this.oI<7 && this.iI<7 && this.chessBoard[this.oI+1][this.iI+1].containsOnlyOppositeColour(this.colour)) { 
                this.aML.push([this.oI+1,this.iI+1])
                // console.log("there is a piece to the right bottom that can be captured")
            }

            //en passant
            if (this.oI === 4){ 

                try {
                    piece1 = this.chessBoard[this.oI][this.iI-1].getPiece()
                } catch (error) { piece1 = null}

                try {
                    piece2 = this.chessBoard[this.oI][this.iI+1].getPiece()
                } catch (error) { piece2 = null}
                
                
                if(piece1 != null && piece1.description === "whitePawn" && piece1.moves === 1){
                    this.aML.push([this.oI+1,this.iI-1])
                    // console.log("can capture the white piece en passant")
                    this.enPassantLeft = true
                }

                if (piece2 !== null && piece2.description === "whitePawn" && piece2.moves === 1){
                    this.aML.push([this.oI+1,this.iI+1])
                    // console.log("can capture the white piece en passant")
                    this.enPassantRight = true
                }
            }
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
            return this.firstMove()  //incorporates capture of opponent's piece on the first move
        }

        else { // second move onwards
            this.possibleCaptures();

            try {
                if (this.colour === "white" && this.chessBoard[this.oI-1][this.iI].isEmpty()) { //one square ahead
                    this.aML.push([this.oI-1,this.iI])
                }
                else if (this.colour ==="black" && this.chessBoard[this.oI+1][this.iI].isEmpty()) { //if the chess piece is black  //one square ahead
                    this.aML.push([this.oI+1,this.iI])
                }     
            }
            catch (error) {}

            return this.aML;
        }
    }
}