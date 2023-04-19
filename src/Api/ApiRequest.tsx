import React, { Component } from 'react'

export async function api() {
    let url = "https://data.binance.com/api/v3/ticker/24hr"
    let response = await fetch(url).then(
        res => res.json()
    ).then(json => (json))

    return response;
}