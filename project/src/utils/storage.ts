export function getHighScores(): { [key: string]: number } {
  const scores = localStorage.getItem('minesweeper-highscores');
  return scores ? JSON.parse(scores) : {};
}

export function saveHighScore(difficulty: string, score: number): void {
  const scores = getHighScores();
  scores[difficulty] = score;
  localStorage.setItem('minesweeper-highscores', JSON.stringify(scores));
}