"use client"
import ClientFAQ from "@/components/clientFAQ";
import ManFAQ from "@/components/manFAQ";
import Link from "next/link";
import { useState } from "react";

export default function FAQs() {

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
                <h1 className="font-bolder text-3xl text-blue-500 mb-12">Frequently Asked Questions</h1>
                <div className="grid grid-cols-2 mx-20">
                    <div onClick={SwitchStatus}>
                        <p className={`text-${clientColor}-500`} >You are a customer</p>
                    </div>
                    <div className="border-l-2 border-black" onClick={SwitchStatus}>
                        <p className={`text-${manufColor}-500`}>You are a Machine operator</p>
                    </div>
                </div>
                <div className="bg-gray-100 w-3/4 mx-auto py-10 mt-10 border-2 rounded-2xl px-12">

                    {
                        client? <div><ClientFAQ /></div> : <div><ManFAQ /></div> 
                    }

                </div>

                <h1 className="font-bolder text-xl mt-16 mb-2">Do you still have questions?</h1>
                <button className="bg-red-600 hover:bg-red-700 mb-16 w-1/2 mx-auto rounded-lg py-2">
                    <Link href='/contact'>Contact Us</Link>
                </button>
            </div>
        </div>
    );
  }
