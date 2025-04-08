import React from "react";

// Importing Images
import paper from "@/assets/paper.png";
import rock from "@/assets/rock.png";
import scissors from "@/assets/scissors.png";
import Image from "next/image";

// Components
import ChoicesDisplay from "@/components/ChoicesDisplay";
import EndGameDialog from "@/components/EndGameDialog";
import GameEndResult from "@/components/GameEndResult";
import GameTypeAndRoundsFrom from "@/components/GameTypeAndRoundsForm";
import PlayerInputButtons from "@/components/PlayerInputButtons";
import RulesDialog from "@/components/RulesDialog";
import ScoresAndGameDisplay from "@/components/ScoresAndGameDisplay";
import TapToContinue from "@/components/TapToContinue";

const Game = () => {
  return (
    <div className="container mx-auto p-4">
      <TapToContinue />
      <GameEndResult />
      <GameTypeAndRoundsFrom />
      <div className="flex justify-center">
        <h1 className="flex">
          <span className="hidden">Rock Paper Scissors</span>
          <Image src={rock} alt="rock" width={50} height={50} />
          <Image src={paper} alt="paper" width={50} height={50} />
          <Image src={scissors} alt="scissors" width={50} height={50} />
        </h1>
      </div>
      <ChoicesDisplay />

      <PlayerInputButtons />

      <ScoresAndGameDisplay />
      <div className="flex justify-around">
        <RulesDialog />
        <EndGameDialog />
      </div>
    </div>
  );
};

export default Game;
