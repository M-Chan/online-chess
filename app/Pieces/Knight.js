//import Pawn from "./Pawn.js"
export default class Knight {
    
    constructor(Xcoord,Ycoord, colour) {
        this.Xcoord = Xcoord;
        this.Ycoord = Ycoord;
        this.colour = colour;
        this.moves = 0; //number of moves that a piece has done
        this.description = `${colour} knight`;
        this.availableMoves = 2;
    }


    move() {

        if (this.colour === "white") {
            if ((chessboard[this.Ycoord - 2][this.Xcoord - 1] === null) || (chessboard[this.Ycoord - 2][this.Xcoord + 1] === null)){
                    
                }
                
        }
        

        else { //if the chess piece is black
            
        }

    }
}