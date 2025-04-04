import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
	gameType: string;
	totalRounds: number;
	currentRound: number;
	playerChoice: string;
	computerChoice: string;
	roundResult: string | null;
	playerWins: number;
	computerWins: number;
	draws: number;
	isAnimating: boolean;
	gameResult: string | null;
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
	gameResult: null,
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
		dispatch(setRoundResult(roundWinner));
		dispatch(setIsAnimating(true));

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
		currentRoundIncrement: (state) => {
			state.currentRound += 1;
		},
		setPlayerChoice: (state, playerInput) => {
			state.playerChoice = playerInput.payload;
		},

		setIsAnimating: (state, isAnimatingInput) => {
			state.isAnimating = isAnimatingInput.payload;
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
	},
});

export const {
	setGameType,
	setTotalRounds,
	currentRoundIncrement,
	setPlayerChoice,
	setIsAnimating,
	setComputerChoice,
	setRoundResult,
	updateScores,
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
