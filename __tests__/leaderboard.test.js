import { sortScores } from '../leaderboard.js';

test('sortScores returns top 10 scores by wave and time', () => {
  const scores = [
    { initials: 'A', wave: 2, timeLeft: 10 },
    { initials: 'B', wave: 3, timeLeft: 20 },
    { initials: 'C', wave: 3, timeLeft: 5 },
    { initials: 'D', wave: 1, timeLeft: 50 },
    { initials: 'E', wave: 4, timeLeft: 40 },
    { initials: 'F', wave: 4, timeLeft: 35 },
    { initials: 'G', wave: 5, timeLeft: 25 },
    { initials: 'H', wave: 2, timeLeft: 5 },
    { initials: 'I', wave: 5, timeLeft: 30 },
    { initials: 'J', wave: 1, timeLeft: 10 },
    { initials: 'K', wave: 3, timeLeft: 15 },
    { initials: 'L', wave: 5, timeLeft: 20 }
  ];

  const sorted = sortScores([...scores]);
  const top10 = sorted.slice(0, 10).map(s => s.initials);
  const expected = ['L','G','I','F','E','C','K','B','H','A'];
  expect(top10).toEqual(expected);
});
