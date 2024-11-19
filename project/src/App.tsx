import { useState, useEffect } from 'react';
import { Bomb, Trophy, Timer, Flag, Crown } from 'lucide-react';
import { Board } from './components/Board';
import { DifficultySelect } from './components/DifficultySelect';
import { getHighScores, saveHighScore } from './utils/storage';

const difficulties = {
  easy: { rows: 8, cols: 8, mines: 10, name: 'Fácil' },
  medium: { rows: 12, cols: 12, mines: 30, name: 'Médio' },
  hard: { rows: 16, cols: 16, mines: 50, name: 'Difícil' }
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<keyof typeof difficulties | null>(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highScores, setHighScores] = useState(getHighScores());

  useEffect(() => {
    let timer: number;
    if (gameStarted && !isGameOver) {
      timer = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, isGameOver]);

  const handleGameStart = (diff: keyof typeof difficulties) => {
    setDifficulty(diff);
    setGameStarted(true);
    setTime(0);
    setScore(0);
    setIsGameOver(false);
  };

  const handleGameOver = (won: boolean) => {
    setIsGameOver(true);
    if (won && difficulty) {
      const finalScore = Math.floor(1000 * (difficulties[difficulty].rows * difficulties[difficulty].cols) / time);
      setScore(finalScore);
      
      if (finalScore > (highScores[difficulty] || 0)) {
        const newHighScores = { ...highScores, [difficulty]: finalScore };
        setHighScores(newHighScores);
        saveHighScore(difficulty, finalScore);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-white">
      <div className="container mx-auto px-4 py-8">
        {!gameStarted ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 text-blue-900">
            <div className="flex justify-center mb-6">
              <Bomb size={64} className="text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-4">Campo Minado</h1>
            
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="text-yellow-500" size={24} />
                <h2 className="text-xl font-semibold">Recordes</h2>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                {Object.entries(difficulties).map(([key, diff]) => (
                  <div key={key} className="text-center">
                    <div className="font-medium text-blue-800">{diff.name}</div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Trophy size={14} className="text-yellow-500" />
                      <span className="text-blue-600 font-mono">
                        {highScores[key] || '---'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DifficultySelect difficulties={difficulties} onSelect={handleGameStart as (difficulty: string) => void} highScores={highScores} />
          </div>
        ) : (
          <div className="max-w-fit mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-6 mb-6 text-blue-900">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Timer className="text-blue-600" />
                  <span className="font-mono text-xl">{time}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="text-blue-600" />
                  <span className="font-mono text-xl">{difficulties[difficulty!].mines}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="text-blue-600" />
                  <span className="font-mono text-xl">{score}</span>
                </div>
              </div>
              <Board
                rows={difficulties[difficulty!].rows}
                cols={difficulties[difficulty!].cols}
                mines={difficulties[difficulty!].mines}
                onGameOver={handleGameOver}
                isGameOver={isGameOver}
              />
              {isGameOver && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setGameStarted(false)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Voltar ao Menu
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;