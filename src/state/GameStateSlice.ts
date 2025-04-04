import { createSlice } from "@reduxjs/toolkit";

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
	gameResult: null,
};

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
		setComputerChoice: (state, computerInput) => {
			state.computerChoice = computerInput.payload;
		},
		setRoundResult: (state, result) => {
			state.roundResult = result.payload;
		},

		// This is Game Logic
		playRound: (state) => {
			const computerChoice = getComputerChoice();
			setComputerChoice(computerChoice);
			const playerChoice = state.playerChoice;

			const roundWinner = determineRoundResult(playerChoice, computerChoice);
			setRoundResult(roundWinner);

			// Log the choices and the winner
			console.log(
				`User choice: ${playerChoice} 
				Computer choice: ${computerChoice}, 
				Winner: ${roundWinner}`
			);

			switch (roundWinner) {
				case "win":
					state.playerWins += 1;
					break;
				case "lose":
					state.computerWins += 1;
					break;
				case "draw":
					state.draws += 1;
					break;

				default:
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
	setComputerChoice,
	playRound,
	setRoundResult,
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
