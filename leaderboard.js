export function sortScores(scores) {
  return scores.sort((a, b) => {
    if (b.wave !== a.wave) {
      return b.wave - a.wave;
    }
    return a.timeLeft - b.timeLeft;
  });
}
