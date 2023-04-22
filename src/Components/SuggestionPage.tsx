import React, { ChangeEvent, Component, useEffect, useState } from 'react'
import { api } from '../Api/ApiRequest'
import { render } from '@testing-library/react';

const debug = true;

export default function Main() {
    const [crypto, setCrypto] = useState([]);
    const [indexSymbolvalue, setIndexSymbolvalue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    interface SArray {
        ticker: string
    }

    function showfindticker() {
        var autocompletesuggestions = "";
        const findticker = (event: ChangeEvent<HTMLInputElement>) => {
            var inputvalue = event.target.value;
            var uppercasevalue = inputvalue.toUpperCase();
            if (debug === true) {
                // console.log(inputvalue)
                // console.log(uppercasevalue)
                // console.log(inputvalue[0])


            }

            if (indexSymbolvalue === "" && uppercasevalue.length > 0) {
                setIndexSymbolvalue(uppercasevalue)
            } else {
                setIndexSymbolvalue(uppercasevalue)
                // console.log(uppercasevalue)
                crypto.map(val => {
                    var test: any = val["symbol"]
                    // used startswith to find same value of crypto symbol
                    // setSuggestions(test)
                    // showsugestions(test)

                    if (test.startsWith(indexSymbolvalue)) {
                        // test = Array(test)
                        // console.log(indexSymbolvalue)
                        setSuggestions(test)
                        // console.log(test)
                        var autocompletesuggestions = test
                        // console.log(typeof(test))
                        // showsugestions(autocompletesuggestions)
                        // render ({
                        //     test
                        // })
                    }
                })
            }

        }
        return (
            <div className='maincontainer'>
                <form className='findtickerform'>
                    <input type="text" onChange={findticker} placeholder='enter your crypto ticker'/>
                </form>
            </div>
        )
    

        // return (
        //     <div className='maincontainer'>
        //         <form className='findtickerform'>
        //             <input type="text" onChange={findticker} placeholder='enter your crypto ticker' />
        //         </form>
        //     </div>
        // )
    }

    // function showsugestions(autocompletesuggestions:SArray) {
    //     if (autocompletesuggestions) {
    //         console.log("here")
    //         render (
    //             <>
    //                 <li>
    //                     {autocompletesuggestions.ticker}
    //                 </li>
    //             </>
                
    //         )
    //     }

    // }




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

// trying to get suggestions to show, and render