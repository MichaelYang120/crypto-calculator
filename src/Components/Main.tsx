import React, { Component } from 'react'

export default function Main() {

    async function api () {
        let url = "https://data.binance.com/api/v3/ticker/24hr"
        let response = await fetch(url).then(
            res => res.json()
        ).then(json => (json))

        return response;
    }

    console.log(api())

    return (
        <div>This is the main container</div>
    )

}
