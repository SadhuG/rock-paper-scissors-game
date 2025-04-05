import { endRound } from "@/state/GameStateSlice";
import { RootState } from "@/state/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TapToContinue = () => {
	const state = useSelector((state: RootState) => state.gameState);
	const displayResult = state.displayRoundResult;
	const dispatch = useDispatch();

	function tapToContinue() {
		dispatch(endRound());
	}

	return (
		displayResult && (
			<div
				role="button"
				tabIndex={0}
				aria-label="Tap to continue"
				className="absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/10"
				onClick={tapToContinue}
			>
			</div>
		)
	);
};

export default TapToContinue;
