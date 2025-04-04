import { playRoundAsync, setPlayerChoice } from "@/state/GameStateSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../state/store'; // You'll need to create this type
import { Button } from "./ui/button";

const PlayerInputButtons: React.FC = () => {
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

export default PlayerInputButtons;
