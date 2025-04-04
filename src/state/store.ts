import gameStateReducer from "@/state/GameStateSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: { gameState: gameStateReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
