import React, { useEffect } from "react";
import { api } from "../Api/ApiRequest";

const debug = true;

export default function Search() {

    useEffect(() => {
		async function getcrypto() {
			var result: any = await api();
		}
		getcrypto();
		if (debug) {
			console.log(crypto);
		}
	}, []);

	return (
		<>
            <div>
                search
            </div>
		</>
	);
}