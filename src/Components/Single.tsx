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

	var urlreg = geturlsymbolurl();
	var getvalues = (currentselectedsymbol=urlreg, set=crypto) => {
		set.forEach(element => {
			if(currentselectedsymbol === element["symbol"]) {
				console.log(element)
				var newvalue = element;
				return newvalue;
			}
		});

	}

	var myselectedsymbol = getvalues()
	console.log(myselectedsymbol)

	return (
		<>
		
		</>
	)

}