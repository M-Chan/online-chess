import Pawn from "./Pawn.js";
export default class Rook extends Pawn {

    constructor(oI, iI, colour, chessBoard) {
        super(oI, iI, colour, chessBoard);
        this.description = `${colour}Rook`;
    }

    move() {
        this.aML = [];

        let colour;
        let square;

        for (let i=0; i<4; i++) { //starting from the top and rotating clockwise
            
            let inner = this.iI;
            let outer = this.oI;

            if (i === 0) outer--;
            else if (i === 1) inner++;
            else if (i === 2) outer++;
            else if (i === 3) inner--;
            
            while ((inner <= 7) && (outer <= 7) && (inner >= 0) && (outer >= 0)) { //starting from the top and rotating clockwise

                square = this.chessBoard[outer][inner];
                colour = square.whichColourPiece();

                if (colour === this.colour) { //if it contains the same colour piece
                    break;
                }
                
                else if(colour !== "empty" && colour !== this.colour) { //when it contains an enemy piece
                    this.aML.push([outer, inner]);
                    break;
                }

                else { //when the square is empty
                    this.aML.push([outer, inner]);
                    
                    if (i === 0) outer--;
                    else if (i === 1) inner++;
                    else if (i === 2) outer++;
                    else if (i === 3) inner--;
                }
            }
        }
        return this.aML;
    }

    threaten() {
        this.move().forEach(index => this.chessBoard[index[0]][index[1]].threaten(this.colour));
    }
}
 