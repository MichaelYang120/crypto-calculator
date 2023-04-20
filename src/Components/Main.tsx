import React, { ChangeEvent, Component, useEffect, useState } from 'react'
import { api } from '../Api/ApiRequest'

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);


    
    function showfindticker () {
        const findticker = (event:ChangeEvent<HTMLInputElement>) => {
            var inputvalue = event.target.value;
            var uppercasevalue = inputvalue.toUpperCase();
            if (debug === true) {
                // console.log(inputvalue)
                // console.log(uppercasevalue)
                // console.log(inputvalue[0])
                
            }
            
            if(inputvalue.length > 0) {
                interface val {
                    "symbol": string
                }
                // console.log("yes")
                let cryptosymbol = crypto.map( val => {
                    // console.log(val["symbol"])
                    var test:any = val["symbol"]
                    let i = 0;

                    if(test[0] === uppercasevalue[0]) {
                        if(test[1] === uppercasevalue[1]) {
                            console.log(test)
                        }
                    }
                })

            }

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
