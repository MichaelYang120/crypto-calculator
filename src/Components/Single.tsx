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
		var status = false;
		set.forEach(element => {
			status = true;
			if(currentselectedsymbol === element["symbol"] && status === true) {
				console.log(element)
				var newvalue = element;
				return newvalue;
			}
			status = false;
		});

	}

	var myselectedsymbol = getvalues(urlreg, crypto)
	return (
		<>
		{crypto.map((val) => {
			if(val["symbol"] === urlreg) {
				<div>{val} testing</div>
			} else {
				<div>none</div>
			}
		})}
		</>
	)

}