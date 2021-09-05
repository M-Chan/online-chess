import Pawn from "./Pawn.js"

export default class Knight extends Pawn {
    
    places = [[-2,-1],[-2,1],[-1,2],[1,2],[2,-1],[2,1],[1,-2],[-1,-2]];

    constructor(oI, iI, colour, chessBoard) {
        super(oI, iI, colour, chessBoard);
        this.description = `${colour}Knight`;

    }

    move() {
        this.aML = [];

        for (let i=0; i<8; i++) {
            try { 
                if ((this.chessBoard[this.oI + this.places[i][0]][this.iI + this.places[i][1]]).containsOppositeColour(this.colour)) {   // "capturable" position 
                    this.aML.push([this.oI + this.places[i][0],this.iI + this.places[i][1]]);
                }  
            }
            catch (error) {
            
            }
        }
        return this.aML;
    }

    threaten() {
        this.move().forEach(index => this.chessBoard[index[0]][index[1]].threaten(this.colour));
    }
}





