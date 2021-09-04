import Pawn from "./Pawn.js";

export class King extends Pawn {

    places = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]

    constructor(oI, iI, colour, chessBoard) {
        super(oI, iI, colour, chessBoard);
        this.description = `${colour}King`;
        this.castlingQueen = false;
        this.castlingKing = false;
    }

    move(){
        this.aML = []

        console.log(this.chessBoard[this.oI][this.iI])

        this.castlingQueen = false;
        this.castlingKing = false;

        if ((this.moves === 0) && (!this.check)) { //allows castling if the king has not moved yet and isn't in check
  
            //Queen-side castling
            if ((this.chessBoard[this.oI][3].isEmpty()) && (this.chessBoard[this.oI][2].isEmpty()) && (this.chessBoard[this.oI][1].isEmpty())) { //checks if the squares in-between are empty
                if (((!this.chessBoard[0][3].threatenedByWhite) && (!this.chessBoard[0][2].threatenedByWhite)) || ((!this.chessBoard[7][3].threatenedByBlack) && (!this.chessBoard[7][2].threatenedByBlack))) { //checks to see if any squares the king moves over isn't threatened 
                    if (this.chessBoard[this.oI][0].piece.moves === 0) { //if the rook partaking in the castling hasn't moved yet, castle
                        this.aML.push([this.oI, this.iI-2]);
                        this.castlingQueen = true;
                    }
                }
            }

            //king-side castling
            else if ((this.chessBoard[this.oI][5].isEmpty()) && (this.chessBoard[this.oI][6].isEmpty())) { 
                if (((!this.chessBoard[0][5].threatenedByWhite) && (!this.chessBoard[0][6].threatenedByWhite)) || ((!this.chessBoard[7][5].threatenedByBlack) && (!this.chessBoard[7][6].threatenedByBlack))) { //checks to see if any squares the king moves over isn't threatened  
                    if (this.chessBoard[this.oI][7].piece.moves === 0) { //if the rook partaking in the castling hasn't moved yet, castle
                        this.aML.push([this.oI, this.iI+2]);
                        this.castlingKing = true;
                    }
                }
            }
        }

        console.log("king side", this.chessBoard[this.oI][this.iI].piece.castlingKing, "queen side", this.chessBoard[this.oI][this.iI].piece.castlingQueen)

        for (let i=0; i<8; i++){
            try {
                if ((this.chessBoard[this.oI + this.places[i][0]][this.iI + this.places[i][1]]).whichColourPiece() !== this.colour){
                    this.aML.push([this.oI + this.places[i][0], this.iI + this.places[i][1]])
                }
            }
            catch (error) {}
        }

        return this.aML
    }
}