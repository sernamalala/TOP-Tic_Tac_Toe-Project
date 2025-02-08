//the gameboard

function gameboard() {

    return {
        board:[
            ["","",""],
            ["","",""],
            ["","",""],
        ]
        ,
        resetBoard(){
           this.board = [
            ["","",""],
            ["","",""],
            ["","",""],
        ];
        }
        ,
        updateBoard(row,column,piece){
            
            if(this.board[row-1][column-1] === ""){
                this.board[row-1][column-1] = piece;
                this.displayBoard();
                return true;
            }
            else{
            console.log("This space is filled, try another block.")
            return false;
            }
            
        }
        ,
        displayBoard(){
            this.board.forEach((row)=>{

                const formattedRow = row.map((element)=>{

                    if(element === ""){
                        return  " ";
                    }
                    return element;
                }).join(" | ");

                console.log(formattedRow);
               
            })

            console.log("**********");
        },

    }
    
}

//players

function gameplayers(name,piece){
    return{

        userName:name,
        piece:piece,

    }
}

//game control


function gameControl(player1,player2) {

    let currentPlayer = player1;
    let gameOver = false;
    
    return{
        takeATurn(){
            if(gameOver) return;

            let row,column;
            let validMovePlayed = false;
            
            while(!validMovePlayed){
                row = Number(prompt("Enter a row [1-3]"));
                column = Number(prompt("Enter a column [1-3]"));
                validMovePlayed = Gameboard.updateBoard(row,column,currentPlayer.piece);
            }
            
            //if a winner is found
            if(this.checkWinner()){
                gameOver = true;
                console.log(`${currentPlayer.userName} has Won!!`);
                return;
            }
            //if all the tiles of the board are filled and no winner was found
            if(this.isATie() && !this.checkWinner()){
                gameOver = true;
                console.log(`No one has won, it's a Tie. Try again`);
                return;
            }
            
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            this.takeATurn(); 
        },
        checkWinner(){
            for(let i = 0; i<3; i++){
                //rows
                if(Gameboard.board[i][0] !== "" && Gameboard.board[i][0] === Gameboard.board[i][1] && Gameboard.board[i][0] === Gameboard.board[i][2]){
                    return true;
                }
                //columns
                else if(Gameboard.board[0][i] !== "" && Gameboard.board[0][i] === Gameboard.board[1][i] && Gameboard.board[0][i] === Gameboard.board[2][i]){
                    return true;
                }
                
               
            }
            //diagonals
            if(Gameboard.board[0][0] !== "" && Gameboard.board[0][0] === Gameboard.board[1][1] && Gameboard.board[0][0] === Gameboard.board[2][2]){
                return true;
            }
            else if(Gameboard.board[0][2] !== "" && Gameboard.board[0][2] === Gameboard.board[1][1] && Gameboard.board[0][2] === Gameboard.board[2][0]){
                return true;
            }
            else{
                return false;
            }
           

        },
        isATie(){

            //this will return a boolean after checking each cell on the board
           return Gameboard.board.flat().every(cell => cell !== "");
                
            }
            

        }
    }

    
const Gameboard = gameboard();

const P1 = gameplayers("serna","X");
const P2 = gameplayers("ketsia","O");
const Gameflow = gameControl(P1,P2);

Gameboard.displayBoard();
Gameflow.takeATurn();