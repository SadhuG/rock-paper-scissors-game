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
import { exitGame } from "@/state/GameStateSlice";
import React from "react";
import { useDispatch } from "react-redux";

const EndGameDialog = () => {
  const dispatch = useDispatch();

  function handleExit() {
    dispatch(exitGame());
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-lg border-none bg-rose-600 text-xl font-medium text-white hover:bg-rose-800 hover:text-white focus:ring-4 focus:ring-rose-300 focus:outline-none lg:text-2xl dark:bg-rose-500 dark:hover:bg-rose-700 dark:focus:ring-rose-900"
        >
          End Game
        </Button>
      </DialogTrigger>
      <DialogContent className="text-white">
        <DialogHeader>
          <DialogTitle>Exit Game</DialogTitle>
        </DialogHeader>
        <p> Do you really want to exit game?</p>
        <DialogFooter>
          <DialogClose asChild onClick={() => handleExit()}>
            <Button
              type="button"
              variant="secondary"
              className="rounded-lg border-none bg-rose-600 text-xl font-medium text-white hover:bg-rose-800 hover:text-white focus:ring-4 focus:ring-rose-300 focus:outline-none lg:text-2xl dark:bg-rose-500 dark:hover:bg-rose-700 dark:focus:ring-rose-900"
            >
              Yes
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-xl font-medium text-white hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 focus:outline-none lg:text-2xl dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-900"
            >
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EndGameDialog;
