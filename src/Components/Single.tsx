import React, { useEffect, useState } from "react";
import { api } from "../Api/ApiRequest";

const debug = true;

export default function Single() {
	const [crypto, setCrypto] = useState([]);

	function getCurrentURL () {
		return window.location.href
	}
	const url = getCurrentURL()
	if (debug) {
		console.log(url)

	}
	function geturlsymbolurl() {
		const replaceurl = url.replace(/.*select=/, "");
		return replaceurl
	}
	
	useEffect(() => {
		async function getcrypto() {
			var result: any = await api();
			setCrypto(result);
		}
		getcrypto();
		if (debug) {
			// console.log(crypto);
		}
	}, []);

	return (
		<>
			<div>
				Single symbol
			</div>
		</>
	);
}