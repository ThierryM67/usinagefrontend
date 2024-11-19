"use client"
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function Contact() {

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    let [contact, setContact] = useState({ name: '', company: '', Phone: '', email: '',message: ''})

    let [success, setSuccess] = useState(false)

    const sendContact = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${backend_url}/thierry/contact-create/`, contact);
      
            console.log(`Successful submission ${response.status}`)

            setSuccess(true)

            window.location.reload()
      
          } catch (error) {
            console.error('Error sending contact:', error);
          }
    }
    
    return (
      <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',  
        }}
        >
            <div style={{textAlign: 'center', marginTop:'60px', width:'65%'}}>
                <h1 className="font-bolder text-3xl text-blue-500">Contact Us</h1>
                <p>We will respond to you as soon as possible</p>
                { success?
                    <h1 className="font-bolder text-3xl text-blue-500">Your message has been sent</h1>
                    :
                    <p></p>
                }
                <div className="bg-gray-100 py-10 mt-10 border-2 rounded-2xl">
                    <form onSubmit={sendContact}
                        className="mx-4 my-4 p-4 rounded-2xl shadow w-3/4 mx-auto sm:w-1/2 border-red-200 border-2"
                    > 
                        <input
                            placeholder="Please enter name"
                            value={contact.name}
                            onChange={(e) => setContact({ ...contact, name: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            placeholder="Please enter company: Company Inc"
                            value={contact.company}
                            onChange={(e) => setContact({ ...contact, company: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            placeholder="Please enter email: johndoe1@yahoo.com"
                            value={contact.email}
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            placeholder="Please enter phone number"
                            value={contact.Phone}
                            onChange={(e) => setContact({ ...contact, Phone: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <textarea
                            placeholder="Leave a message for us"
                            value={contact.message}
                            onChange={(e) => setContact({ ...contact, message: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded h-20"
                        />
                        <button type="submit" className="w-full p-2 text-black bg-red-500 rounded hover:bg-red-700">
                        <p >Send</p>
                        </button>
                    </form>
                </div>
                <h1 className="font-bolder text-3xl ">Follow us on social networks</h1>
                <div className="flex justify-content-center">
                    <a href="#"><FaSquareFacebook size={42}/></a>
                    
                    <a href="#"><FaInstagramSquare size={42}/></a>
                </div>
            </div>
        </div>
    );
  }