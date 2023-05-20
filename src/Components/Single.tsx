import React from "react";

const debug = true;

export default function Single() {
	function getCurrentURL () {
		return window.location.href
	}
	const url = getCurrentURL()
	if (debug) {
		console.log(url)

	}

	

	return (
		<>
			<div>
				Single symbol
			</div>
		</>
	);
}