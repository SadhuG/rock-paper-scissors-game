import { gameRestart } from "@/state/GameStateSlice";
import { RootState } from "@/state/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";

const messages = {
	player: {
		title: "Yay you won",
		image: "",
		message: "Wanna continue this winning streak",
		buttonText: "Play Again",
	},
	computer: {
		title: "You Lost",
		image: "",
		message: "Don't loose hope we're rooting for you",
		buttonText: "Start Again",
	},
	draw: {
		title: "It's a Draw",
		image: "",
		message: "We wish you all the best",
		buttonText: "Try Again",
	},
};

const GameEndResult = () => {
	const dispatch = useDispatch();

	const [resultMessage, setResultMessage] = useState<
		(typeof messages)["player" | "computer" | "draw"] | null
	>(null);

	const state = useSelector((state: RootState) => state.gameState);

	const gameWinner = state.gameWinner;

	const displayResult = state.displayGameWinner;

	useEffect(() => {
		if (displayResult && gameWinner) {
			setResultMessage(messages[gameWinner]);
		} else {
			setResultMessage(null);
		}
	}, [displayResult]);

	return (
		<Dialog open={displayResult}>
			<DialogContent className="[&>button]:hidden">
				<DialogHeader>
					<DialogTitle>{resultMessage?.title}</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					{/* Image to be added later */}
					{resultMessage?.message}
				</DialogDescription>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							variant="secondary"
							onClick={() => dispatch(gameRestart())}
						>
							{resultMessage?.buttonText}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default GameEndResult;
