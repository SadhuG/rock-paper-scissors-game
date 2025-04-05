import { RootState } from "@/state/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type ResultType = "win" | "lose" | "draw";

type RoundResultCardProps = {
	displayResult: boolean;
};

const RoundResultCard: React.FC<RoundResultCardProps> = ({ displayResult }) => {
	const state = useSelector((state: RootState) => state.gameState);
	const roundResult = state.roundResult as ResultType | null;
	const [resultMessage, setResultMessage] = useState<string | null>(null);
	const messages: Record<ResultType, string> = {
		win: "Player Won!",
		lose: "Computer Won!",
		draw: "It's a draw",
	};

	useEffect(() => {
		if (displayResult && roundResult) {
			setResultMessage(messages[roundResult]);
		} else {
			setResultMessage(null);
		}
	}, [displayResult]);

	return <div>{resultMessage}</div>;
};

export default RoundResultCard;
