import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
	gameType: "pnp" | "rounds";
	totalRounds: number;
	currentRound: number;
	playerChoice: string;
	computerChoice: string;
	roundResult: string | null;
	playerWins: number;
	computerWins: number;
	draws: number;
	isAnimating: boolean;
	inputsDisabled: boolean;
	displayRoundResult: boolean;
	gameWinner: string | null;
	displayGameWinner: boolean;
}

const initialState: GameState = {
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

// Create the async thunk
export const playRoundAsync = createAsyncThunk(
	"gameState/playRoundAsync",
	async (_, { dispatch, getState }) => {
		const state = getState() as { gameState: GameState };
		const computerChoice = getComputerChoice();
		const playerChoice = state.gameState.playerChoice;
		const roundWinner = determineRoundResult(playerChoice, computerChoice);

		// First dispatch immediate state updates
		dispatch(setComputerChoice(computerChoice));
		dispatch(setRoundResult(roundWinner)); // Here roundWinner is correctly a string
		dispatch(setIsAnimating(true));
		dispatch(setInputDisabled(true));

		// Log the choices and winner
		console.log(
			`User choice: ${playerChoice}
            Computer choice: ${computerChoice},
            Winner: ${roundWinner}`
		);

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
		// state setters
		setGameType: (state, gameTypeInput) => {
			state.gameType = gameTypeInput.payload;
		},
		setTotalRounds: (state, roundsInput) => {
			state.totalRounds = roundsInput.payload;
		},

		setPlayerChoice: (state, playerInput) => {
			state.playerChoice = playerInput.payload;
		},

		setComputerChoice: (state, action: PayloadAction<string>) => {
			state.computerChoice = action.payload;
		},
		setRoundResult: (state, action: PayloadAction<string>) => {
			state.roundResult = action.payload;
		},
		updateScores: (state, action: PayloadAction<string>) => {
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
		setIsAnimating: (state, actions) => {
			state.isAnimating = actions.payload;
		},
		setInputDisabled: (state, actions) => {
			state.inputsDisabled = actions.payload;
		},
		setDisplayRoundResult: (state, actions) => {
			state.displayRoundResult = actions.payload;
		},
		endRound: (state) => {
			state.displayRoundResult = false;
			state.inputsDisabled = false;
			state.currentRound += 1;

			const { gameWinner, shouldDisplayWinner } =
				checkAndDetermineGameWinner(state);
			state.gameWinner = gameWinner;
			state.displayGameWinner = shouldDisplayWinner;
		},
	},
});

export const {
	setGameType,
	setTotalRounds,
	setPlayerChoice,
	setIsAnimating,
	setComputerChoice,
	setRoundResult,
	updateScores,
	setInputDisabled,
	setDisplayRoundResult,
	endRound,
} = gameStateSlice.actions;
export default gameStateSlice.reducer;

// helper functions
// These functions are not part of the Redux slice but are used within it
export const getComputerChoice = () => {
	const choices = ["rock", "paper", "scissors"];
	const randomIndex = Math.floor(Math.random() * choices.length);
	const computerChoice = choices[randomIndex];
	return computerChoice;
};

export const determineRoundResult = (
	playerChoice: string,
	computerChoice: string
) => {
	if (playerChoice === computerChoice) {
		return "draw";
	} else if (
		(playerChoice === "rock" && computerChoice === "scissors") ||
		(playerChoice === "paper" && computerChoice === "rock") ||
		(playerChoice === "scissors" && computerChoice === "paper")
	) {
		return "win";
	} else {
		return "lose";
	}
};
export const determineGameWinner = (
	playerWins: number,
	computerWins: number
) => {
	if (playerWins === computerWins) {
		return "draw";
	} else if (playerWins > computerWins) {
		return "player";
	} else {
		return "computer";
	}
};

export const checkAndDetermineGameWinner = (
	state: GameState
): { gameWinner: string | null; shouldDisplayWinner: boolean } => {
	if (state.gameType === "rounds" && state.currentRound === state.totalRounds) {
		const whoWon = determineGameWinner(state.playerWins, state.computerWins);
		return {
			gameWinner: whoWon,
			shouldDisplayWinner: true,
		};
	}
	return {
		gameWinner: null,
		shouldDisplayWinner: false,
	};
};
