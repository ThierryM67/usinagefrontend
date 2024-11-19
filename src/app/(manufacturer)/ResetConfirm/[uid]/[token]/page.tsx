"use client"

import axios from 'axios';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

export default function ResetConfirm() {

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    const params = useParams<{uid:string, token:string}>()

    const router = useRouter()

    const [reset, setReset] = useState({"uid":0, "token":"", "new_password":""});
    const [error, setError] = useState(false);

    const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let resetRequest = await axios.post(
            `${backend_url}/manufacturer/password-reset-confirm/${params.uid}/${params.token}/`,
            {
                "uid":parseInt(params.uid),
                "token": reset.token,
                "new_password":reset.new_password
            }
        )

        let response = resetRequest.data.detail
        
        response === 'Password has been reset.' ? router.push('/man-login') : setError(true)
        
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
                <h1 className="font-bolder text-3xl text-blue-500 mb-12">Password Reset Confirm</h1>
                
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
                        placeholder="Please enter new password"
                        type='password'
                        value={reset.new_password}
                        onChange={
                            (e) => {
                                setReset({ ...reset, new_password: e.target.value, 
                                    uid: parseInt(params.uid), token:params.token
                                })
                            }
                        }
                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                    />
                        <button type="submit" className="w-full p-2 text-black bg-red-500 rounded hover:bg-red-700">
                            <p > Confirm Password Reset </p>
                        </button>
                    </form>
                    { error && (
                        <p className='text-red-600'><strong>Kindly retry an error occured</strong></p>
                    )}
                </div>
            </div>
        </div>
    );
}