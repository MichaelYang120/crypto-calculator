import React, { useEffect, useState } from 'react'
import { api } from '../Api/ApiRequest'

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);


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
                crypto.map(({ symbol, bidPrice, askPrice }) =>
                    <div className="cryptocontainer">
                        <h2 className='cryptoname'>{symbol}</h2>
                            <div className='cryptoinnercontainer'>
                                <div>
                                    <p>Asking Price : {askPrice}</p>
                                </div>
                                <div>
                                    <p>Bid Price : {bidPrice}</p>
                                </div>
                            </div>
                    </div>
                )
            }
        </>
    )

}