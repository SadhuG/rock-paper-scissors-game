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
import { gameRestart } from "@/state/GameStateSlice";
import React from "react";
import { useDispatch } from "react-redux";

const EndGameDialog = () => {
	const dispatch = useDispatch();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">End Game</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Exit Game</DialogTitle>
					<DialogDescription>
						Do you really want to exit game?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							variant="secondary"
							onClick={() => dispatch(gameRestart())}
						>
							Yes
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							type="button"
							variant="default"
						>
							No
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EndGameDialog;
