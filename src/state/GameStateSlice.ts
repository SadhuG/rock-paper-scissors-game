// Game types
export type Choice = "rock" | "paper" | "scissors" | "parcel";
export type GameType = "pnp" | "rounds";
export type RoundResult = "win" | "lose" | "draw";
export type GameWinner = "player" | "computer" | "draw" | null;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
	displayGameTypeInput: boolean;
	gameType: GameType;
	totalRounds: number;
	currentRound: number;
	playerChoice: Choice;
	computerChoice: Choice;
	roundResult: RoundResult | null;
	playerWins: number;
	computerWins: number;
	draws: number;
	isAnimating: boolean;
	inputsDisabled: boolean;
	displayRoundResult: boolean;
	gameWinner: GameWinner;
	displayGameWinner: boolean;
}

const initialState: GameState = {
	displayGameTypeInput: true,
	gameType: "pnp",
	totalRounds: 0,
	currentRound: 0,
	playerChoice: "parcel",
	computerChoice: "parcel",
	roundResult: null,
	playerWins: 0,
	computerWins: 0,
	draws: 0,
	isAnimating: false,
	inputsDisabled: false,
	displayRoundResult: false,
	gameWinner: null,
	displayGameWinner: false,
};

// Game rules mapping for more efficient win determination
const WIN_CONDITIONS: Record<Choice, Choice> = {
	rock: "scissors",
	paper: "rock",
	scissors: "paper",
	parcel: "parcel",
};

// Helper functions
export const getComputerChoice = (): Choice => {
	const choices: Choice[] = ["rock", "paper", "scissors"];
	return choices[Math.floor(Math.random() * choices.length)];
};

export const determineRoundResult = (
	playerChoice: Choice,
	computerChoice: Choice
): RoundResult => {
	if (playerChoice === computerChoice) return "draw";
	return WIN_CONDITIONS[playerChoice] === computerChoice ? "win" : "lose";
};

// Create the async thunk with proper typing
export const playRoundAsync = createAsyncThunk(
	"gameState/playRoundAsync",
	async (_, { dispatch, getState }) => {
		const state = getState() as { gameState: GameState };
		const computerChoice = getComputerChoice();
		const playerChoice = state.gameState.playerChoice;
		const roundWinner = determineRoundResult(playerChoice, computerChoice);

		// First dispatch immediate state updates
		dispatch(setComputerChoice(computerChoice));
		dispatch(setRoundResult(roundWinner));
		dispatch(setIsAnimating(true));
		dispatch(setInputDisabled(true));

		// Wait for animation
		await new Promise((resolve) => setTimeout(resolve, 2010));

		// Update final states
		dispatch(setIsAnimating(false));
		dispatch(updateScores(roundWinner));
		dispatch(setDisplayRoundResult(true));
	}
);

export const gameStateSlice = createSlice({
	name: "gameState",
	initialState,
	reducers: {
		setDisplayGameTypeInput: (state, action: PayloadAction<boolean>) => {
			state.displayGameTypeInput = action.payload;
		},
		setGameType: (state, action: PayloadAction<GameType>) => {
			state.gameType = action.payload;
		},
		setTotalRounds: (state, action: PayloadAction<number>) => {
			state.totalRounds = action.payload;
		},
		incrementCurrentRound: (state) => {
			state.currentRound += 1;
		},
		setPlayerChoice: (state, action: PayloadAction<Choice>) => {
			state.playerChoice = action.payload;
		},
		setComputerChoice: (state, action: PayloadAction<Choice>) => {
			state.computerChoice = action.payload;
		},
		setRoundResult: (state, action: PayloadAction<RoundResult>) => {
			state.roundResult = action.payload;
		},
		updateScores: (state, action: PayloadAction<RoundResult>) => {
			switch (action.payload) {
				case "win":
					state.playerWins += 1;
					break;
				case "lose":
					state.computerWins += 1;
					break;
				case "draw":
					state.draws += 1;
					break;
			}
		},
		setIsAnimating: (state, action: PayloadAction<boolean>) => {
			state.isAnimating = action.payload;
		},
		setInputDisabled: (state, action: PayloadAction<boolean>) => {
			state.inputsDisabled = action.payload;
		},
		setDisplayRoundResult: (state, action: PayloadAction<boolean>) => {
			state.displayRoundResult = action.payload;
		},
		endRound: (state) => {
			// Reset round-specific states
			state.displayRoundResult = false;
			state.inputsDisabled = false;

			if (state.gameType === "pnp") {
				state.currentRound += 1;
			}
			// Only check for game winner in rounds mode
			if (state.gameType === "rounds") {
				const isGameOver = state.currentRound === state.totalRounds;
				if (isGameOver) {
					const winner = determineGameWinner(
						state.playerWins,
						state.computerWins
					);
					state.gameWinner = winner;
					state.displayGameWinner = true;
				}
				if (!isGameOver) {
					state.currentRound += 1;
				}
			}
		},
		gameRestart: (state) => {
			state.displayGameTypeInput = true;
			state.gameType = "pnp";
			state.totalRounds = 0;
			state.currentRound = 0;
			state.playerChoice = "parcel";
			state.computerChoice = "parcel";
			state.roundResult = null;
			state.playerWins = 0;
			state.computerWins = 0;
			state.draws = 0;
			state.isAnimating = false;
			state.inputsDisabled = false;
			state.displayRoundResult = false;
			state.gameWinner = null;
			state.displayGameWinner = false;
		},
	},
});

export const {
	setDisplayGameTypeInput,
	setGameType,
	setTotalRounds,
	incrementCurrentRound,
	setPlayerChoice,
	setIsAnimating,
	setComputerChoice,
	setRoundResult,
	updateScores,
	setInputDisabled,
	setDisplayRoundResult,
	endRound,
	gameRestart,
} = gameStateSlice.actions;
export default gameStateSlice.reducer;

// Helper functions
// These functions are not part of the Redux slice but are used within it
export const determineGameWinner = (
	playerWins: number,
	computerWins: number
): GameWinner => {
	if (playerWins === computerWins) return "draw";
	return playerWins > computerWins ? "player" : "computer";
};
