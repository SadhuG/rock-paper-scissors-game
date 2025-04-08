import { RootState } from "@/state/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// image import
import handShakeImg from "@/assets/handshake-img.png";
import manInTuxImg from "@/assets/man-in-tuxedo-img.png";
import robotImg from "@/assets/robot-img.png";
import Image, { StaticImageData } from "next/image";

type ResultType = "win" | "lose" | "draw";

type ResultMessage = {
  text: string;
  img: StaticImageData;
  backgroundGradient: string;
};

type RoundResultCardProps = {
  displayResult: boolean;
};

const RoundResultCard: React.FC<RoundResultCardProps> = ({ displayResult }) => {
  const state = useSelector((state: RootState) => state.gameState);
  const roundResult = state.roundResult as ResultType | null;
  const [resultMessage, setResultMessage] = useState<ResultMessage | null>(
    null,
  );
  const messages: Record<ResultType, ResultMessage> = {
    win: {
      text: "Player Won!",
      img: manInTuxImg,
      backgroundGradient: "bg-gradient-to-b from-green-300",
    },
    lose: {
      text: "Computer Won!",
      img: robotImg,
      backgroundGradient: "bg-gradient-to-b from-red-300",
    },
    draw: {
      text: "It's a draw",
      img: handShakeImg,
      backgroundGradient: "bg-gradient-to-b from-amber-300",
    },
  };

  useEffect(() => {
    if (displayResult && roundResult) {
      setResultMessage(messages[roundResult]);
    } else {
      setResultMessage(null);
    }
  }, [displayResult, roundResult]);

  return (
    <>
      {resultMessage && (
        <div
          className={`rounded-3xl text-center text-3xl font-medium ${resultMessage.backgroundGradient}`}
        >
          <Image
            src={resultMessage.img}
            alt={resultMessage.text}
            loading="eager"
          />
          <p>{resultMessage.text}</p>
        </div>
      )}
    </>
  );
};

export default RoundResultCard;
