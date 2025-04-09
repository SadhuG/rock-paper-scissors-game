import { RootState } from "@/state/store";
import React from "react";
import { useSelector } from "react-redux";
import RoundResultCard from "./ui/round-result-card";
import SlotCard from "./ui/slot-card";

const ChoicesDisplay = () => {
  const state = useSelector((state: RootState) => state.gameState);
  return (
    <div className="mx-auto grid grid-cols-2 gap-4 md:grid-cols-3">
      <div className="w-full">
        <div className="mx-auto aspect-square max-w-40 lg:w-4/5 lg:max-w-44">
          <SlotCard player={"player"} />
        </div>
        <p className="text-center">Player</p>
      </div>
      <div className="w-full max-md:col-span-full max-md:row-start-2">
        <div
          className={`${state.displayRoundResult ? "justify-start" : "justify-center"} mx-auto flex aspect-square max-h-40 max-w-40 flex-col items-center justify-center gap-3 max-md:w-1/2 lg:max-h-44 lg:w-4/5 lg:max-w-44`}
        >
          {state.displayRoundResult ? (
            <>
              <RoundResultCard displayResult={state.displayRoundResult} />
            </>
          ) : (
            <>
              <span className="text-6xl font-bold text-white"> v/s</span>
            </>
          )}
        </div>
        {state.displayRoundResult ? (
          <p className="text-center text-base text-white/80">Tap to continue</p>
        ) : (
          ""
        )}
      </div>
      <div className="w-full">
        <div className="mx-auto aspect-square max-w-40 lg:w-4/5 lg:max-w-44">
          <SlotCard player={"computer"} />
        </div>
        <p className="text-center">Computer</p>
      </div>
    </div>
  );
};

export default ChoicesDisplay;
