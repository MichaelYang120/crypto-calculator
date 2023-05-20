import React from "react";

export default function Single() {
    function getCurrentURL () {
        return window.location.href
      }
    const url = getCurrentURL()
    console.log(url)


	return (
		<>
            <div>
                Single symbol
            </div>
		</>
	);
}