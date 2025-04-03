import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
		playerWinsIncrement: (state) => {
			state.playerWins += 1;
		},
		computerWinsIncrement: (state) => {
			state.computerWins += 1;
		},
		drawsIncrement: (state) => {
			state.draws += 1;
		},
	},
});

export const {} = gameStateSlice.actions;
export default gameStateSlice.reducer;
