import React, { Component, useEffect, useState } from 'react'
import { api } from '../Api/ApiRequest'

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);

    function showfindticker () {

    }
    showfindticker()

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
        <div className='maincontainer'>
            <form className='findtickerform'>
                <input type="text" placeholder='enter your crypto ticker' />
            </form>
        </div>
    )

}
