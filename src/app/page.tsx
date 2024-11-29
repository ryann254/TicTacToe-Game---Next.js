"use client";
import { useState } from "react";

export default function Home() {
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));
  const winningCombinations = [
    ["cell-0", "cell-1", "cell-2"],
    ["cell-3", "cell-4", "cell-5"],
    ["cell-6", "cell-7", "cell-8"],
    ["cell-0", "cell-3", "cell-6"],
    ["cell-1", "cell-4", "cell-7"],
    ["cell-2", "cell-5", "cell-8"],
    ["cell-0", "cell-4", "cell-8"],
    ["cell-2", "cell-4", "cell-6"],
  ];
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");

  const handleClick = (rowNum: number, pos: number, id: string) => {
    const index = rowNum * 3 + pos;
    const value = currentPlayer === "Player 1" ? "X" : "O";

    if (cells[index] === "") {
      const tempCells = [...cells];
      tempCells[index] = value;
      setCells(tempCells);

      let hasWon = false;
      winningCombinations.some((combination) => {
        if (combination.includes(id)) {
          const indexes = combination.map((id) => parseInt(id.split("-")[1]));

          if (indexes.every((index) => tempCells[index] === value)) {
            console.log(`${currentPlayer} has won!!`);
            setCurrentPlayer("Player 1");
            setTimeout(() => setCells(Array(9).fill("")), 500);
            hasWon = true;
            return true;
          }
        }
        return false;
      });

      if (!hasWon) {
        setCurrentPlayer((prevState) =>
          prevState === "Player 1" ? "Player 2" : "Player 1"
        );
      }
    }
  };

  return (
    <main className="container mx-auto w-full">
      <h1 className="text-3xl font-bold text-center my-5">Tic Tac Toe</h1>
      <div className="text-center">Player turn: {currentPlayer}</div>
      <div className="grid grid-cols-3 w-[300px] mx-auto">
        {Array(9)
          .fill(null)
          .map((_, index) => {
            const rowNumber = Math.floor(index / 3);
            const position = index % 3;
            return (
              <div
                key={index}
                id={`cell-${index}`}
                onClick={() =>
                  handleClick(rowNumber, position, `cell-${index}`)
                }
                className="w-[100px] h-[100px] border border-black text-2xl font-bold flex items-center justify-center cell"
              >
                {cells[index]}
              </div>
            );
          })}
      </div>
    </main>
  );
}
