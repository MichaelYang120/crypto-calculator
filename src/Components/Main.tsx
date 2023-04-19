import React, { ChangeEvent, Component, useEffect, useState } from 'react'
import { api } from '../Api/ApiRequest'

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);

    function showfindticker () {
        const findticker = (event:ChangeEvent<HTMLInputElement>) => {
            var inputvalue = event.target.value
            console.log(inputvalue)

        }
        return (
            <div className='maincontainer'>
                <form className='findtickerform'>
                    <input type="text" onChange={findticker} placeholder='enter your crypto ticker' />
                </form>
            </div>
        )
    }

    useEffect(() => {
        async function getcrypto () {
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
