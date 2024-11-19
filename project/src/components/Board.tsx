import React, { useState, useEffect } from 'react';

interface BoardProps {
  rows: number;
  cols: number;
  mines: number;
  onGameOver: (won: boolean) => void;
  isGameOver: boolean;
}

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export function Board({ rows, cols, mines, onGameOver, isGameOver }: BoardProps) {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [firstClick, setFirstClick] = useState(true);
  const [flagsPlaced, setFlagsPlaced] = useState(0);

  const initializeBoard = () => {
    const newBoard = Array(rows).fill(null).map(() =>
      Array(cols).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    );
    return newBoard;
  };

  const placeMines = (board: Cell[][], firstRow: number, firstCol: number) => {
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      
      if (!board[randomRow][randomCol].isMine && 
          (randomRow !== firstRow || randomCol !== firstCol)) {
        board[randomRow][randomCol].isMine = true;
        minesPlaced++;
      }
    }
    
    // Calculate neighbor mines
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!board[i][j].isMine) {
          let count = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di;
              const nj = j + dj;
              if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && board[ni][nj].isMine) {
                count++;
              }
            }
          }
          board[i][j].neighborMines = count;
        }
      }
    }
    return board;
  };

  useEffect(() => {
    setBoard(initializeBoard());
    setFirstClick(true);
    setFlagsPlaced(0);
  }, [rows, cols, mines]);

  const revealCell = (row: number, col: number) => {
    if (board[row][col].isRevealed || board[row][col].isFlagged) return;

    const newBoard = [...board];
    
    if (firstClick) {
      placeMines(newBoard, row, col);
      setFirstClick(false);
    }

    if (newBoard[row][col].isMine) {
      // Game Over
      newBoard.forEach(row => row.forEach(cell => cell.isRevealed = true));
      setBoard(newBoard);
      onGameOver(false);
      return;
    }

    const revealEmpty = (r: number, c: number) => {
      if (r < 0 || r >= rows || c < 0 || c >= cols || newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) return;
      
      newBoard[r][c].isRevealed = true;
      
      if (newBoard[r][c].neighborMines === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            revealEmpty(r + i, c + j);
          }
        }
      }
    };

    revealEmpty(row, col);
    setBoard(newBoard);

    // Check win condition
    const hasWon = newBoard.every(row => 
      row.every(cell => cell.isMine ? !cell.isRevealed : cell.isRevealed)
    );
    
    if (hasWon) {
      onGameOver(true);
    }
  };

  const toggleFlag = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (board[row][col].isRevealed) return;

    const newBoard = [...board];
    const cell = newBoard[row][col];
    
    if (!cell.isFlagged && flagsPlaced >= mines) return;
    
    cell.isFlagged = !cell.isFlagged;
    setFlagsPlaced(prev => prev + (cell.isFlagged ? 1 : -1));
    setBoard(newBoard);
  };

  const getCellColor = (cell: Cell) => {
    if (cell.isRevealed) {
      if (cell.isMine) return 'bg-red-500';
      return cell.neighborMines === 0 ? 'bg-gray-200' : 'bg-gray-100';
    }
    return 'bg-blue-200 hover:bg-blue-300';
  };

  const getNumberColor = (number: number) => {
    const colors = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-blue-900', 
                   'text-red-900', 'text-cyan-600', 'text-gray-900', 'text-gray-600'];
    return colors[number];
  };

  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {board.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={`${i}-${j}`}
            className={`w-8 h-8 flex items-center justify-center font-bold text-sm 
                       ${getCellColor(cell)} transition-colors duration-200 
                       border border-blue-300 rounded`}
            onClick={() => revealCell(i, j)}
            onContextMenu={(e) => toggleFlag(i, j, e)}
            disabled={cell.isRevealed || isGameOver}
          >
            {cell.isFlagged ? '🚩' : 
             cell.isRevealed && cell.isMine ? '💣' :
             cell.isRevealed && cell.neighborMines > 0 ? 
             <span className={getNumberColor(cell.neighborMines)}>{cell.neighborMines}</span> : ''}
          </button>
        ))
      )}
    </div>
  );
}