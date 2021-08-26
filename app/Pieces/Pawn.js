export default class Pawn {

    constructor(Xcoord,Ycoord, colour) {
        this.Xcoord = Xcoord;
        this.Ycoord = Ycoord;
        this.colour = colour;
        this.moves = 0; //number of moves that a piece has done
        this.description = `${colour} pawn`;
        this.availableMoves = 2;
        this.active = false;
    }

    canMoveTo() {

    }

    upgrade() {

        if (this.colour === "black") {
            if (this.Xcoord === 7) {
                //upgrade this to a new piece

                //remove this piece array[y][x] = null
                
                //make new knight/bishop/rook/queen at this location
                let newPiece = prompt("Which piece would you like to upgrade to, enter 'k' 'b' 'r' or 'q'?", "q");

                switch(newPiece) {
                    case k:
                        //knight
                        break;
                    case b:
                        //bishop
                        break;
                    case r:
                        //rook
                        break;
                    case q:
                        //queen
                        break;
                    default:
                        //queen
                }

            }
        }


        else if (this.colour === 'white') { 
            if (this.Xcoord === 0) {
                //upgrade this to a new piece
            }        
        }

        else {
            continue
        }

    }

    move() { //this method also incorporates capture

        if (this.colour === "white") {
            if (this.moves === 0){
                //move up by two positions
                if (chessboard[this.Ycoord - 1] === null) {  //directly in front of the pawn
                    if(chessboard[this.Ycoord - 2] === null) {
                        //pawn could move 2 spaces forward - we have to ask user if they want to move 1 or 2 ahead

                        //input - where the user clicks

                        //check the logic of it (i.e. cannot move three to the right)

                        // if (this.canMoveTo(x,y)){
                            
                        
                    }
                }
                
            }

            else if ((chessboard[this.Ycoord -1][this.Xcoord - 1] != null) || (chessboard[this.Ycoord -1][this.Xcoord + 1] != null)) {
                // includes white movement and movement through capturing black pieces
                //en passante
                //check if those pieces are the opposite colour

            }

            else {
                
            }
        }
        

        else { //if the chess piece is black
            if (this.moves === 0){
                //move up by two positions
                if (chessboard[this.Ycoord + 1] === null || chessboard[this.Ycoord + 2] === null) {
                    
                }

                else {

                }
            }
        }

    
        this.upgrade();

    }


}