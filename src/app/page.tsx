"use client";

import { store } from "@/state/store";
import { Provider } from "react-redux";
import Game from "./Game";

export default function Home() {
	return (
		<Provider store={store}>
			<Game />
		</Provider>
	);
}
