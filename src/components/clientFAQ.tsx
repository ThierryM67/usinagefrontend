"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientFAQ(){
    type FAQ = { question: string, answer: string, tag: string, id: number, created: string}

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    let [ faqs, setFaqs ] = useState<FAQ[]>()

    useEffect(() => {
        GetFaqs()
    },[])

    const GetFaqs = async () => {
        const response = await axios.get(`${backend_url}/thierry/clientfaq-list`)

        let clientFaqs = response.data

        setFaqs(clientFaqs.reverse())
        console.log(clientFaqs)
    }

    if (faqs) {
        return (
            <div >
                {faqs.map( (faq: FAQ) => (
                    <div className="py-4" key={faq.id}>
                        <p className="pb-2"><strong>{faq.question}</strong></p>
                        <p>{faq.answer}</p>
                    </div>
                    
                )
                )}
            </div>
        )
    }

    else {
        return (
            <p>Loading...</p>
        )
    }
}