import { playRoundAsync, setPlayerChoice } from "@/state/GameStateSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store"; // You'll need to create this type
import { Button } from "./ui/button";

const PlayerInputButtons: React.FC = () => {
	const state = useSelector((state: RootState) => state.gameState);
	// Use AppDispatch instead of default dispatch
	const dispatch = useDispatch<AppDispatch>();

	function handleClick(userInput: string) {
		dispatch(setPlayerChoice(userInput));

		dispatch(playRoundAsync());
	}

	return (
		<div className="flex justify-center">
			<Button
				onClick={() => handleClick("rock")}
				variant={"outline"}
				disabled={state.inputsDisabled}
			>
				Rock
			</Button>
			<Button
				onClick={() => handleClick("paper")}
				variant={"outline"}
				disabled={state.inputsDisabled}
			>
				Paper
			</Button>
			<Button
				onClick={() => handleClick("scissors")}
				variant={"outline"}
				disabled={state.inputsDisabled}
			>
				Scissors
			</Button>
		</div>
	);
};

export default PlayerInputButtons;
