let userScore = 0;
let computerScore = 0;


const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const computerScorePara = document.querySelector("#computer-score");
const roundInfoPara = document.querySelector("#roundInfo");
const resetBtn = document.querySelector("#reset-btn");

const gameDraw = () => {
    msg.innerText = "Game Draw.Play Again!";
    msg.style.backgroundColor ="blue";
};

const showWinner = (userWin,userChoice,computerChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${computerChoice}`;
        msg.style.backgroundColor = "green";
    }
    else {
        computerScore++;
        computerScorePara.innerText = computerScore;
        msg.innerText = `You Lost.  ${computerChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const endGame =()=>{
    choices.forEach((choice) =>{
        choice.style.pointerEvents = "none";
        choice.style.opacity = "0.5";
    });
    
}



const playGame = (userChoice) => {
    const computerChoice = genComputerChoice();
    if (userChoice === computerChoice) {
        gameDraw();
    }
    else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = computerChoice === "paper" ? false : true;
        }
        else if (userChoice === "paper") {
            userWin = computerChoice === "scissor" ? false : true;
        }
        else {
            userWin = computerChoice === "rock" ? false : true;
        }
        showWinner(userWin,userChoice,computerChoice);
    }

};


choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("Id");
        playGame(userChoice);
    });
});
