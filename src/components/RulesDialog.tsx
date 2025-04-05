import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const RulesDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Rules</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Rules:</DialogTitle>
					<DialogDescription>
						{" "}
						What is this? This is a rock paper scissors game. Built with React
						JS & Tailwind CSS framework.
					</DialogDescription>
				</DialogHeader>
				<div>
					<p>How to play</p>
					<p>Choose the game mode: Rounds or Pass n Play</p>
					<p>
						Rounds: Start playing without any specific number of rounds input
						and play for as long as you want (upto 100 rounds)
					</p>
					<p>
						Pass n play: Start playing without any specific number of rounds
						input and play for as long as you want (upto 100 rounds)
					</p>
					<p>
						You can start the game by selecting "rock", "scissors" or "paper".
					</p>
					<p>Rock beats scissors, scissors beats paper, paper beats rock</p>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							variant="secondary"
						>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default RulesDialog;
