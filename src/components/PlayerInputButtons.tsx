import React from "react";
import { Button } from "./ui/button";

const playerInputButtons = () => {
	function handleClick(userInput: string) {
		console.log(userInput);
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
