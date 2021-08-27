import Pawn from "./Pawn.js";

export default class Rook extends Pawn {
    
    constructor(Xcoord,Ycoord,colour) {
        super(Xcoord,Ycoord,colour);
        this.description = `${colour} Rook`;
        this.availableMoves = 0;

    }
    
    move(){

    }

}