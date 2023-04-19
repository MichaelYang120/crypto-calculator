import React, { Component } from 'react'
import { api } from '../Api/ApiRequest'

export default function Main() {
    console.log(api())
    return (
        <div className='maincontainer'>
            <form className='findtickerform'>
                <input type="text" placeholder='enter your crypto ticker' />
            </form>
        </div>
    )

}
