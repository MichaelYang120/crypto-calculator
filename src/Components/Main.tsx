import React, { useEffect, useState } from 'react'
import { api } from '../Api/ApiRequest'
import { render } from '@testing-library/react';

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);

    function showfindticker() {
        // console.log(crypto)
        return (
            crypto.map(val => {
                var symbol: any = val["symbol"]
                // var askPrice: any = val["askPrice"]
                {{<>
                    <div>{symbol}</div>
                </>}}
                
            })

        )
    }

    useEffect(() => {
        async function getcrypto() {
            var result: any = await api()
            setCrypto(result)
        }
        getcrypto()
        if (debug === true) {
            // console.log(crypto)
        }


    }, [])

    return (
        <>
            {showfindticker()}
        </>
    )

}