import { playRound, setPlayerChoice } from "@/state/GameStateSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";

const playerInputButtons = () => {
	const dispatch = useDispatch();
	function handleClick(userInput: string) {
		dispatch(setPlayerChoice(userInput));
		dispatch(playRound());
	}

	return (
		<div className="flex justify-center">
			<Button
				onClick={() => handleClick("rock")}
				variant={"outline"}
			>
				Rock
			</Button>
			<Button
				onClick={() => handleClick("paper")}
				variant={"outline"}
			>
				Paper
			</Button>
			<Button
				onClick={() => handleClick("scissors")}
				variant={"outline"}
			>
				Scissors
			</Button>
		</div>
	);
};

export default playerInputButtons;
