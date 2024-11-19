"use client"

import { useState } from "react";
import ClientHowItWorks from "@/components/clienthiw";
import ManufacturerHowItWorks from "@/components/manhiw";

export default function HowItWorks() {
    let [client, setClient ] = useState(true)

    let [clientColor, setClientColor ] = useState('red')

    let [manufColor, setManufColor ] = useState('')

    const SwitchStatus = () => {
        setClient(!client)
        console.log("clicked")
        clientColor == 'red' ? setClientColor('') : setClientColor('red')
        manufColor == '' ? setManufColor('red') : setManufColor('')
    }


    return (
      <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',  
        }}
        >
            <div style={{textAlign: 'center', marginTop:'60px'}}>
                <h1 className="font-bolder text-3xl text-blue-500 mb-12">How it works</h1>
                <div className="grid grid-cols-2 mx-20">
                    <div onClick={SwitchStatus}>
                        <p className={`text-${clientColor}-500`}>You are a customer</p>
                    </div>
                    <div className="border-l-2 border-black" onClick={SwitchStatus}>
                        <p className={`text-${manufColor}-500`}>You are a Machine operator</p>
                    </div>
                </div>
                {
                    client? <div><ClientHowItWorks /></div> : <div><ManufacturerHowItWorks /></div> 
                }
            </div>
        </div>
    );
  }