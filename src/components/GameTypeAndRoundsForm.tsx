// hooks and react
import React, { useState } from "react";

// ui components
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

// types for events
interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}
interface InputKeyDownEvent extends React.KeyboardEvent<HTMLInputElement> {}

const GameTypeAndRoundsFrom = () => {
	const [formIsOpen, setFormIsOpen] = useState(true);
	const [inputValue, setInputValue] = useState(3);

	// Triggers form submission when "Enter" key is pressed in the input field
	// Prevents the "." "-" "+" from getting registered into the input field
	function handleInputKeyDown(e: InputKeyDownEvent) {
		if (e.key === "." || e.key === "e" || e.key === "+" || e.key === "-") {
			e.preventDefault();
		}
		if (e.key === "Enter") handelSubmit("rounds");
	}

	// Handles any change in the input and parseInt is added to convert strings accepted by form input into numbers (Stupid react problems)
	function handleInputChange(e: InputChangeEvent) {
		setInputValue(parseInt(e.target.value));
	}

	function handelSubmit(gameType: string) {
		// set game type and rounds here
		setFormIsOpen(false);
	}
	return (
		<Dialog open={formIsOpen}>
			<DialogContent className="[&>button]:hidden">
				<DialogHeader>
					<DialogTitle>Hello There!</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Enter the number of rounds you want to play or just Pass & Play
					<Input
						type="number"
						placeholder="eg. 3"
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleInputKeyDown}
						className="[appearance:textfield] rounded-lg border border-slate-800 p-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					/>
					<Button onClick={(e) => handelSubmit("rounds")}>Play Rounds</Button>
					<Button onClick={(e) => handelSubmit("pnp")}>Pass & Play</Button>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
};

export default GameTypeAndRoundsFrom;
