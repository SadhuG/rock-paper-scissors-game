import React from "react";

const ScoresAndGameDisplay = () => {
	return (
		<div className="text-center">
			<p>
				Game Type: <span>pnp</span>
			</p>
			<p>
				Total Rounds: <span>3</span>
			</p>
			<p>
				Current Round: <span>1</span>
			</p>
			<p>
				Ties: <span>1</span>
			</p>
			<p>
				Player Won: <span>1</span>
			</p>
			<p>
				Computer Won: <span>0</span>
			</p>
		</div>
	);
};

export default ScoresAndGameDisplay;
