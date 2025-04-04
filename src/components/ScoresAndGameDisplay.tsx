import React from "react";

import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const ScoresAndGameDisplay = () => {
	const gameState = useSelector((state: RootState) => state.gameState);
	return (
		<div className="text-center">
			<p>
				Game Type:{" "}
				<span>
					{gameState.gameType === "rounds" ? "Rounds" : "Pass & Play"}
				</span>
			</p>
			{gameState.gameType === "rounds" ? (
				<p>
					Total Rounds: <span>{gameState.totalRounds}</span>
				</p>
			) : (
				""
			)}
			<p>
				Current Round: <span>{gameState.currentRound}</span>
			</p>
			<p>
				Draws: <span>{gameState.draws}</span>
			</p>
			<p>
				Player Won: <span>{gameState.playerWins}</span>
			</p>
			<p>
				Computer Won: <span>{gameState.computerWins}</span>
			</p>
		</div>
	);
};

export default ScoresAndGameDisplay;
