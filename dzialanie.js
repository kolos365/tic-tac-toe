const fieldsElement = document.querySelectorAll(".board__item");
const panel = document.querySelector('.panel');
const button = document.querySelector('.resetButton');

let fields= ['','','','','','','','','',] ;
let activePlayer= 'X';
let gameActive= true;
const resetGameState = () =>{
  fields = ['','','','','','','','','',]
    activePlayer = 'X';
    gameActive = true;

}

const winningCondition = [
    [0,1,2,],
[3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
];

const displayWinMessage =() => {
    panel.innerHTML = `gratulacje ${activePlayer}, Wygrałeś!`;
}
const displayTieMessage =() => {
    panel.innerHTML = `Remis!`};
const clearMessage = () =>{
    panel.innerHTML = ''
}
const validateGame = () => {
    let gameWon = false;
    for (let i = 0; i<=7; i++) {
        const [posA, posB, posC] = winningCondition[i];
        const value1 = fields[posA];
        const value2 = fields[posB];
        const value3 = fields[posC];

        if(value1!==''&&value1===value2 && value1===value3){
            gameWon = true;
            break;
        }
    }
    if (gameWon){
        gameActive = false;
        displayWinMessage();}
    else if (isBoardFull()) {
        gameActive = false;
displayTieMessage();
    }
};
const  isBoardFull = () =>{
    return fields.find(field => field === '') === undefined;
}
const handleItemClick = e =>{

        const {pos} = e.target.dataset;

        if (gameActive && fields[pos] === '') {
            fields[pos] = activePlayer;
            e.target.classList.add(`board__item--filled-${activePlayer}`);
            validateGame();
            activePlayer = activePlayer ==='X' ? 'O' : 'X';
        }
}
fieldsElement.forEach(field => {
field.addEventListener("click", handleItemClick);
});
const handleButtonClick = () =>{
    resetGameState();
    fieldsElement.forEach(field => {
        field.classList.remove('board__item--filled-X', 'board__item--filled-O');
    });
    clearMessage()
};

button.addEventListener('click' ,handleButtonClick)