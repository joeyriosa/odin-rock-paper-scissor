const ROCK_STRING = "Rock";
const PAPER_STRING = "Paper";
const SCISSORS_STRING = "Scissors";

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

function playRound(computerChoice, playerChoice) {
    
    console.log(playerChoice + " vs. " + computerChoice);
        
    if (playerChoice == ROCK_STRING) {
        return playRock(computerChoice);
    }
    else if (playerChoice == PAPER_STRING) {
        return playPaper(computerChoice);
    }
    else if (playerChoice == SCISSORS_STRING) {
        return playScissors(computerChoice);
    }
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

function game() {
        
    // Keep on playing round if it's a tie.
    let playerChoiceString;
    let computerChoiceString;
    let proceed = true;

    // This loop is to handle ties so that the user will enter the choice again.
    while (proceed) {
        
        playerChoiceString = prompt("What's your choice: Rock, Paper or Scissors?");
        // Handle if user pressed Cancel.
        if (playerChoiceString == null) {
            break;
        }

        // Convert player entry to Proper Case. 
        playerChoiceString = convertProperCase(playerChoiceString);

        if (playerChoiceString != ROCK_STRING && playerChoiceString != PAPER_STRING && playerChoiceString != SCISSORS_STRING) {
            alert("You entered an invalid choice. Please enter again.");
            // Assign to the same choice of the computer to continue entering values.
            continue;
        }

        // Computer choice already in constant that's in Proper Case already.
        computerChoiceString = getComputerChoice();
        
        console.log(playerChoiceString);
        console.log(computerChoiceString);
        
        // If it's a tie, replay the round.
        if (playerChoiceString.toLowerCase() == computerChoiceString.toLowerCase()) {
            alert("It's a Tie! Replay the Round.");
        }
        else {
            // Different choices, exit loop and get results.
            proceed = false;
        }
    }

    // To support cases where user Cancelled entry to not throw an error.
    if (playerChoiceString != null) {
        result = playRound(computerChoiceString, playerChoiceString); 
        console.log(result.message);
        return result;
    }
}

let playerScore = 0;
let computerScore = 0;

for (let i = 1; i <= 5; i++) {

    const result = game();

    // If user clicked cancel in entry, END game immediately. Provide an out for the user.
    if (result == undefined) {
        break;
    }

    (result.won ? playerScore++ : computerScore++);

    console.log(`Current Score: Player: ${playerScore} Computer: ${computerScore}`);

    if (playerScore === 3) {
        alert(`Player wins! ${playerScore} to ${computerScore}`);
        break;
    }
    else if (computerScore == 3) {
        alert(`Computer wins! ${computerScore} to ${playerScore}`);
        break;
    }
}
