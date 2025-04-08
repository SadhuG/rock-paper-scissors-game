import React from "react";

import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const ScoresAndGameDisplay = () => {
  const gameState = useSelector((state: RootState) => state.gameState);
  return (
    <div className="text-center">
      <p>
        Game Type:{" "}
        <span className="text-white">
          {gameState.gameType === "rounds" ? "Rounds" : "Pass & Play"}
        </span>
      </p>
      {gameState.gameType === "rounds" ? (
        <p>
          Total Rounds:{" "}
          <span className="text-white">{gameState.totalRounds}</span>
        </p>
      ) : (
        ""
      )}
      <p>
        Current Round:{" "}
        <span className="text-white">{gameState.currentRound}</span>
      </p>
      <p>
        Draws: <span className="text-white">{gameState.draws}</span>
      </p>
      <p>
        Player Won: <span className="text-white">{gameState.playerWins}</span>
      </p>
      <p>
        Computer Won:{" "}
        <span className="text-white">{gameState.computerWins}</span>
      </p>
    </div>
  );
};

export default ScoresAndGameDisplay;
