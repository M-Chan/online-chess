import Pawn from "./Pawn.js"

export class King extends Pawn {

    places = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]

    constructor(oI, iI, colour, chessBoard) {
        super(oI, iI, colour, chessBoard)
        this.description = `${colour}King`
    }

    move(){
        this.aML = []

        for (let i=0; i<8; i++){
            try {
                if ((this.chessBoard[this.oI + this.places[i][0]][this.iI + this.places[i][1]]).whichColourPiece() !== this.colour){
                    this.aML.push([this.oI + this.places[i][0], this.iI + this.places[i][1]])
                }
            } catch (error) {
                
            }
        }

        return this.aML
    }
    
    castle() {
        if (this.moves === 0 && !this.check) {
        // moves has to be 0, no check between king and rook, can't be in check
        }
    }

}