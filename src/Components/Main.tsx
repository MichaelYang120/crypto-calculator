import React, { useEffect, useState, ChangeEvent } from "react";
import { api } from "../Api/ApiRequest";

// const debug = true;
const debug = false;

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
			if(debug) {
				console.log(getclassname);

			}
			if (getclassname !== null) {
				if (priceset !== "0") {
					getclassname.innerText =
						`My ${pricetype} price would be: ${priceset}`;
					getclassname.style.color = "black";
					if (priceset.toString().includes("-")) {
						getclassname.innerText = "Please enter a valid value"
						getclassname.style.color = "red"
					}
				} else {
					getclassname.innerText = "Please enter a value"
					getclassname.style.color = "red"
				}
			} else {
				if (debug) {
					console.log("getclassname is null");
					alert("We are having technical difficulty please try again later.");

				}
			}
			if (debug) {
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
		if (debug) {
			console.log(crypto);
		}
	}, []);

	// styles
	const maincontainer = {
		padding: "10px 10px",
		backgroundColor: "aliceblue",
		margin: "10px"
	}

	const cryptoname = {
		textAlign: "center" as "center",
	}
	  
	const cryptoinnercontainer = {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "right" as "right",
	  
	}
	  
	const mypricecontainer = {
		display: "grid",
		gridTemplateColumns: "repeat(2, 1fr)",
		textAlign: "center" as "center",
	}
	  
	const inputdefault = {
		width: "200px"
	}


	// can we add a feature for quick search?
	// there is too much data/information the is being loaded at once, this cause rendering to load slow. We will have to go back on and revisit for a better approach.

	return (
		<>
			{crypto.map((val) => {
				if (
					val["askPrice"] !== "0.00000000" &&
					val["bidPrice"] !== "0.00000000"
				) {
					return (
						<div style={maincontainer}>
							<h3 style={cryptoname}>{val["symbol"]}</h3>
							<div style={mypricecontainer}>
								<p id={"ask" + val["symbol"]} />
								<p id={"bid" + val["symbol"]} />
							</div>
							<div style={cryptoinnercontainer}>
								<p>Asking Price : {val["askPrice"]}</p>
								<input
									style={inputdefault}
									className={"askprice" + val["symbol"]}
									type="number"
									data-askprice={val["askPrice"]}
									placeholder="Estimate My Asking Price"
									onChange={updateprice}
									data-symbol={val["symbol"]}
								/>
								<p>Bid Price : {val["bidPrice"]}</p>
								<input
									style={inputdefault}
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
