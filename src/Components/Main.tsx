import React, { ChangeEvent, Component, useEffect, useState } from 'react'
import { api } from '../Api/ApiRequest'

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);
    const [indexSymbolvalue, setIndexSymbolvalue] = useState("");
    const [sugestions, setSugestions] = useState("");

    function showfindticker() {
        const findticker = (event: ChangeEvent<HTMLInputElement>) => {
            var inputvalue = event.target.value;
            var uppercasevalue = inputvalue.toUpperCase();
            if (debug === true) {
                // console.log(inputvalue)
                // console.log(uppercasevalue)
                // console.log(inputvalue[0])


            }

            if(indexSymbolvalue === "" && uppercasevalue.length > 0) {
                setIndexSymbolvalue(uppercasevalue)
            } else {
                console.log(indexSymbolvalue)
                crypto.map(val => {
                    var test: any = val["symbol"]
                    // used startswith to find same value of crypto symbol
                    if(test.startsWith(indexSymbolvalue)) {
                        test = Array(test)
                        setSugestions(test)
                        // console.log(test)
                    }
                    setIndexSymbolvalue(uppercasevalue)
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

    function showsugestions () {

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
