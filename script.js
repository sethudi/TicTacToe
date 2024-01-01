// Write your code here.
// Write your code here.
const BOARD_WIDTH =3;

let currentPlayer =1;
let numMovesDone =0;
let boardState = generateEmptyBoardState();

const squareCollection =document.querySelectorAll('.game-square');
const heading =document.getElementById('game-heading');
const restartButton =document.getElementById('restart-button');

squareCollection.forEach((cell, idx) => {
  cell.addEventListener('click', () => {
    const col = idx % BOARD_WIDTH;
    const row = Math.floor(idx / BOARD_WIDTH);

    handdleCell(cell,row,col);
  });
});

restartButton.addEventListener('click', handdleRestart); 

console.log(currentPlayer);
function handdleCell(cell, row, col){
  cell.textContent = currentPlayer === 1 ? 'X': 'O';
  cell.disabled =true;
  numMovesDone ++;
  boardState[row][col] = currentPlayer;

  if (didPlayerWon()){
    heading.textContent = `Player ${currentPlayer} Won!`;
    endGame();
  } else if (numMovesDone >= BOARD_WIDTH * BOARD_WIDTH) {
    heading.textContent = 'Tie Game!';
    endGame();
  } else {
    currentPlayer = currentPlayer === 1 ? 2: 1;
    setCurrentPlayerHeading();
  }
  
}

function didPlayerWon() {
  const rows =[0,1,2];
  const wonHorizontal = rows.some((row) => {
    return (
      boardState[row][0] === currentPlayer &&
      boardState[row][1] === currentPlayer &&
      boardState[row][2] === currentPlayer 
    );
  });
  
  const cols =[0,1,2];
  const wonVertical = cols.some((col) => {
    return(
      boardState[0][col] === currentPlayer &&
      boardState[1][col] === currentPlayer &&
      boardState[2][col] === currentPlayer 
    );
  });
  
  const wonTopLeftToBottomRight =
      boardState[0][0] === currentPlayer &&
      boardState[1][1] === currentPlayer &&
      boardState[2][2] === currentPlayer;

  const wonTopRightToBottomLeft = 
      boardState[0][2] === currentPlayer &&
      boardState[1][1] === currentPlayer &&
      boardState[2][0] === currentPlayer;
  
  return wonHorizontal || wonVertical || wonTopLeftToBottomRight || wonTopRightToBottomLeft;
}

function endGame(){
  
  restartButton.style.display = 'block';
  squareCollection.forEach((cell, idx) => {
    cell.disabled =true;
  });
}

function handdleRestart(){
  currentPlayer =1;
  numMovesDone =0;
  setCurrentPlayerHeading();
  boardState = generateEmptyBoardState();
  squareCollection.forEach((cell, idx) => {
    cell.disabled =false;
    cell.textContent = '';
  });
  restartButton.style.display = 'none';
}

function setCurrentPlayerHeading() {
  heading.textContent = `Player ${currentPlayer}'s Turn`;
}

function generateEmptyBoardState() {
  return new Array(BOARD_WIDTH).fill().map(() => new Array(BOARD_WIDTH).fill());
}

