//Deals with the logic behind setting up the gameboard
//make gameboard be called once? put parethesis around the function and a pair at the end of the function
const Gameboard = (function () {
    return {
        board: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ],
        resetBoard() {
            this.board = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ]
        },
        updateBoard(row, column, gamePiece) {
            if (this.board[row - 1][column - 1] === "") {
                this.board[row - 1][column - 1] = gamePiece;
                return true;
            }
            else {
                alert("This spot is taken try another spot!!");
                return false;
            }

        },
        isTaken(position) {

            //return true or false
        }
        ,
        displayBoard() {
            this.board.forEach((row) => {

                console.log(row.map(element => element === "" ? " " : element).join(" | "));


            });
            console.log("----------")
        }
    }
})()

function gamePlayer(name, points, gamePiece) {

    return {
        userName: name,
        userPoints: points,
        userPiece: gamePiece,
        getUserStatus() {
            console.log(`${this.userName}[${this.userPiece}] has ${this.userPoints} points.`)
        }
    }

}

const P1 = gamePlayer("Serna", 0, "O");
const P2 = gamePlayer("Kate", 1, "X");

const winningRows = [
    []
]
function GameController() {
    let currentPlayer = P1;

    return {


        playTurn() {

            let row = Number(prompt(`${currentPlayer.userName} Enter the Row?[1-3]`))
            let column = Number(prompt(`${currentPlayer.userName} Enter the Column?[1-3]`))
            while (!Gameboard.updateBoard(row, column, currentPlayer.userPiece)) {
                row = Number(prompt(`${currentPlayer.userName} Enter the Row?[1-3]`))
                column = Number(prompt(`${currentPlayer.userName} Enter the Column?[1-3]`))
                Gameboard.displayBoard();
            }

            Gameboard.displayBoard();

            if (this.checkWinner()) {
                console.log("Winner is " + currentPlayer.userName);
                return;
            }
            if (this.isTie()) {
                console.log("It's a tie! Wrap it up");
                return;
            }

            alert("next player turn");
            currentPlayer = (currentPlayer === P1) ? P2 : P1;
            this.playTurn();

        },
        checkWinner() {

            let board = Gameboard.board;
            for (let i = 0; i < 3; i++) {
                if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][1] === board[i][0]) {

                    return true;
                }

                else if (board[0][i] !== "" && board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[1][i] === board[2][i]) {

                    return true;
                }

                else if (board[0][0] !== "" && board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[1][1] === board[2][2]) {

                    return true;
                }

                else if (board[0][2] !== "" && board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[1][1] === board[2][0]) {

                    return true;
                }

                return false;
            }



        },

        isTie() {
            return Gameboard.board.flat().every(cell => cell !== "") && !this.checkWinner();
        }


    }
}





// console.log(Gameboard.board)
Gameboard.displayBoard();
// GameController().playTurn(1, 3, P1);
// GameController().playTurn(1, 3, P2);

GameController().playTurn()
