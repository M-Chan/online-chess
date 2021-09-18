import Pawn from "./Pawn.js"

export default class Bishop extends Pawn {
       
    constructor(oI, iI, colour, chessBoard) {
        super(oI, iI, colour, chessBoard);
        this.description = `${colour}Bishop`;

    }

    move() {
        this.aML = [];

        let colour;
        let square;

        for (let i=0; i<4; i++) { //starting from the top right (045) and rotating clockwise 90 degrees 4 times
            
            let inner = this.iI;
            let outer = this.oI;

            if (i === 0){ outer--; inner++} 
            else if (i === 1){ inner++; outer++} 
            else if (i === 2){ outer++; inner--}
            else if (i === 3){ inner--; outer--} 
        
            while ((inner <= 7) && (outer <= 7) && (inner >= 0) && (outer >= 0)) { //starting from the top right (045) and rotating clockwise 90 degrees 4 times

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
                    
                    if (i === 0){ outer--; inner++} 
                    else if (i === 1){ inner++; outer++} 
                    else if (i === 2){ outer++; inner--}
                    else if (i === 3){ inner--; outer--} 
                }
            }
        }
        return this.aML;
    }

    threaten() {
        this.move().forEach(index => this.chessBoard[index[0]][index[1]].threaten(this.colour));
    }
}
