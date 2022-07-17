'use strict';

const score0El = document.querySelector('#score-0');
const score1El = document.querySelector('#score-1');
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const current0El = document.querySelector('#current-0');
const current1El = document.querySelector('#current-1');
const diceEl = document.querySelector('.dice');

var scores, currentScore, activePlayer, playing;

const initial = function () {
  score0El.innerText = 0;
  score1El.innerText = 0;
  current0El.innerText = 0;
  current1El.innerText = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  player0El.classList.remove('winner');
  player1El.classList.remove('winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
};

initial();

const switchPlayer = function () {
  // 當骰到1
  // 當前分數的"字"先歸零
  document.querySelector(`#current-${activePlayer}`).innerText = 0;
  // 換人
  if (activePlayer == 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  // 計算的分數總和歸零
  currentScore = 0;
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
};

// const btnRoll = document.querySelector('.btn-roll');
function btnRoll() {
  if (playing) {
    //取消骰子圖的隱藏
    diceEl.classList.remove('hidden');
    //點數隨機出現
    var diceNum = Math.floor(Math.random() * 6 + 1);
    var result = `dice-${diceNum}.png`;
    diceEl.src = result;

    if (diceNum != 1) {
      //當沒有骰到1
      //每次骰的點數都要在加到原本分數上
      currentScore = currentScore + diceNum;
      document.querySelector(`#current-${activePlayer}`).innerText =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

function btnHold() {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.querySelector(`#score-${activePlayer}`).innerText =
      scores[activePlayer];
    if (scores[activePlayer] >= 30) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player-${activePlayer}`).classList.add('winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
}

function btnNew() {
  initial();
}

function btnRule() {
  alert(`
  1.每個人在一個回合中可以拋擲骰子的次數不限
  2.每回合拋擲骰子的得分先放在暫存區，即"當前得分"的位置
  3.回合結束方式一：按下保留按鈕，得分可累計，然後換邊
  4.回合結束方式二：擲出 1 點，暫存區的得分遺失，換邊
  任一方得到 30 分以上，遊戲結束`);
}
