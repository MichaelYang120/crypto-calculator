import React, { useEffect, useState } from "react";
import { api } from "../Api/ApiRequest";

// const debug = true;
const debug = false;

export default function Search() {
	const [crypto, setCrypto] = useState([]);

	// notes: we can store the value here on sumbit handler or retrieve the data from the url after submitting the form.
	const submithandler = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		console.log(event)
	}

	useEffect(() => {
		async function getcrypto() {
			var result: any = await api();
			setCrypto(result);
		}
		getcrypto();
		if (debug) {
			console.log(crypto);
		}
	}, []);

	// notes: ticket symbols is in the url when submited
	return (
		<>
			<form action="selectcrypto">
				<select name="cryptoselect" id="cryptoselect">
					<option>select your crypto token</option>
					{crypto.map((val) =>
					<option data-askprice={val["askPrice"]} data-bidprice={val["bidPrice"]} data-symbol={val["symbol"]}>{val["symbol"]}</option>
					)}
				</select>
				<button type="submit" onSubmit={submithandler}>Submit</button>
			</form>
		</>
	);
}