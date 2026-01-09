const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statustext");
const restartBtn = document.querySelector("#restartbtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winCondition = [[0,1,2],[3,4,5], [6,7,8], [0,3,6], [1,4,7],[2,5,8],[0,4,8], [2,4,6]];


cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
statusText.textContent = "X's turn";

function handleCellClick(){
    const index = this.getAttribute("data-index");
    if(gameState[index] !== "" || !gameActive){
        return;
    }

gameState[index] = currentPlayer;
this.textContent = currentPlayer;
checkWinner();
}

function checkWinner(){

    
    for (let condition of winCondition) {
        const a = gameState[condition[0]];
        const b = gameState[condition[1]];
        const c = gameState[condition[2]];

        if (a && a === b && b === c){
            statusText.textContent = `${currentPlayer} wins`;
            gameActive = false;

            cells.forEach(cell => cell.style.pointerEvents = "none");

            setTimeout(() => {
                restartGame();
                cells.forEach(cell => cell.style.pointerEvents = "auto");
            }, 2000);

            return;
        }
    }

    if (!gameState.includes("")){
        statusText.textContent = "Draw";
        gameActive = false;

        cells.forEach(cell => cell.style.pointerEvents = "none");

        setTimeout(() => {
            restartGame();
            cells.forEach(cell => cell.style.pointerEvents = "auto");
        }, 2000);

        return;
    }

    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;

}


  function restartGame(){
   currentPlayer = "X";
 gameActive = true;
 gameState = ["", "", "", "", "", "", "", "", ""];
cells.forEach(cell => cell.textContent= "");
statusText.textContent = "X's turn";
}

