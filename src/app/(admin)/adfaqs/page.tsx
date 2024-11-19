"use client"
import ClientFAQ from "@/components/clientFAQ";
import ManFAQ from "@/components/manFAQ";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AdminFAQs() {

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'
    type FAQ = { question: string, answer: string, tag: string, id: number, created: string}

    let [newCfaq, setNewCFaq ] = useState({question:'', answer:'', tag:''})

    let [newMfaq, setNewMFaq ] = useState({question:'', answer:'', tag:''})

    let [client, setClient ] = useState(true)
    let [errorC, setErrorC ] = useState(false)
    let [errorM, setErrorM ] = useState(false)

    let [clientColor, setClientColor ] = useState('red')

    let [manufColor, setManufColor ] = useState('')

    let [ faqsC, setFaqsC ] = useState<FAQ[]>()
    let [ faqsM, setFaqsM ] = useState<FAQ[]>()

    useEffect(() => {
        GetCFaqs()
        GetMFaqs()
    },[])

    const GetCFaqs = async () => {
        const response = await axios.get(`${backend_url}/thierry/clientfaq-list`)

        let clientFaqs = response.data

        setFaqsC(clientFaqs.reverse())
        console.log(clientFaqs)
    }

    const GetMFaqs = async () => {
        const response = await axios.get(`${backend_url}/thierry/manfaq-list`)

        let manFaqs = response.data

        setFaqsM(manFaqs.reverse())
        console.log(manFaqs)
    }

    const SwitchStatus = () => {
        setClient(!client)
        console.log("clicked")
        clientColor == 'red' ? setClientColor('') : setClientColor('red')
        manufColor == '' ? setManufColor('red') : setManufColor('')
    }

    const AddClientFaq = async () => {
        try {

            const response = await axios.post(`${backend_url}/thierry/clientfaq-create/`, newCfaq)

            let clientResponse = response.data
            console.log(clientResponse)

        } catch(error){
            setErrorC(true)
            console.error("Error create client FAQ", error)
        }
    }

    const DeleteClientFaq = async (id:number) => {
        const response = await axios.delete(`${backend_url}/thierry/clientfaq-delete/${id}`)

        let clientResponse = response.data
        console.log(clientResponse)
    }

    const AddManFaq = async () => {
        try {

            const response = await axios.post(`${backend_url}/thierry/manfaq-create/`, newMfaq)

            let manResponse = response.data
            console.log(manResponse)
            
        } catch(error){
            setErrorM(true)
            console.error("Error create manufacturer FAQ", error)
        }
    }

    const DeleteManFaq = async (id:number) => {
        const response = await axios.delete(`${backend_url}/thierry/manfaq-delete/${id}`)

        let manResponse = response.data
        console.log(manResponse)
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
                        <p className={`text-${clientColor}-500`} >Client FAQS</p>
                    </div>
                    <div className="border-l-2 border-black" onClick={SwitchStatus}>
                        <p className={`text-${manufColor}-500`}>Manufacturing FAQS</p>
                    </div>
                </div>
                <div >

                    {
                        client?
                        <div>
                            <div className="bg-gray-100 w-[90%] mx-auto py-10 mt-10 border-2 rounded-2xl px-12 sm:w-3/4">
                                <h1 className="text-2xl text-blue-500 font-bolder">Create Client FAQ</h1>
                                <form className="w-3/4 mx-auto my-4 p-4 rounded" onSubmit={AddClientFaq}>
                                    { errorC && (
                                        <p className='text-red-600'><strong>Error creating new ClientFAQ</strong></p>
                                    )}

                                    <p className='pt-6 pb-2'>Question*</p>
                                    <input
                                        placeholder="Enter Client FAQ question..."
                                        required
                                        value={newCfaq.question}
                                        onChange={(e) => setNewCFaq({ ...newCfaq, question: e.target.value })}
                                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                                    />

                                    <p className='pt-6 pb-2'>tags</p>
                                    <input
                                        placeholder="Enter Client FAQ tags..."
                                        value={newCfaq.tag}
                                        onChange={(e) => setNewCFaq({ ...newCfaq, tag: e.target.value })}
                                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                                    />

                                    <p className='pt-6 pb-2'>answer*</p>
                                    <textarea
                                        placeholder="Enter Client FAQ answer"
                                        required
                                        value={newCfaq.answer}
                                        onChange={(e) => setNewCFaq({ ...newCfaq, answer: e.target.value })}
                                        className="mb-2 w-full p-2 border border-gray-300 rounded h-[150px]"
                                    />
                                    <button type="submit" className="mx-auto bg-red-500 rounded-xl px-12 py-2">Create ClientFAQ</button>
                                </form>
                            </div>
                            <div className="bg-gray-200 w-[90%] mx-auto py-10 mt-10 border-2 rounded-2xl px-12 sm:w-3/4">
                                <h1 className="text-2xl  text-blue-500">Current Client Faqs</h1>
                                { faqsC?
                                    faqsC.map((item) => (
                                        <div className="py-4 bg-white my-6 rounded-2xl" key={item.id}>
                                            <p className="pb-2"><strong>{item.question}</strong></p>
                                            <p className="px-4">{item.answer}</p>
                                            <div className="flex justify-between mt-6">
                                                <button onClick={()=>{DeleteClientFaq(item.id)}} className="mx-auto bg-red-500 rounded-xl px-12 py-2">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <h1 className="text-3xl mt-40 text-blue-500">Loading ClientFaqs</h1>
                                }
                            </div>
                        </div>
                        :
                        <div>
                            <div className="bg-gray-100 w-[90%] mx-auto py-10 mt-10 border-2 rounded-2xl px-12 sm:w-3/4">
                                <h1 className="text-2xl text-blue-500 font-bolder">Create Manufacturer FAQ</h1>
                                <form className="w-3/4 mx-auto my-4 p-4 rounded" onSubmit={AddManFaq}>
                                    { errorM && (
                                        <p className='text-red-600'><strong>Error creating new Manufacturer FAQ</strong></p>
                                    )}

                                    <p className='pt-6 pb-2'>Question*</p>
                                    <input
                                        placeholder="Enter Manufacturer FAQ question..."
                                        required
                                        value={newMfaq.question}
                                        onChange={(e) => setNewMFaq({ ...newMfaq, question: e.target.value })}
                                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                                    />

                                    <p className='pt-6 pb-2'>tags</p>
                                    <input
                                        placeholder="Enter Manufacturer FAQ tags..."
                                        value={newMfaq.tag}
                                        onChange={(e) => setNewMFaq({ ...newMfaq, tag: e.target.value })}
                                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                                    />

                                    <p className='pt-6 pb-2'>answer*</p>
                                    <textarea
                                        placeholder="Enter Manufacturer FAQ answer"
                                        required
                                        value={newMfaq.answer}
                                        onChange={(e) => setNewMFaq({ ...newMfaq, answer: e.target.value })}
                                        className="mb-2 w-full p-2 border border-gray-300 rounded h-[150px]"
                                    />
                                    <button type="submit" className="mx-auto bg-red-500 rounded-xl px-12 py-2">Create Manufacturer FAQ</button>
                                </form>
                            </div>
                            <div className="bg-gray-100 w-[90%] mx-auto py-10 mt-10 border-2 rounded-2xl px-12 sm:w-3/4">
                                <h1 className="text-2xl  text-blue-500">Current Manufacturer Faqs</h1>
                                { faqsM?
                                    faqsM.map((item) => (
                                        <div className="py-4 bg-white my-6 rounded-2xl" key={item.id}>
                                            <p className="pb-2"><strong>{item.question}</strong></p>
                                            <p className="px-4">{item.answer}</p>
                                            <div className="flex justify-between mt-6">
                                                <button onClick={()=>{DeleteManFaq(item.id)}} className="mx-auto bg-red-500 rounded-xl px-12 py-2">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <h1 className="text-3xl mt-40 text-blue-500">Loading Manufacturer</h1>
                                }
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
  }
