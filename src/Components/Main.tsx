import React, { useEffect, useState, ChangeEvent } from 'react'
import { api } from '../Api/ApiRequest'

// const debug = true;
const debug = false;

export default function Main() {
    const [crypto, setCrypto] = useState([]);

    const updateprice = (event:ChangeEvent<HTMLInputElement>) => {
        var target = event.target;
        var targetclass = target.getAttribute("class")
        var targetval = target.value
        var datasymbol = target.getAttribute("data-symbol")
        
        function calculateprice (price:any) {
            var newbidprice = Number(targetval) * Number(price)
            var bidpriceset = newbidprice.toString()
            return bidpriceset
        }
        function updatetext (priceset:string, pricetype:string) {
            var getclassname = document.getElementById(`${pricetype}${datasymbol}`)
            console.log(getclassname)
            if (getclassname !== null) {
                getclassname.innerText = `My ${pricetype} price would be: ` + priceset;
            } else {
                console.log("getclassname is null");
                alert("We are having technical difficulty please try again later.")
            }
            if (debug === true) {

                console.log(getclassname);
            }
 
        }
        if(targetclass?.includes("bidprice")) {
            var databidprice = target.getAttribute("data-bidprice")
            var bidpriceset = calculateprice(databidprice)
            updatetext(bidpriceset, "bid")
        }
        if(targetclass?.includes("askprice")) {
            var dataaskprice = target.getAttribute("data-askprice")
            var askpriceset = calculateprice(dataaskprice)
            updatetext(askpriceset, "ask")
 
        }
    }

    useEffect(() => {
        async function getcrypto() {
            var result: any = await api()
            setCrypto(result)
        }
        getcrypto()
        if (debug === true) {
            console.log(crypto)
        }


    }, [])

    return (
        <>
            {
                crypto.map(val => {
                    if (val["askPrice"] !== "0.00000000" && val["bidPrice"] !== "0.00000000") {
                        return (
                            <>
                                <div className="cryptocontainer">
                                    <h3 className='cryptoname'>{val["symbol"]}</h3>
                                    <div className='cryptoinnercontainer'>
                                        <div>
                                            <p>Asking Price : {val["askPrice"]}</p>
                                            <input className={"askprice" + val["symbol"]} type='number' data-askprice={val["askPrice"]} placeholder='Estimate My Asking Price' onChange={updateprice} data-symbol={val["symbol"]} />
                                            <p id={"ask" + val["symbol"]}/>
                                            <p>Bid Price : {val["bidPrice"]}</p>
                                            <input className={"bidprice" + val["symbol"]} placeholder='Estimate My Bid Price' data-bidprice={val["bidPrice"]} type='number' onChange={updateprice} data-symbol={val["symbol"]}/>
                                            <p id={"bid" + val["symbol"]} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                })
            }
        </>
    )

}