import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

import { firebaseConfig } from "./firebaseConfig.js";
import { sortScores } from "./leaderboard.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function submitScore(initials, wave, timeLeft) {
  return push(ref(db, 'scores'), {
    initials: initials.toUpperCase(),
    wave,
    timeLeft,
    timestamp: Date.now()
  });
}

function loadTopScores() {
  const message = document.getElementById('leaderboardMessage');
  return get(ref(db, 'scores'))
    .then(snap => {
      const data = snap.val() || {};
      const scores = Object.values(data);
      sortScores(scores);
      if (message) message.textContent = '';
      return scores.slice(0, 10);
    })
    .catch(err => {
      console.error(err);
      if (message) message.textContent = 'Unable to load leaderboard.';
      throw err;
    });
}

function renderLeaderboard(rows) {
  const tbody = document.querySelector('#leaderboard tbody');
  tbody.innerHTML = '';
  rows.forEach(row => {
    const tr = document.createElement('tr');
    const dateCell = new Date(row.timestamp).toISOString().split('T')[0];
    tr.innerHTML = `<td>${row.initials}</td><td>${row.wave}</td><td>${row.timeLeft}</td><td>${dateCell}</td>`;
    tbody.appendChild(tr);
  });
}

function fillRandomScore() {
  const randLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
  document.getElementById('initials').value = randLetter() + randLetter() + randLetter();
  document.getElementById('wave').value = Math.floor(Math.random() * 4) + 2; // 2-5
  document.getElementById('time').value = Math.floor(Math.random() * 60) + 1;
  const offset = Math.floor(Math.random() * 365);
  const date = new Date(Date.now() - offset * 86400000);
  document.getElementById('date').value = date.toISOString().split('T')[0];
}

document.getElementById('scoreForm').addEventListener('submit', e => {
  e.preventDefault();
  const initials = document.getElementById('initials').value;
  const wave = parseInt(document.getElementById('wave').value, 10);
  const time = parseInt(document.getElementById('time').value, 10);
  submitScore(initials, wave, time).then(() => loadTopScores().then(renderLeaderboard));
});

document.getElementById('randomBtn').addEventListener('click', fillRandomScore);

document.getElementById('refreshBtn').addEventListener('click', () => {
  loadTopScores().then(renderLeaderboard);
});

loadTopScores().then(renderLeaderboard);
