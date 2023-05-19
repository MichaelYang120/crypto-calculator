import React, { useEffect, useState } from "react";
import { api } from "../Api/ApiRequest";

// const debug = true;
const debug = false;

export default function Search() {
    const [crypto, setCrypto] = useState([]);

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

	return (
		<>
            <select name="cryptoselect" id="cryptoselect">
                <option>select your crypto token</option>
                {crypto.map((val) =>
                <option>{val["symbol"]}</option>
                )}
            </select>
		</>
	);
}