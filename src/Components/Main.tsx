import React, { useEffect, useState, ChangeEvent } from 'react'
import { api } from '../Api/ApiRequest'

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);

    const askingprice = (event: ChangeEvent<HTMLInputElement>) => {
        if(debug === true) {
            
            console.log(event.target.value)
        }
        var myaskingprice = event.target.value
        var dataaskingprice = event.target.getAttribute("data-askingprice")
        // this is where we are calculating the askingprice
        var newaskingprice = Number(myaskingprice) * Number(dataaskingprice)
        var askingpriceset = newaskingprice.toString()
        // event.target.setAttribute("mynewaskprice", askingpriceset)
        var targetclass = event.target.getAttribute("class")
        if(targetclass !== null) {
            var stgtargetclass = targetclass?.toString()

            if(debug === true) {
    
                console.log(stgtargetclass)
            }
            var getclassname = document.getElementById(`${stgtargetclass}`)
            if (getclassname !== null) {
                getclassname.innerText = "My asking price would be: " + askingpriceset;
            } else {
                console.log("getclassname is null");
                alert("We are having technical difficulty please try again later.")
            }
            if(debug === true) {
    
                console.log(getclassname);
            }
        }

    }

    const bidprice = (event: ChangeEvent<HTMLInputElement>) => {
        if (debug === true) {
            console.log(event.target.value)
        }
        var mybidprice = event.target.value
        var databidprice = event.target.getAttribute("data-bidprice")
        var datasymbol = event.target.getAttribute("data-symbol")
        // this is where we are calculating the bidprice
        var newbidprice = Number(mybidprice) * Number(databidprice)
        var bidpriceset = newbidprice.toString()
        var targetclass = event.target.getAttribute("class")
        if (targetclass !== null) {
            var stgtargetclass = targetclass?.toString()

            if (debug === true) {

                console.log(stgtargetclass)
            }
            var getclassname = document.getElementById(`bid${datasymbol}`)
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
                                            <input className={val["symbol"]} type='number' data-askingprice={val["askPrice"]} placeholder='Estimate My Asking Price' onChange={askingprice} />
                                            <p className={"input" + val["symbol"] + "show"} id={val["symbol"]}/>
                                            <p>Bid Price : {val["bidPrice"]}</p>
                                            <input className={"bidprice" + val["symbol"]} placeholder='Estimate My Bid Price' data-bidprice={val["bidPrice"]} type='number' onChange={bidprice} data-symbol={val["symbol"]}/>
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