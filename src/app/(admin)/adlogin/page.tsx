
"use client";
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLogin() {

  const [admin, setAdmin] = React.useState({ email: '', password1: ''});

  const router = useRouter();

  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'


  // Login admin
  const loginAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backend_url}/thierry/thierry-login/`, admin);

      console.log(`Successful login ${response.status}`)

      console.log(response.data.jwt)

      localStorage.setItem('jwt', response.data.jwt)

      document.cookie = `jwt=${response.data.jwt}; Path=/;`

      router.push(`/adnews`)

    } catch (error) {
      console.error('Error logging in admin:', error);
    }
  };


  return (
    <div
      style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:'200px',
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
          <h1 className="font-bolder text-xl text-blue-500 my-4">Welcome Thierry!</h1>
          <form onSubmit={loginAdmin} className="mx-4 my-4 p-4 rounded shadow"> 
            <input
                placeholder="Please enter email"
                value={admin.email}
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <input
                placeholder="Please enter password"
                type='password'
                value={admin.password1}
                onChange={(e) => setAdmin({ ...admin, password1: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <label className="flex items-center space-x-2 py-6">
              <input type="radio" name="option" value="option1" className="text-blue-500 focus:ring-2 focus:ring-blue-400"/>
              <span className='pr-6'>Remember me</span>
              <Link href="/adpwordreset">Forgot password?</Link>
            </label>
            <button type="submit" className="w-full p-2 text-black bg-red-500 rounded hover:bg-red-700">
              <p >Login</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
