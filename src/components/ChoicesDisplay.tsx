import { RootState } from "@/state/store";
import React from "react";
import { useSelector } from "react-redux";
import RoundResultCard from "./ui/round-result-card";
import SlotCard from "./ui/slot-card";

const ChoicesDisplay = () => {
  const state = useSelector((state: RootState) => state.gameState);
  return (
    <div className="mx-auto grid grid-cols-2 gap-4 md:grid-cols-3">
      <div className="w-full border">
        <div className="mx-auto aspect-square border max-md:max-w-40 lg:w-4/5">
          <SlotCard player={"player"} />
        </div>
        <p className="text-center">Player</p>
      </div>
      <div className="w-full border max-md:col-span-full max-md:row-start-2">
        <div className="mx-auto flex aspect-square flex-col items-center justify-center gap-3 border max-md:w-1/2 max-md:max-w-40 lg:w-4/5">
          {state.displayRoundResult ? (
            <>
              <RoundResultCard displayResult={state.displayRoundResult} />
              <p>Tap to continue</p>
            </>
          ) : (
            <>
              <span className="text-6xl font-bold"> v/s</span>
            </>
          )}
        </div>
      </div>
      <div className="w-full border">
        <div className="mx-auto aspect-square border max-md:max-w-40 lg:w-4/5">
          <SlotCard player={"computer"} />
        </div>
        <p className="text-center">Computer</p>
      </div>
    </div>
  );
};

export default ChoicesDisplay;
