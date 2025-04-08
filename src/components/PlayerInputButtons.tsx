import {
  Choice,
  playRoundAsync,
  setPlayerChoice,
} from "@/state/GameStateSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store"; // You'll need to create this type
import { Button } from "./ui/button";

// import images
import paper from "@/assets/paper.png";
import rock from "@/assets/rock.png";
import scissors from "@/assets/scissors.png";
import Image from "next/image";

const PlayerInputButtons = () => {
  const state = useSelector((state: RootState) => state.gameState);
  // Use AppDispatch instead of default dispatch
  const dispatch = useDispatch<AppDispatch>();

  function handleClick(userInput: Choice) {
    dispatch(setPlayerChoice(userInput));

    dispatch(playRoundAsync());
  }

  return (
    <div className="flex justify-center gap-8">
      <Button
        onClick={() => handleClick("rock")}
        variant={"outline"}
        disabled={state.inputsDisabled}
        className={`w-20 ${state.inputsDisabled && `border-teal-800 bg-teal-800/25`} h-20 rounded-full border-8 border-teal-400 bg-teal-400/25 p-2 hover:bg-teal-700 focus:ring-4 focus:ring-teal-900 focus:outline-none lg:h-28 lg:w-28 lg:border-[10px] lg:p-3`}
      >
        <Image src={rock} alt={"rock"} />
        <span className="hidden">Rock</span>
      </Button>
      <Button
        onClick={() => handleClick("paper")}
        variant={"outline"}
        disabled={state.inputsDisabled}
        className={`w-20 ${state.inputsDisabled && `border-sky-800 bg-sky-800/25`} h-20 rounded-full border-8 border-sky-400 bg-sky-400/25 p-2 hover:bg-sky-700 focus:ring-4 focus:ring-sky-900 focus:outline-none lg:h-28 lg:w-28 lg:border-[10px] lg:p-3`}
      >
        <Image src={paper} alt={"paper"} />
        <span className="hidden">Paper</span>
      </Button>
      <Button
        onClick={() => handleClick("scissors")}
        variant={"outline"}
        disabled={state.inputsDisabled}
        className={`w-20 ${state.inputsDisabled && `border-indigo-800 bg-indigo-800/25`} h-20 rounded-full border-8 border-indigo-400 bg-indigo-400/25 p-2 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-900 focus:outline-none lg:h-28 lg:w-28 lg:border-[10px] lg:p-3`}
      >
        <Image src={scissors} alt={"scissors"} />
        <span className="hidden">Scissors</span>
      </Button>
    </div>
  );
};

export default PlayerInputButtons;
