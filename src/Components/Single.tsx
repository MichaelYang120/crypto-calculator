import React, { useEffect, useState } from "react";
import { api } from "../Api/ApiRequest";

const debug = true;

export default function Single() {
	const [crypto, setCrypto] = useState([]);
	const [newarray, setNewArray] = useState([]);

	function getCurrentURL () {
		return window.location.href
	}
	const url = getCurrentURL()
	if (debug) {
		// console.log(url)

	}
	function geturlsymbolurl() {
		var replaceurl = url.replace(/.*select=/, "");
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

	var currentselectedsymbol = geturlsymbolurl();
	if (currentselectedsymbol !== null) {
		// console.log(currentselectedsymbol)
		var getvalues:any = crypto.map((val => {
			// if (currentselectedsymbol === val["symbol"]) {
			// 	var newarray = 
			// 		{
			// 			"symbol" : val["symbol"],
			// 			"askprice" : val["askPrice"],
			// 			"bidprice" : val["bidPrice"]
			// 		}
				
			// 	return newarray;
			// }
			if(currentselectedsymbol === val["symbol"]) {
				return val["symbol"]
			} 
		}))
		crypto.forEach(element => {
			if(currentselectedsymbol === element["symbol"]) {
				console.log(element)
			}
		});
		// setNewArray(getvalues)
	}
	// console.log(getvalues)

	if(getvalues !== "undefined") {
		// console.log(getvalues)
	}

	// if(newarray !== null) {
	// 	return (
	// 		<>test</>
	// 		// <>
	// 		// 	{newarray.map((val) => {
	// 		// 		<div>{val["symbol"]}</div>
	// 		// 	})}
	// 		// </>
	// 	);

	// } else {
	// 	return (
	// 		<>
	// 		</>
	// 	)
	// }

	return (
		<>test</>
	)

}