const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
    restartGame();
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

let shuffledSquares = [];

function shuffleSquares() {
  shuffledSquares = [...state.view.squares].sort(() => Math.random() - 0.5);
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  if (shuffledSquares.length === 0) {
    
    shuffleSquares();
  }

  const nextSquare = shuffledSquares.pop();
  nextSquare.classList.add("enemy");
  state.values.hitPosition = nextSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}
function restartGame() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);

  state.values.hitPosition = 0;
  state.values.result = 0;
  state.values.curretTime = 60;

  state.view.score.textContent = state.values.result;
  state.view.timeLeft.textContent = state.values.curretTime;

  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function initialize() {
  addListenerHitBox();
}

initialize();
