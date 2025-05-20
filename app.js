let userScore = 0;
let compScore = 0;
let gameCount = 0; // Track number of games played

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const displayFinalResult = () => {
  let finalMessage = "";
  if (userScore > compScore) {
    finalMessage = `Game Over! 🎉 You win with ${userScore} - ${compScore}`;
    msg.style.backgroundColor = "green";
  } else if (userScore < compScore) {
    finalMessage = `Game Over! 😞 You lost with ${userScore} - ${compScore}`;
    msg.style.backgroundColor = "red";
  } else {
    finalMessage = `Game Over! 🤝 It's a draw with ${userScore} - ${compScore}`;
    msg.style.backgroundColor = "#081b31";
  }
  
  setTimeout(() => {
    alert(finalMessage);
    resetGame();
  }, 1000);
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  gameCount = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "New game started. Choose your move!";
  msg.style.backgroundColor = "#081b31";
};

const playGame = (userChoice) => {
  if (gameCount < 5) {
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
      drawGame();
    } else {
      let userWin = true;
      if (userChoice === "rock") {
        userWin = compChoice === "paper" ? false : true;
      } else if (userChoice === "paper") {
        userWin = compChoice === "scissors" ? false : true;
      } else {
        userWin = compChoice === "rock" ? false : true;
      }
      showWinner(userWin, userChoice, compChoice);
    }
    
    gameCount++;
  }

  if (gameCount === 5) {
    displayFinalResult();
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});