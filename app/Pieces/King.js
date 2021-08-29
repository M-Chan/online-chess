import Pawn from "./Pawn.js"

export class King extends Pawn {

    places = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]

    constructor(oI, iI, colour, chessBoard) {
        super(oI, iI, colour, chessBoard)
        this.description = `${colour} king`
    }

    // [ [00, 01, 02, 03, 04, 05, 06, 07],      top-left is [0][0] = A8, bottom right is[7][7] = H1
    //   [10, 11, 12, 13, 14, 15, 16, 17],      black side
    //   [20, 21, 22, 23, 24, 25, 26, 27],
    //   [30, 31, 32, 33, 34, 35, 36, 37],
    //   [40, 41, 42, 43, 44, 45, 46, 47],
    //   [50, 51, 52, 53, 54, 55, 56, 57],
    //   [60, 61, 62, 63, 64, 65, 66, 67],      white side
    //   [70, 71, 72, 73, 74, 75, 76, 77]  ]
    
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