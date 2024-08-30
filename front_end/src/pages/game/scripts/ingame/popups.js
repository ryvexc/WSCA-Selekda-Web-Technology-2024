const countdown = document.getElementById("countdown");

// Over Menu
const overMenu = document.getElementById("overMenu");
const saveBtn = document.getElementById("saveBtn");
const restartBtn = document.getElementById("restartBtn");
const quitBtn = document.getElementById("quitBtn");

const sumUsernameDisplay = document.getElementById("sumPlayerName");

const sumScoreADisplay = document.getElementById("sumScoreA");
const sumScoreBDisplay = document.getElementById("sumScoreB");

const sumCountryAImg = document.getElementById("sumCountryAImg");
const sumCountryAText = document.getElementById("sumCountryAText");
const sumCountryBImg = document.getElementById("sumCountryBImg");
const sumCountryBText = document.getElementById("sumCountryBText");

// Match History Menu
const matchHistoryOverlay = document.getElementById("matchHistory");
const sortMode = document.getElementById("sortMode");
const matches = document.getElementById("matches");

const openMatchHistoryBtn = document.getElementById("openMatchHistory");
const closeMatchHistoryBtn = document.getElementById("closeMatchHistory");

let saved = false;

function startCountdown(number) {
  if (game.isCountingDown) {
    return;
  }

  game.isCountingDown = true;
  countdown.innerText = number;
  countdown.classList.remove("hidden");

  let interval;
  interval = setInterval(() => {
    if (countdown.innerText === "0") {
      clearInterval(interval);
      countdown.classList.add("hidden");
      game.isCountingDown = false;
    }

    countdown.innerText = Number(countdown.innerText) - 1;
  }, 1000);
}

function openOverMenu() {
  sumUsernameDisplay.innerText = formData.username;

  sumCountryAImg.src = `./assets/Flag/${formData.country}.png`;
  sumCountryBImg.src = `./assets/Flag/${formData.opponentCountry}.png`;
  sumCountryAText.innerText = formData.country;
  sumCountryBText.innerText = formData.opponentCountry;

  sumScoreADisplay.innerText = game.score[0];
  sumScoreBDisplay.innerText = game.score[1];

  overMenu.classList.remove("hidden");

  saveBtn.addEventListener("click", () => {
    if (saved) {
      return;
    }

    saved = true;

    const matchHistory = JSON.parse(
      localStorage.getItem("matchHistory") || "[]"
    );

    matchHistory.push({
      username: formData.username,
      countries: [formData.country, formData.opponentCountry],
      scores: game.score,
      timer: formData.level,
    });

    localStorage.setItem("matchHistory", JSON.stringify(matchHistory));
  });

  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });

  quitBtn.addEventListener("click", () => {
    localStorage.removeItem("formData");
    window.location.href = "./index.html";
  });
}

function renderMatchHistory(matchHistory) {
  matches.innerHTML = "";

  matchHistory.forEach((match) => {
    matches.innerHTML += `<div class="match">
                            <span class="plr-name">${match.username}</span>
                            <table class="summary-group">
                              <tr class="country-img-group">
                                <td>
                                  <img src="./assets/Flag/${match.countries[0]}.png" alt="" />
                                </td>
                                <td class="divider"></td>
                                <td>
                                  <img src="./assets/Flag/${match.countries[1]}.png" alt="" />
                                </td>
                              </tr>
                              <tr class="scores-group">
                                <td>
                                  <span>${match.scores[0]}</span>
                                </td>
                                <td class="divider">-</td>
                                <td>
                                  <span>${match.scores[1]}</span>
                                </td>
                              </tr>
                            </table>
                          </div>`;
  });
}

function sortByRecent(matchHistory) {
  return matchHistory.reverse();
}

function sortByScore(matchHistory) {
  matchHistory = matchHistory.sort((matchA, matchB) => {
    const sumA = matchA.scores.reduce((prev, curr) => (prev += curr));
    const sumB = matchB.scores.reduce((prev, curr) => (prev += curr));

    return sumB - sumA;
  });

  return matchHistory;
}

function openMatchHistory() {
  const matchHistory = JSON.parse(localStorage.getItem("matchHistory") || []);

  if (sortMode.value === "recent") {
    renderMatchHistory(sortByRecent(matchHistory));
  } else {
    renderMatchHistory(sortByScore(matchHistory));
  }

  matchHistoryOverlay.classList.remove("hidden");
}

sortMode.addEventListener("input", () => {
  const matchHistory = JSON.parse(localStorage.getItem("matchHistory") || []);

  if (sortMode.value === "recent") {
    renderMatchHistory(sortByRecent(matchHistory));
  } else {
    renderMatchHistory(sortByScore(matchHistory));
  }
});

openMatchHistoryBtn.addEventListener("click", () => {
  game.isMatchHistory = true;
  openMatchHistory();
});
closeMatchHistoryBtn.addEventListener("click", () => {
  game.isMatchHistory = false;
  matchHistoryOverlay.classList.add("hidden");
});

startCountdown(3);
