//the classes of X and CIRCLE 
const X_CLASS = 'x'; 
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//passing variables of cells, board, message, button, text + DEFINING THE TURN 
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const MessageElement = document.getElementById('message'); 
const restartButton = document.getElementById('restartButton')
const MessageTextElement = document.querySelector('[message-text]');
let circleTurn; 

//START function, the first click and the first hover state 
startGame()

function startGame() {
    circleTurn = false; 
    cellElements.forEach (cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoverClass()
    MessageElement.classList.remove('show')
}

restartButton.addEventListener('click',startGame)

// ----------MAIN FUNCTION --------- start // 
function handleClick(e) {
    const cell = e.target; 
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; 
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }    
}
// ----------MAIN FUNCTION --------- end // 

//place the X or CIRCLE 
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

//switch turn for another player
function swapTurns () {
    circleTurn = !circleTurn
}

//setting the HOVER 
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS) 
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

//check the winner 
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

//END GAME function 
function endGame(draw) {
    if(draw) {
        MessageTextElement.innerText = 'Draw!'
    } else {
        MessageTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    MessageElement.classList.add('show')
}

// DRAW function 
function isDraw () {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
