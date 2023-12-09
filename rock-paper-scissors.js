let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

// if (!score) {
//     score = {
//         wins: 0,
//         losses: 0,
//         ties: 0
//     };
// }

updateScoreElement();


let isAutoplaying = false;
let intervalId; 

// const autoPlay = () => {
//    this is arrow function for autoPlay function
// };

function autoPlay() {
    if(!isAutoplaying){
        intervalId = setInterval( () => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoplaying = true;
        document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
        
      } else {
        clearInterval(intervalId);
        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
        isAutoplaying = false;
    }
}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}


document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  showResetConfirmation();
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConfirmation();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins++;
  } else if (result === "You lose.") {
    score.losses++;
  } else if (result === "Tie.") {
    score.ties++;
  }

  //storing scores into local storage
  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You choose
    <img src="Images/${playerMove}-emoji.png" alt="" class="move-icon">
    <img src="Images/${computerMove}-emoji.png" alt="" class="move-icon">
    choosen by Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}


// Function for showing the confirmation message.
function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>
    `;
  
  // You could use onclick="..." in the HTML above,
  // but it's recommended to use .addEventListener()
  document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });
  
  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      hideResetConfirmation();
    });
}

// A helper function (it helps us reuse the
// code for hiding the confirmation message).
function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}