const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// Let's create a function to initiliase the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","",
                "","","",
                "","",""];
    
    // Shows Empty  in UI
    boxes.forEach((box, index) => {
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        // initialise Box with css properties again
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
}
initGame();


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function CheckGameOver(){
    let answer = "";
    winningPosition.forEach((position)=>{
        // All 3 boxes should be non-empty and excatly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) &&  (gameGrid[position[1]] === gameGrid[position[2]] ) ){
            // Check if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
            // Now we Know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2 ]].classList.add("win");
        }
    });
    // it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // let's check weather there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        fillCount++;
    });
    // Board is fill, game is Tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !!";
        newGameBtn.classList.add("active");
    }  
}

function handelClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText  = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Swap turn
        swapTurn();
        // Check if Anyone win or Not;
        CheckGameOver();
    }
}

boxes.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        handelClick(index);
    })
})

newGameBtn.addEventListener('click', initGame);