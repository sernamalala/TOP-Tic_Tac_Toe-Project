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
let gameOver = false;
    let currentPlayer = player1;
    
    
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
// const Gameflow = gameControl(P1,P2);

// Gameboard.displayBoard();
// Gameflow.takeATurn();
let gameOver = false;

function displayVisuals(){
const body = document.querySelector("body");
const board = document.getElementById("board");
let message = document.getElementById("message");

    return{
        createBoard(){
            

            for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                const columnCell = document.createElement("div");
                columnCell.style.width = "100px";
                columnCell.style.height = "100px";
                columnCell.style.border = "1px solid red";
                columnCell.id = `${i}-${j}`;
                columnCell.className = "cell";
                board.appendChild(columnCell);
            }
            }
        },


        updateBoard(row,column,piece){
            const boardCells = document.querySelectorAll(".cell");
            boardCells.forEach((cell)=>{


                if(cell.innerHTML === "" && cell.id === `${row}-${column}`){
                    cell.innerHTML = piece;
                    return true;
                }
                else{
                console.log("This space is filled, try another block.")
                return false;
                }
            })
            
        
        }
        ,
        userPlays(){
            
            if(gameOver) return;
            
            let currentPlayer = P1;
            const boardCells = document.querySelectorAll(".cell");
            boardCells.forEach((cell)=>{

                cell.addEventListener("click", function (event) {
                    
                    //stop game

                    if(gameOver || event.target.innerHTML !== "") return;

                  let cellID = event.target.id;
                    console.log(cellID);

                    let values = cellID.split("-");
                    let row = Number(values[0]);
                    let column = Number(values[1]);
                    this.updateBoard(row,column,currentPlayer.piece);
                    message.innerText = `${currentPlayer.userName} has played ${currentPlayer.piece}`
                    if(this.checkWinner()){
                        gameOver = true;
                        message.innerText = `${currentPlayer.userName} has Won!`
                    }
                    if(this.isATie()){
                        gameOver = true;
                        message.innerText = `Its a Tie, play again!!`
                    }
                    
                    
                    currentPlayer = (currentPlayer === P1)?P2:P1;
                }.bind(this));

            });
            
        },
        resetBoard(){
            const boardCells = document.querySelectorAll(".cell");
            boardCells.forEach((cell)=>{
                cell.innerHTML = "";
            });
        }
    ,
    checkWinner(){
        //get every cell by spreading into an array
        //nodelist into an array
        const allCells = [...document.querySelectorAll(".cell")]
            
        const board = [
            //rows of board
            allCells.slice(0,3),
            allCells.slice(3,6),
            allCells.slice(6,9)
        ];
        
        for (let i = 0; i < board.length; i++) {
            //check rows
            if(board[i][0].innerHTML !== "" && board[i][0].innerHTML === board[i][1].innerHTML && board[i][0].innerHTML === board[i][2].innerHTML ){
                return true;
            }
            
            //check columns
            else if(board[0][i].innerHTML !== "" && board[0][i].innerHTML === board[1][i].innerHTML && board[0][i].innerHTML === board[2][i].innerHTML ){
                return true;
            }
            
        }
        //diagonals
        if(board[0][0].innerHTML!=="" && board[0][0].innerHTML === board[1][1].innerHTML && board[0][0].innerHTML === board[2][2].innerHTML){
            return true;
        }
        
        else if(board[0][2].innerHTML!=="" && board[0][2].innerHTML === board[1][1].innerHTML && board[0][2].innerHTML === board[2][0].innerHTML){
            return true;
        }
        
        else{
            return false;
        }
    },

    isATie(){
        //get every cell by spreading into an array
        //nodelist into an array
        const allCells = [...document.querySelectorAll(".cell")]
            
        const board = [
            //rows of board
            allCells.slice(0,3),
            allCells.slice(3,6),
            allCells.slice(6,9)
        ];
        return board.flat().every(cell => cell.innerHTML !== "");
    }

}}

const restartButton = document.getElementById("restart");
restartButton.addEventListener("click",function () {
    let message = document.getElementById("message");
    message.innerHTML = "";

    gameOver = false;
    displayBoardVisually.resetBoard();
    displayBoardVisually.userPlays();

})

function createPlayers(){


    
}


const displayBoardVisually = displayVisuals();
displayBoardVisually.createBoard();
displayBoardVisually.userPlays();
