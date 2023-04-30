import React, { useEffect, useState, ChangeEvent } from 'react'
import { api } from '../Api/ApiRequest'

const debug = true;

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
        if(targetclass?.includes("bidprice")) {
            var databidprice = target.getAttribute("data-bidprice")
            var bidpriceset = calculateprice(databidprice)
            var getclassname = document.getElementById(`bid${datasymbol}`)
            console.log(getclassname)
            if (getclassname !== null) {
                getclassname.innerText = "My bidprice would be: " + bidpriceset;
            } else {
                console.log("getclassname is null");
                alert("We are having technical difficulty please try again later.")
            }
            if (debug === true) {

                console.log(getclassname);
            }

        }
        console.log(targetclass)
        if(targetclass?.includes("askprice")) {
            console.log("hit")
            var dataaskingprice = target.getAttribute("data-askprice")
            var askingpriceset = calculateprice(dataaskingprice)
            var getclassname = document.getElementById(`ask${datasymbol}`)
            if (debug === true) {

                console.log(getclassname);
            }
            if (getclassname !== null) {
                getclassname.innerText = "My asking price would be: " + askingpriceset;
            } else {
                console.log("getclassname is null");
                alert("We are having technical difficulty please try again later.")
            }
 
        }
    }

    // question: can we abstract these function, they look the same?

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