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

function GameController() {
    let currentPlayer = P1;

    return {
        playTurn() {

            let row = Number(prompt(`${currentPlayer.name} Enter the Row?[1-3]`))
            let column = Number(prompt(`${currentPlayer.name} Enter the Column?[1-3]`))
            while (!Gameboard.updateBoard(row, column, currentPlayer.userPiece)) {
                row = Number(prompt(`${currentPlayer.name} Enter the Row?[1-3]`))
                column = Number(prompt(`${currentPlayer.name} Enter the Column?[1-3]`))
                Gameboard.displayBoard();
            }

            Gameboard.displayBoard();
            alert("next player turn");
            currentPlayer = (currentPlayer === P1) ? P2 : P1;
            this.playTurn();
        },
        checkWinner() {

        },


    }
}





// console.log(Gameboard.board)
Gameboard.displayBoard();
// GameController().playTurn(1, 3, P1);
// GameController().playTurn(1, 3, P2);

GameController().playTurn()
