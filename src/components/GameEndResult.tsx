import { gameRestart } from "@/state/GameStateSlice";
import { RootState } from "@/state/store";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type ResultMessageType = {
  title: string;
  image: string | StaticImport;
  alt: string;
  message: string;
  buttonText: string;
};

type ResultKey = "player" | "computer" | "draw";

const messages: Record<ResultKey, ResultMessageType> = {
  player: {
    title: "Yay you won",
    image:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20in%20Tuxedo.png",
    alt: "Man in Tuxedo",
    message: "Wanna continue this winning streak",
    buttonText: "Play Again",
  },
  computer: {
    title: "You Lost",
    image:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png",
    alt: "Robot",
    message: "Don't loose hope we're rooting for you",
    buttonText: "Start Again",
  },
  draw: {
    title: "It's a Draw",
    image:
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png",
    alt: "Handshake",
    message: "We wish you all the best",
    buttonText: "Try Again",
  },
};

const GameEndResult = () => {
  const dispatch = useDispatch();

  const [resultMessage, setResultMessage] = useState<ResultMessageType | null>(
    null,
  );

  const state = useSelector((state: RootState) => state.gameState);

  const gameWinner = state.gameWinner;

  const displayResult = state.displayGameWinner;

  useEffect(() => {
    if (displayResult && gameWinner) {
      setResultMessage(messages[gameWinner]);
    } else {
      setResultMessage(null);
    }
  }, [displayResult]);

  if (!resultMessage) return null;

  return (
    <Dialog open={displayResult}>
      <DialogContent className="flex flex-col items-center justify-center text-white [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>{resultMessage?.title}</DialogTitle>
        </DialogHeader>
        <Image
          src={resultMessage.image}
          alt={resultMessage.alt}
          width={200}
          height={200}
          loading="eager"
        />
        {resultMessage?.message}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => dispatch(gameRestart())}
              className="rounded-lg bg-blue-700 px-3 py-2 text-lg font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none md:px-5 md:py-2.5 lg:text-2xl dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {resultMessage?.buttonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameEndResult;
