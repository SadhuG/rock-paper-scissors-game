import React from "react";
import SlotCard from "./ui/slot-card";

const ChoicesDisplay = () => {
	return (
		<div className="mx-auto grid grid-cols-2 gap-4 md:grid-cols-3">
			<div className="relative aspect-square w-full border">
				<div className="absolute inset-0 m-auto aspect-square w-4/5 border">
					<SlotCard player={"player"} />
				</div>
				<p className="absolute right-0 bottom-2 left-0 text-center">Player</p>
			</div>
			<div className="relative aspect-square w-full border max-md:col-span-full max-md:row-start-2">
				<div className="absolute inset-0 flex aspect-square w-4/5 items-center justify-center border">
					v/s
				</div>
			</div>
			<div className="relative aspect-square w-full border">
				<div className="absolute inset-0 m-auto aspect-square w-4/5 border">
					<SlotCard player={"computer"} />
				</div>
				<p className="absolute right-0 bottom-2 left-0 text-center">Computer</p>
			</div>
		</div>
	);
};

export default ChoicesDisplay;
