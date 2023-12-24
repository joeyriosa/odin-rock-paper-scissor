const ROCK_STRING = "Rock";
const PAPER_STRING = "Paper";
const SCISSORS_STRING = "Scissors";

const btnStart = document.querySelector('#btnStart');
const btnStop = document.querySelector('#btnStop');
const btnRock = document.querySelector('#btnRock');
const btnPaper = document.querySelector('#btnPaper');
const btnScissors = document.querySelector('#btnScissors');
const lastPlayerChoice = document.querySelector('#playerLabel');
const lastComputerChoice = document.querySelector('#computerLabel');
const history = document.querySelector('#history');
const playerScore = document.querySelector('#playerScore');
const computerScore = document.querySelector('#computerScore');
const finalResult = document.querySelector('#finalResult');

function getComputerChoice() {
    const choice = (Math.floor(Math.random() * 3));

    switch (choice) {
        case 0:
            return ROCK_STRING;
        case 1:
            return PAPER_STRING;
        case 2:
            return SCISSORS_STRING;
        default:
            return null;
    }
}

function addLastChoices(playerChoice, computerChoice) {
    lastPlayerChoice.textContent = playerChoice;
    lastComputerChoice.textContent = computerChoice;
}

function addHistory(messageToAdd) {
    let historyElement = document.createElement('div');
    historyElement.textContent = messageToAdd;
    history.appendChild(historyElement);
}

function processScore(won) {
    let playerScoreValue;
    let computerScoreValue;
    
    if (won) {
        playerScoreValue = parseInt(playerScore.textContent, 10) + 1;
        playerScore.textContent = playerScoreValue;
    }
    else {
        computerScoreValue = parseInt(computerScore.textContent, 10) + 1;
        computerScore.textContent = computerScoreValue;
    }

    if (playerScoreValue == 5) {
        finalResult.textContent = 'END OF GAME: PLAYER WINS!';
        finalResult.style.color = 'blue';
        endGame();
    }
    else if (computerScoreValue == 5) {
        finalResult.textContent = 'END OF GAME: COMPUTER WINS!';
        finalResult.style.color = 'red';
        endGame();
    }
}

function playRound(computerChoice, playerChoice) {
    
    let choices = playerChoice + " vs. " + computerChoice;

    if (playerChoice == computerChoice) {
        addHistory(choices + " = IT'S A TIE!");
    }
    else {
        
        let result;
        if (playerChoice == ROCK_STRING) {
            result = playRock(computerChoice);
        }
        else if (playerChoice == PAPER_STRING) {
            result = playPaper(computerChoice);
        }
        else if (playerChoice == SCISSORS_STRING) {
            result = playScissors(computerChoice);
        }
        addHistory(choices + " = " + result.message);
        processScore(result.won);
    }

    addLastChoices(playerChoice, computerChoice);
}

function playRock(computerChoice) {
    if (computerChoice == PAPER_STRING) {
        return { message:"You Lose! Paper beats Rock", won: false };
    }
    else if (computerChoice == SCISSORS_STRING) {
        return { message: "You Win! Rock beats scissors", won: true };
    }
}

function playPaper(computerChoice) {
    if (computerChoice == ROCK_STRING) {
        return { message: "You Win! Paper beats Rock", won: true };
    }
    else if (computerChoice == SCISSORS_STRING) {
        return { message: "You Lose! Scissors beats Paper", won: false };
    }
}

function playScissors(computerChoice) {
    if (computerChoice == ROCK_STRING) {
        return { message: "You Lose! Rock beats Scissors", won: false };
    }
    else if (computerChoice == PAPER_STRING) {
        return { message: "You Win! Scissors beats Paper", won: true };
    }
}

function convertProperCase(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
}

function startGame() {
    btnStart.disabled = true;
    btnStop.disabled = false;
    btnRock.disabled = false;
    btnPaper.disabled = false;
    btnScissors.disabled = false;
    initializeFields();
}

function endGame() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    btnRock.disabled = true;
    btnPaper.disabled = true;
    btnScissors.disabled = true;
}

function initializeFields() {
    lastPlayerChoice.textContent = '';
    lastComputerChoice.textContent = '';
    playerScore.textContent = '0';
    computerScore.textContent = '0';
    history.innerHTML = '';
    finalResult.innerHTML = '';
}

(function () {
    btnStop.disabled = true;
    btnRock.disabled = true;
    btnPaper.disabled = true;
    btnScissors.disabled = true;

    btnStart.addEventListener('click', () => {
        startGame();
    });

    btnStop.addEventListener('click', () => {
        endGame();
    })

    let buttons = document.querySelector('#buttons');
    let computerChoice;
    buttons.addEventListener('click', function(e) {
        let target = e.target;
        switch (target.id) {
            case 'btnRock':
                playRound(getComputerChoice(), ROCK_STRING);
                break;
            case 'btnPaper':
                playRound(getComputerChoice(), PAPER_STRING);
                break;
            case 'btnScissors':
                playRound(getComputerChoice(), SCISSORS_STRING);
                break;
            default:
                break;
        }
    })

}) ();



