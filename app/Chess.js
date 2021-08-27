import ChessBoard from "./Chessboard";


let chessBoard = new ChessBoard();

/*
while game not concluded, alternate between white and black
*/

document.querySelectorAll('.piece').forEach(item => {item.addEventListener('click', () => {
    console.log(chessBoard.board[item.id.charAt(1)][item.id.charCodeAt(0) - 97])

    console.log("hello")
    })
})