
"use client";
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
//import { getMyVariable, setMyVariable } from '@/components/Auth';

export default function ManufacturerLogin() {

  const [manufacturer, setManufacturer] = React.useState({ email: '', password1: ''});

  const router = useRouter();

  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'


  // Login manufacturer
  const loginManufacturer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backend_url}/manufacturer/manufacturer-login/`, manufacturer);

      console.log(`Successful login ${response.status}`)

      console.log(response.data.jwt)

      document.cookie = `jwt=${response.data.jwt}; Path=/;`

      localStorage.setItem('jwt', response.data.jwt)

      const manufacturerResponse = await axios.get(`${backend_url}/manufacturer/manufacturer-detail/`, {
        headers: {
          Authorization: `${response.data.jwt}`,
        },
      })

      router.push(`/manufacturer/${manufacturerResponse.data.id}`)

    } catch (error) {
      console.error('Error logging in manufacturer:', error);
    }
  };


  return (
    <div
      style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',  
      }}
      >
      <div style={{textAlign: 'center', marginTop:'60px'}}>
        <h1 className="font-bolder text-3xl text-blue-500 mb-12">Login</h1>
        
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
          <form onSubmit={loginManufacturer} className="mx-4 my-4 p-4 rounded shadow"> 
            <input
                placeholder="Please enter email"
                value={manufacturer.email}
                onChange={(e) => setManufacturer({ ...manufacturer, email: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <input
                placeholder="Please enter password"
                type='password'
                value={manufacturer.password1}
                onChange={(e) => setManufacturer({ ...manufacturer, password1: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <label className="flex items-center space-x-2 py-6">
              <input type="radio" name="option" value="option1" className="text-blue-500 focus:ring-2 focus:ring-blue-400"/>
              <span className='pr-6'>Remember me</span>
              <Link href="/PasswordReset">Forgot password?</Link>
            </label>
            <button type="submit" className="w-full p-2 text-black bg-red-500 rounded hover:bg-red-700">
              <p >Login</p>
            </button>
          </form>
          <div className="mx-4 my-4  p-4 rounded">
            <p className='py-2'>New to my machining?</p>

            <p>I am a:</p>

            <div className='flex items-center space-x-2 '>
              <button className="w-full border-2 border-red-500 p-2 text-red-500  rounded hover:bg-red-600">
                <Link href="/client-register">Client</Link>
              </button>
              <button className="w-full border-2 border-red-500 p-2 text-red-500 rounded hover:bg-red-600">
                <Link href="/man-register">Manufacturer</Link>
              </button>
            </div>

            <button className="mt-8 mb-2 w-full p-2 border-2 border-red-500 text-black rounded hover:bg-red-600">
              <Link href="/client-login">Login as a client</Link>
            </button>
               
           </div>
        </div>
      </div>
    </div>
  );
}
