import React, { useEffect, useState, ChangeEvent } from "react";
import { api } from "../Api/ApiRequest";

const debug = true;
// const debug = false;

export default function Main() {
	const [crypto, setCrypto] = useState([]);

	const updateprice = (event: ChangeEvent<HTMLInputElement>) => {
		var target = event.target;
		var targetclass = target.getAttribute("class");
		var targetval = target.value;
		var datasymbol = target.getAttribute("data-symbol");

		function calculateprice(price: any) {
			var newbidprice = Number(targetval) * Number(price);
			var bidpriceset = newbidprice.toString();
			return bidpriceset;
		}
		function updatetext(priceset: string, pricetype: string) {
			var getclassname = document.getElementById(`${pricetype}${datasymbol}`);
			console.log(getclassname);
			if (getclassname !== null) {
					if (priceset !== "0") {
						getclassname.innerText =
							`My ${pricetype} price would be: ` + priceset;
						getclassname.style.color = "black"
						if(priceset.toString().includes("-")) {
							getclassname.innerText = "Please enter a valid value"
							getclassname.style.color = "red"	
						}
					} else {
						getclassname.innerText = "Please enter a value"
						getclassname.style.color = "red"
					}
				} else {
					console.log("getclassname is null");
					alert("We are having technical difficulty please try again later.");
				}
				if (debug === true) {
					console.log(getclassname);
				}
		}
		if (targetclass?.includes("bidprice")) {
			var databidprice = target.getAttribute("data-bidprice");
			var bidpriceset = calculateprice(databidprice);
			updatetext(bidpriceset, "bid");
		}
		if (targetclass?.includes("askprice")) {
			var dataaskprice = target.getAttribute("data-askprice");
			var askpriceset = calculateprice(dataaskprice);
			updatetext(askpriceset, "ask");
		}
	};

	useEffect(() => {
		async function getcrypto() {
			var result: any = await api();
			setCrypto(result);
		}
		getcrypto();
		if (debug === true) {
			console.log(crypto);
		}
	}, []);

	// can we add a feature for quick search?

	return (
		<>
			<div>quick search goes here</div>
			{crypto.map((val) => {
				if (
					val["askPrice"] !== "0.00000000" &&
					val["bidPrice"] !== "0.00000000"
				) {
					return (
						<div className="maincontainer">
							<h3 className="cryptoname">{val["symbol"]}</h3>
							<div className="mypricecontainer">
								<p id={"ask" + val["symbol"]} />
								<p id={"bid" + val["symbol"]} />
							</div>
							<div className="cryptoinnercontainer">
								<p>Asking Price : {val["askPrice"]}</p>
								<input
                                    id="inputdefault"
									className={"askprice" + val["symbol"]}
									type="number"
									data-askprice={val["askPrice"]}
									placeholder="Estimate My Asking Price"
									onChange={updateprice}
									data-symbol={val["symbol"]}
								/>
								<p>Bid Price : {val["bidPrice"]}</p>
								<input
                                    id="inputdefault"
									className={"bidprice" + val["symbol"]}
									type="number"
									data-bidprice={val["bidPrice"]}
									placeholder="Estimate My Bid Price"
									onChange={updateprice}
									data-symbol={val["symbol"]}
								/>
							</div>
						</div>
					);
				}
			})}
		</>
	);
}
