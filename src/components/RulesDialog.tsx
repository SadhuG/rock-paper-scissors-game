import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const RulesDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-lg border-none bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none lg:text-2xl dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Rules
        </Button>
      </DialogTrigger>
      <DialogContent className="text-white">
        <DialogHeader>
          <DialogTitle>
            <div className="flex w-full justify-between">
              <p className="text-3xl font-medium">Rules:</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start gap-2">
          <p className="text-2xl font-medium lg:text-3xl">What is this? </p>
          <p>
            This is a rock paper scissors game. Built with React JS & Tailwind
            CSS framework.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-2xl font-medium lg:text-3xl">How to play</p>

          <div className="flex flex-col items-start gap-3">
            <p>
              Choose the game mode: <span className="font-medium">Rounds</span>{" "}
              or <span className="font-medium">Pass n Play</span>
            </p>
            <ul className="flex list-inside list-decimal flex-col items-start gap-2">
              <li>
                <span className="font-medium text-wrap">Rounds: </span>
                Start playing without any specific number of rounds input and
                play for as long as you want (upto 100 rounds)
              </li>
              <li>
                <span className="font-medium">Pass n play: </span>
                Start playing without any specific number of rounds input and
                play for as long as you want (upto 100 rounds)
              </li>
            </ul>
          </div>

          <ul className="flex list-inside list-disc flex-col items-start gap-2">
            <li>
              You can start the game by selecting &quot;rock&quot;,
              &quot;scissors&quot; or &quot;paper&quot;.
            </li>
            <li>Rock beats scissors, scissors beats paper, paper beats rock</li>
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="rounded-lg border-none bg-rose-600 text-xl font-medium text-white hover:bg-rose-800 hover:text-white focus:ring-4 focus:ring-rose-300 focus:outline-none lg:text-2xl dark:bg-rose-500 dark:hover:bg-rose-700 dark:focus:ring-rose-900"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RulesDialog;
