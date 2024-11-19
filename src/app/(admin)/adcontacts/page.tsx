"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type Contact = {
    id: number,
    name: string,
    email: string,
    company: string,
    message: string,
    Phone: string,
}

export default function Adcontacts() {

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    let [ contacts, setContacts ] = useState<Contact[]>()

    useEffect(() => {
        GetContacts()
    },[])

    const GetContacts = async () => {
        const response = await axios.get(`${backend_url}/thierry/contact-list/`)

        let contactResponse = response.data

        setContacts(contactResponse)
    }
    if(contacts){
        return(
            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom:'200px',
            }}
            >
                <div style={{textAlign: 'center', marginTop:'60px'}} className="border-2 rounded-2xl p-4">
                    <h1 className="font-bolder text-3xl text-blue-500 mb-12">Messages for Mon Usinage</h1>
                    <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-3">
                        {contacts.map( (contact: Contact) => (
                            <div className="bg-gray-100 shadow-lg rounded-lg" key={contact.id}>
                                <div className="p-4">
                                    <div className="flex justify-between">
                                        <p className="text-start pr-4">Name: {contact.name}</p>
                                        <p className="text-end">Company: {contact.company}</p>
                                    </div>
                                    <div className="flex justify-between pb-4">
                                        <p className="text-start pr-4">Email: {contact.email}</p>
                                        <p className="text-end">Phone: {contact.Phone}</p>
                                    </div>
                                    <p className="text-center px-2 pb-6 text-gray-500">{contact.message}...</p>
                                </div>
                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>
        )
    }
}