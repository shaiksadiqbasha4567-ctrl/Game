let userScore = 0;
let computerScore = 0;
let roundCount = 0;
const MAX_ROUNDS = 5; 

const choices = document.querySelectorAll('.choice');
const msg = document.querySelector('#msg');
const userScorePara = document.querySelector('#user-score');
const computerScorePara = document.querySelector('#computer-score');

// New DOM elements
const roundInfo = document.querySelector('#round-info'); 
const resetBtn = document.querySelector('#reset-btn');

const gameDraw = () => {
  msg.innerText = "Game Draw. Play Again!";
  msg.style.backgroundColor = "blue";
};

const showWinner = (userWin, userChoice, computerChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! Your ${userChoice} beats ${computerChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    computerScore++;
    computerScorePara.innerText = computerScore;
    msg.innerText = `You Lost. ${computerChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const genComputerChoice = () => {
  const options = ["rock", "paper", "scissor"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const endGame = () => {
  // Disable clicks on choices
  choices.forEach((choice) => {
    choice.style.pointerEvents = "none"; 
    choice.style.opacity = "0.5"; // Visual cue that game is locked
  });

  // Show the reset button
  resetBtn.style.display = "inline-block";

  // Declare final champion
  if (userScore > computerScore) {
    msg.innerText = `Game Over! You won the series ${userScore}-${computerScore}! 🏆`;
    msg.style.backgroundColor = "purple";
  } else if (computerScore > userScore) {
    msg.innerText = `Game Over! Computer won the series ${computerScore}-${userScore}. 🤖`;
    msg.style.backgroundColor = "orange";
  } else {
    msg.innerText = `Game Over! It's a tie series ${userScore}-${computerScore}!`;
    msg.style.backgroundColor = "gray";
  }
};

const resetGame = () => {
  userScore = 0;
  computerScore = 0;
  roundCount = 0;
  
  userScorePara.innerText = userScore;
  computerScorePara.innerText = computerScore;
  roundInfo.innerText = `Round: ${roundCount} / ${MAX_ROUNDS}`;
  
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31"; // Your original background color

  // Re-enable clicks
  choices.forEach((choice) => {
    choice.style.pointerEvents = "auto"; 
    choice.style.opacity = "1";
  });

  // Hide reset button again
  resetBtn.style.display = "none";
};

const playGame = (userChoice) => {
  if (roundCount >= MAX_ROUNDS) return; 

  const computerChoice = genComputerChoice();

  if (userChoice === computerChoice) {
    gameDraw();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = computerChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = computerChoice === "scissor" ? false : true;
    } else {
      userWin = computerChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, computerChoice);
  }

  roundCount++; 
  roundInfo.innerText = `Round: ${roundCount} / ${MAX_ROUNDS}`;

  if (roundCount >= MAX_ROUNDS) {
    endGame();
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id"); // Fixed case sensitivity for 'id'
    playGame(userChoice);
  });
});

// Event listener for the new reset button
resetBtn.addEventListener("click", resetGame);
