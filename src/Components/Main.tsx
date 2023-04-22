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
            // console.log(crypto)
        }


    }, [])

    return (
        <>
            {
                crypto.map(({ symbol }) =>
                    <div className="cryptocontainer">
                        <div className='cryptoinnercontainer'>
                            <h2 className='cryptoname'>{symbol}</h2>
                            <div className='buttoncontainer'>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )

}