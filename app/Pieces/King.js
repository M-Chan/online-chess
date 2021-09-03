import Pawn from "./Pawn.js"

export class King extends Pawn {

    places = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]

    constructor(oI, iI, colour, chessBoard) {
        super(oI, iI, colour, chessBoard)
        this.description = `${colour}King`
    }

    move(){
        this.aML = []

        if (this.moves === 0){
            //allows castling if the king has not moved yet
            if (!this.check) {
                if ((this.chessBoard[this.oI][this.iI-1].isEmpty()) && (this.chessBoard[this.oI][this.iI-2].isEmpty()) && (this.chessBoard[this.oI][this.iI-3].isEmpty())){ //Queen-side castling
                    this.aML.push([this.oI, this.iI-2])
                }
    
                else if ((this.chessBoard[this.oI][this.iI+1].isEmpty()) && (this.chessBoard[this.oI][this.iI+2].isEmpty())) { //king-side castling
                    this.aML.push([this.oI, this.iI+2])
                }
            }
        }

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