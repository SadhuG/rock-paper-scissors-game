import gameStateReducer from "@/state/GameStateSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: { gameState: gameStateReducer },
});
