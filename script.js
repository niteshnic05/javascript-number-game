const userInput = document.getElementById('game_input');
const submitBtn = document.querySelector('.submit_number');
const gameMssg = document.querySelector('.game-message');
const attemptLeft = document.querySelector('.attempt-left');

const max = 100;
const min = 1;
const randomNumber = Math.floor(Math.random() * (max - min) + min);
console.log(randomNumber);

let userAttempt = 1;

let gameStart = true;

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (gameStart) {
    gameMssg.innerHTML = '';
    gameMssg.classList.remove('error-mssg');
    gameMssg.classList.remove('success-mssg');
    validateNumber(userInput.value);
  }
});

function validateNumber(userInput) {
  if (userInput == '') {
    gameMssg.innerHTML = 'Please enter number!';
    gameMssg.classList.add('error-mssg');
    return true;
  }
  if (isNaN(userInput)) {
    gameMssg.innerHTML = 'Please enter number only!';
    gameMssg.classList.add('error-mssg');
    return true;
  }
  /* if (Number.isInteger(userInput)) {
    gameMssg.innerHTML = 'Please enter number only!!';
    gameMssg.classList.add('error-mssg');
    return true;
  } */
  if (userInput < 1 || userInput > 100) {
    gameMssg.innerHTML = 'Please enter number between 1 to 100!';
    gameMssg.classList.add('error-mssg');
    return true;
  }
  checkUserAttempt(userInput);
}

function checkUserAttempt(userInput) {
  if (userAttempt == 11) {
    gameMssg.innerHTML =
      'Game over, you used all attempts, press start game again';
    gameMssg.classList.add('error-mssg');
    gameRestartBtn();
    return true;
  }
  userAttempt++;
  clearInput();
  attemptLeft.innerHTML += `${userInput}, `;
  validateWithGuessNumber(userInput);
}

function gameRestartBtn() {
  const restartBtn = document.createElement('button');
  restartBtn.classList.add('game-restart');
  restartBtn.innerHTML = 'Restart Game';
  submitBtn.replaceWith(restartBtn);
  gameStart = false;

  restartBtn.addEventListener('click', function (e) {
    e.preventDefault();
    gameMssg.innerHTML = '';
    gameMssg.classList.remove('error-mssg');
    gameMssg.classList.remove('success-mssg');
    gameStart = true;
    const startBtn = document.createElement('button');
    startBtn.classList.add('submit_number');
    startBtn.innerHTML = 'Guess';
    restartBtn.replaceWith(startBtn);
    clearInput();
    attemptLeft.innerHTML = '';
  });
}

function validateWithGuessNumber(userInput) {
  if (parseInt(userInput) === randomNumber) {
    gameMssg.innerHTML = `Huray, you guess the right number ${randomNumber}`;
    gameMssg.classList.add('success-mssg');
    //submitBtn.setAttribute('disabled', 'disabled')
    //submitBtn.insertAdjacentElement('afterend', restartBtn)
    //submitBtn.replaceWith(restartBtn)
    //submitBtn.classList.add('disabled-btn')
    gameRestartBtn();
    return true;
  } else {
    gameMssg.innerHTML = 'Oops, worng guess!';
    gameMssg.classList.add('error-mssg');
    return true;
  }
}

function clearInput() {
  userInput.value = '';
}
