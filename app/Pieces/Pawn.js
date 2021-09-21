export default class Pawn {

    constructor(oI, iI, colour, chessBoard) {
        this.oI = oI; //outer index
        this.iI = iI; //inner index
        this.colour = colour;
        this.moves = 0;  //number of moves that a piece has done
        this.chessBoard = chessBoard;  //pass in the chessBoard ARRAY
        this.aML = [];  //aML = availableMoveLocations
        this.description = `${colour}Pawn`;
        this.enPassantRight = false;
        this.enPassantLeft = false;
        this.legalMovesNo = 0;
    }

    upgrade() {
        let response = prompt("Which piece would you like to upgrade to, enter 'k' 'b' 'r' or 'q'?", "Queen").charAt(0).toLowerCase();
        return response.charAt(0);
    }

    updateLocation(oI, iI) {
        this.oI = oI;
        this.iI = iI;
    }

    increaseMoves() {
        this.moves++;
    }

    getColour() {
        return this.colour;
    }

    possibleCaptures(mode) {
        
        let piece1 = null;
        let piece2 = null;

        if (this.colour === "white") {
            
            //"capturable" position (top left)
            if (this.oI>0 && this.iI>0 && this.chessBoard[this.oI-1][this.iI-1].containsOnlyOppositeColour(this.colour)) { 
                // console.log("there is a piece to the left that can be captured");
                this.aML.push([this.oI-1,this.iI-1]);
            } 

            //"capturable" position (top right)
            if (this.oI>0 && this.iI<7 && this.chessBoard[this.oI-1][this.iI+1].containsOnlyOppositeColour(this.colour)) { 
                this.aML.push([this.oI-1,this.iI+1]);
                // console.log("there is a piece to the right that can be captured");
            }

            //en passant
            if (this.oI === 3) {

                try {
                    piece1 = this.chessBoard[this.oI][this.iI-1].getPiece();
                }
                catch (error) {piece1 = null}

                try {
                    piece2 = this.chessBoard[this.oI][this.iI+1].getPiece();
                }
                catch (error) {piece2 = null}
                
                
                if (piece1 !== null && piece1.description === "blackPawn" && piece1.moves === 1) {
                    this.aML.push([this.oI-1,this.iI-1]);
                    // console.log("can capture the black piece en passant");
                    this.enPassantLeft = true;
                }
                else {
                    this.enPassantLeft = false;
                }
        
              
                if (piece2 !== null && piece2.description === "blackPawn" && piece2.moves === 1) {
                    this.aML.push([this.oI-1,this.iI+1]);
                    // console.log("can capture the black piece en passant");
                    this.enPassantRight = true;
                }

                else {
                    this.enPassantRight = false;
                }
            }
        }

        else { //if the piece is black

            //"capturable" position (bottom left)
            if (this.oI<7 && this.iI>0 && this.chessBoard[this.oI+1][this.iI-1].containsOnlyOppositeColour(this.colour)) { 
                this.aML.push([this.oI+1,this.iI-1]);
                // console.log("there is a piece to the left bottom that can be captured");
            } 

            //"capturable" position (bottom right)
            if (this.oI<7 && this.iI<7 && this.chessBoard[this.oI+1][this.iI+1].containsOnlyOppositeColour(this.colour)) { 
                this.aML.push([this.oI+1,this.iI+1]);
                // console.log("there is a piece to the right bottom that can be captured");
            }

            //en passant
            if (this.oI === 4) { 

                try {
                    piece1 = this.chessBoard[this.oI][this.iI-1].getPiece();
                }
                catch (error) {piece1 = null}

                try {
                    piece2 = this.chessBoard[this.oI][this.iI+1].getPiece();
                }
                catch (error) {piece2 = null}
                
                
                if(piece1 != null && piece1.description === "whitePawn" && piece1.moves === 1) {
                    this.aML.push([this.oI+1,this.iI-1]);
                    // console.log("can capture the white piece en passant");
                    this.enPassantLeft = true;
                }
                else {
                    this.enPassantLeft = false;
                }

             
                if (piece2 !== null && piece2.description === "whitePawn" && piece2.moves === 1) {
                    this.aML.push([this.oI+1,this.iI+1]);
                    // console.log("can capture the white piece en passant");
                    this.enPassantRight = true;
                }
                else {
                    this.enPassantRight = false;
                }
            }
        }
        if (mode === "threaten") return this.aML;
    }

    firstMove() {
        if (this.colour === "white") {
            if (this.chessBoard[this.oI-1][this.iI].isEmpty()) {      
                this.aML.push([this.oI-1,this.iI]); //one square ahead

                if ((this.chessBoard[this.oI-2][this.iI]).isEmpty()) { 
                    this.aML.push([this.oI-2,this.iI]); //two squares ahead
                }
            }
        }

        else { //when it's a black pawn
            if ((this.chessBoard[this.oI+1][this.iI]).isEmpty()) {     
                this.aML.push([this.oI+1,this.iI]); //one square ahead

                if ((this.chessBoard[this.oI+2][this.iI]).isEmpty()) { 
                    this.aML.push([this.oI+2,this.iI]); //two squares ahead
                }
            }
        }
        this.possibleCaptures();
        return this.aML;
    }

    move() { //this method also incorporates capture
        this.aML = [];
    
        if (this.moves === 0) {
            return this.firstMove();  //incorporates capture of opponent's piece on the first move
        }

        else { // second move onwards
            this.possibleCaptures();

            try {
                if (this.colour === "white" && this.chessBoard[this.oI-1][this.iI].isEmpty()) { 
                    this.aML.push([this.oI-1,this.iI]); //one square ahead
                }
                else if (this.colour ==="black" && this.chessBoard[this.oI+1][this.iI].isEmpty()) { //if the chess piece is black
                    this.aML.push([this.oI+1,this.iI]); //one square ahead
                }     
            }
            catch (error) {}

            return this.aML; //this is a 2D array
        }
    }

    threaten() { //uses the possibleCaptures method and move locations to see which squares this piece is threatening
        this.possibleCaptures("threaten").forEach(index => this.chessBoard[index[0]][index[1]].threaten(this.colour));
    }


    testCanMove() { // see if the piece can move and their king won't be in check
        this.legalMovesNo = 0;
        // console.log("testCanMove() accessed in separate pieces file");
    
        //     this.move();
        //     console.log(this.aML)
    
        //     //if one of the squares the piece can move to doesn't cause their king to be in check, this.canLegallyMove += 1;
    
        //this.legalMovesNo = 9;

        return this.legalMovesNo;
    }
}