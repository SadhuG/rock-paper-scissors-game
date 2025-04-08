import { RootState } from "@/state/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import paper from "@/assets/paper.png";
import parcel from "@/assets/parcel.png";
import rock from "@/assets/rock.png";
import scissors from "@/assets/scissors.png";
import Image, { StaticImageData } from "next/image";

interface SlotCardProps {
  player: "player" | "computer"; // More specific typing
}
type SlotTileKey = "rock" | "paper" | "scissors" | "parcel";

const slotTiles: Record<SlotTileKey, StaticImageData> = {
  rock: rock,
  paper: paper,
  scissors: scissors,
  parcel: parcel,
};

const slotChoices = {
  rock: rock,
  paper: paper,
  scissors: scissors,
};

const SlotCard: React.FC<SlotCardProps> = ({ player }) => {
  const state = useSelector((state: RootState) => state.gameState);

  const [currentIndex, setCurrentIndex] = useState(0);
  //Gives an array of ['rock','paper',scissors'] for the slot to loop around
  const tiles = Object.keys(slotTiles) as SlotTileKey[];
  const slotDisplay = Object.keys(slotChoices);

  // Border color for the slot card
  const [borderClr, setBorderClr] = useState("border-zinc-400");

  // Update the choice type to be more specific
  let choice: SlotTileKey | undefined;
  if (player === "player") {
    // Cast the playerChoice to SlotTileKey since we know it will be one of those values
    choice = state.playerChoice as SlotTileKey;
  } else {
    // Handle computer choice as well
    choice = state.computerChoice as SlotTileKey;
  }

  // useEffect for Animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.isAnimating) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slotDisplay.length);
      }, 300); // Adjust speed as needed
    } else if (choice) {
      setCurrentIndex(tiles.indexOf(choice));
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isAnimating, state.playerChoice, state.computerChoice]);

  // useEffect for border color
  useEffect(() => {
    if (state.displayRoundResult) {
      if (state.roundResult === "draw") {
        setBorderClr("border-amber-500");
      } else if (state.roundResult === "win") {
        if (player === "player") {
          setBorderClr("border-green-500");
        } else if (player === "computer") {
          setBorderClr("border-red-400");
        }
      } else if (state.roundResult === "lose") {
        if (player === "player") {
          setBorderClr("border-red-400");
        } else if (player === "computer") {
          setBorderClr("border-green-500");
        }
      }
    }
    if (state.roundResult === null) {
      setBorderClr("border-zinc-400");
    }
  }, [state.displayRoundResult, state.roundResult]);

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center border-8 lg:border-[10px] ${borderClr} overflow-hidden rounded-3xl transition-colors duration-300`}
    >
      <div className="flex h-full w-full items-center justify-center">
        <Image
          className={`h-full w-full object-cover transition-transform ${
            state.isAnimating ? "animate-slide" : ""
          }`}
          src={slotTiles[tiles[currentIndex]]}
          alt="slot symbol"
        />
      </div>
    </div>
  );
};

export default SlotCard;
