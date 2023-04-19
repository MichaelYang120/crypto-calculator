import React, { Component } from 'react'
import { api } from '../Api/ApiRequest'

export default function Main() {
    console.log(api())
    return (
        <div>This is the main container</div>
    )

}
