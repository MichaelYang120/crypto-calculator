import React, { useEffect, useState, ChangeEvent } from 'react'
import { api } from '../Api/ApiRequest'

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);

    const askingprice = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
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
                                            <input type='text' placeholder='Estimate My Asking Price' onChange={askingprice}/>
                                            <p></p>
                                            <p>Bid Price : {val["bidPrice"]}</p>
                                            <input placeholder='Estimate My Bid Price' />
                                            <p></p>
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