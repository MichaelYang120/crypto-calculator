import React, { ChangeEvent, Component, useEffect, useState } from 'react'
import { api } from '../Api/ApiRequest'

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);
    const [indexSymbol, setIndexSymbol] = useState(0);
    const [indexSymbolvalue, setIndexSymbolvalue] = useState("");

    function showfindticker() {
        const findticker = (event: ChangeEvent<HTMLInputElement>) => {
            var inputvalue = event.target.value;
            var uppercasevalue = inputvalue.toUpperCase();
            if (debug === true) {
                // console.log(inputvalue)
                // console.log(uppercasevalue)
                // console.log(inputvalue[0])


            }

            if (inputvalue.length > 0) {
                interface val {
                    "symbol": string
                }
                crypto.map(val => {
                    var test: any = val["symbol"]
                    
                    // we are checking if the indexsymbolvalue is set to default = empty string
                    if(indexSymbolvalue === "") {
                        // we are setting the indexsymbolvalue
                        setIndexSymbolvalue(test[indexSymbol])
                        setIndexSymbol(indexSymbol + 1)
                    } else {
                        if (uppercasevalue[indexSymbol] === test[indexSymbol]) {

                            console.log(indexSymbolvalue + "value")
                            if(indexSymbolvalue[indexSymbolvalue.length] === test[indexSymbol]) {
                                console.log(test)
                                console.log(indexSymbolvalue)
                                setIndexSymbolvalue(indexSymbolvalue + test[indexSymbol])

                            }
                        }
                    }
                })
                // console.log("yes")
                // console.log(indexSymbol)
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
