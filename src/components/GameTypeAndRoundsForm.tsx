// hooks and states
import {
  GameType,
  incrementCurrentRound,
  setDisplayGameTypeInput,
  setGameType,
  setTotalRounds,
} from "@/state/GameStateSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ui components
import { RootState } from "@/state/store";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

const GameTypeAndRoundsFrom = () => {
  const [inputValue, setInputValue] = useState(3);

  const state = useSelector((state: RootState) => state.gameState);
  const dispatch = useDispatch();
  const formIsOpen = state.displayGameTypeInput;

  // Triggers form submission when "Enter" key is pressed in the input field
  // Prevents the "." "-" "+" from getting registered into the input field
  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "." || e.key === "e" || e.key === "+" || e.key === "-") {
      e.preventDefault();
    }
    if (e.key === "Enter") handelSubmit("rounds");
  }

  // Handles any change in the input and parseInt is added to convert strings accepted by form input into numbers (Stupid react problems)
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(parseInt(e.target.value));
  }

  function handelSubmit(gameType: GameType) {
    if (gameType === "rounds") {
      if (inputValue <= 0 || inputValue % 1 != 0 || isNaN(inputValue)) {
        alert(
          "Please enter the number of rounds a whole number greater than 0 to play (eg. 3,5,7)",
        );
        return;
      }
      dispatch(setTotalRounds(inputValue));
    }
    dispatch(setGameType(gameType));
    dispatch(incrementCurrentRound());
    dispatch(setDisplayGameTypeInput(false));
  }

  return (
    <Dialog open={formIsOpen}>
      <DialogContent className="text-white [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>
            <p className="text-4xl md:text-5xl lg:text-6xl">Hello There!</p>
          </DialogTitle>
        </DialogHeader>
        <p className="text-center">
          Enter the number of rounds you want to play or just Pass & Play
        </p>
        <Input
          type="number"
          placeholder="eg. 3"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="[appearance:textfield] rounded-lg border border-slate-800 p-2 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <DialogFooter>
          <div className="flex w-full justify-center gap-4">
            <DialogClose asChild>
              <Button
                onClick={() => handelSubmit("rounds")}
                className="rounded-lg bg-blue-700 px-3 py-2 text-lg font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none md:px-5 md:py-2.5 lg:text-2xl dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Play Rounds
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => handelSubmit("pnp")}
                className="rounded-lg border-2 border-white/50 bg-gray-800 px-3 py-2 text-lg font-medium text-white transition-colors hover:bg-gray-600 md:px-5 md:py-2.5 lg:text-2xl"
              >
                Pass & Play
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameTypeAndRoundsFrom;
