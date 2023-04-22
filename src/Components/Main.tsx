import React, { useEffect, useState, ChangeEvent, createElement } from 'react'
import { api } from '../Api/ApiRequest'
import { render } from '@testing-library/react';

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);
    const [askingpricevalue, setaskingpricevalue] = useState("");

    const askingprice = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        var myaskingprice = event.target.value
        var dataaskingprice = event.target.getAttribute("data-askingprice")
        var newaskingprice = Number(myaskingprice) * Number(dataaskingprice)
        var askingpriceset = newaskingprice.toString()
        // setaskingpricevalue(askingpriceset)
        event.target.setAttribute("mynewaskprice", askingpriceset)
        console.log(event.target.getAttribute("mynewaskprice"))

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
                                            <input className={"input" + val["symbol"]} type='number' data-askingprice={val["askPrice"]} placeholder='Estimate My Asking Price' onChange={askingprice}/>
                                            <p>Bid Price : {val["bidPrice"]}</p>
                                            <input placeholder='Estimate My Bid Price' />
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