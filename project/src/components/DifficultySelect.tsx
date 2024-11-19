import React from 'react';
import { Trophy } from 'lucide-react';

interface DifficultySelectProps {
  difficulties: {
    [key: string]: {
      name: string;
      rows: number;
      cols: number;
      mines: number;
    };
  };
  onSelect: (difficulty: string) => void;
  highScores: {
    [key: string]: number;
  };
}

export function DifficultySelect({ difficulties, onSelect, highScores }: DifficultySelectProps) {
  return (
    <div className="space-y-4">
      {Object.entries(difficulties).map(([key, diff]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors
                     border-2 border-blue-200 flex flex-col items-center space-y-2"
        >
          <span className="text-xl font-semibold">{diff.name}</span>
          <div className="text-sm text-blue-600">
            {diff.rows}x{diff.cols} • {diff.mines} minas
          </div>
          {highScores[key] && (
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <Trophy size={16} />
              <span>Recorde: {highScores[key]}</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}