"use client"

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PasswordReset() {

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    const router = useRouter()

    const [email, setEmail] = useState('');

    const [error, setError] = useState(false);

    const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let resetRequest = await axios.post(
            `${backend_url}/manufacturer/password-reset/`, {"email": email}
        )
        
        let response = resetRequest.data
        
        response.message ? router.push('/PasswordReset/ResetDone') : setError(true)
        
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
                <h1 className="font-bolder text-3xl text-blue-500 mb-12">Reset Password</h1>
                
                <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4">
                    <div >
                        <Image
                            src="/assets/usinagelogo.png"
                            alt="Mon Usinage"
                            width={200}  
                            height={200}
                            className='mx-auto mt-5'
                            /> 
                    </div>
                    <form onSubmit={resetPassword} className="mx-4 my-4 p-4 rounded shadow"> 
                        <input
                            placeholder="Please enter email"
                            value={email}
                            onChange={(e) => setEmail( e.target.value )}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <button type="submit" className="w-full p-2 text-black bg-red-500 rounded hover:bg-red-700">
                            <p >Reset Password</p>
                        </button>
                    </form>
                    { error && (
                        <p className='text-red-600'><strong>Kindly enter correct email</strong></p>
                    )}
                </div>
            </div>
        </div>
    );
}