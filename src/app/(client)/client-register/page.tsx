
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ClientRegister() {

  const [newClient, setNewClient] = React.useState(
    { 
    first_name: '', last_name: '',profile_name:'', email: '',password1: '',
    password2:'', password:'', postalCode:'', city:'', address:''
  });

  const router = useRouter();

  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'

  const [profilepic, setProfilepic] = React.useState<File>();

  let [errorP, setErrorP] = useState(false);

  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('image change')

    setProfilepic(e.target.files?.[0])

    if (file && file instanceof Blob) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };


  // Register client
  const registerClient = async () => {

    const formData = new FormData();
    if(newClient.password1 !== newClient.password2){ setErrorP(true); }
    else{
      if (newClient) {
        formData.set('first_name', newClient.first_name);
        formData.set('last_name', newClient.last_name);
        formData.set('profile_name', newClient.profile_name);
        formData.set('email', newClient.email);
        formData.set('password', newClient.password);
        formData.set('password1', newClient.password1);
        formData.set('password2', newClient.password2);
        formData.set('postalCode', newClient.postalCode);
        formData.set('city', newClient.city);
        formData.set('address', newClient.address);
      }


      if (profilepic){
        formData.set('profile_pic', profilepic); 
      } else {
        let defaultPicUrl = "/assets/defaultprofpic.jpg"
        const response = await fetch(defaultPicUrl);
        const blob = await response.blob();
        const defaultPic = new File([blob], 'defaultProfilePic.jpg', { type: 'image/jpeg' });
        formData.set('profile_pic', defaultPic); 
      }

      try {
        const response = await axios.post(`${backend_url}/client/client-register/`, formData);

        console.log(`Successful registration ${response.status}`)

        router.push('/client-login')

      } catch (error) {
        console.error('Error registering in client:', error);
      }
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
        <h1 className="font-bolder text-3xl text-blue-500 mb-4">
          Create your client account
        </h1>
        <p className='mb-12'> 
          Are you registering as a manufacturer? <Link href="/man-register">Click here..</Link>
        </p>
        
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
          <h1 className="font-bolder text-3xl text-red-500 my-4">
            Please provide the information below
          </h1>
          {selectedImage && (
            <div className="mt-4 mx-auto">
              <p className="text-gray-500 mb-2">Image Preview:</p>
              <img
                src={selectedImage}
                alt="Selected preview"
                className=" mx-auto w-32 h-32 object-cover border rounded"
              />
            </div>
          )}
          <form className="w-3/4 mx-auto my-4 p-4 rounded "> 
            <p className='py-2'>Upload profile picture</p>
            <input
              type="file"
              name="profilepic"
              onChange={(e) => handleImageChange(e) }
              className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>First name*</p>
            <input
                placeholder="Please enter first name"
                required
                value={newClient.first_name}
                onChange={(e) => setNewClient({ ...newClient, first_name: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Last name*</p>
            <input
                placeholder="Please enter last name"
                required
                value={newClient.last_name}
                onChange={(e) => setNewClient({ ...newClient, last_name: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Username*</p>
            <input
                placeholder="Please enter user name"
                value={newClient.profile_name}
                onChange={(e) => setNewClient({ ...newClient, profile_name: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>email*</p>
            <input
                placeholder="Please enter email"
                required
                type='email'
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            { errorP && (
                <p className='text-red-600'><strong>Password and confirm password must be same</strong></p>
            )}

            <p className='pt-4 pb-2'>password*</p>
            <input
                placeholder="Please enter password"
                required
                type='password'
                value={newClient.password1}
                onChange={(e) => setNewClient({ ...newClient, password1: e.target.value, password: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>confirm password*</p>
            <input
                placeholder="Please confirm password"
                required
                type='password'
                value={newClient.password2}
                onChange={(e) => setNewClient({ ...newClient, password2: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
          </form>
        </div>

        <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4 mt-20">
          <h1 className="font-bolder text-3xl text-red-500 my-4">
            Contact information
          </h1>
          <form className="w-3/4 mx-auto my-4 p-4 rounded "> 

            <p className='py-2'>Postal code*</p>
            <input
                placeholder="67500"
                required
                value={newClient.postalCode}
                onChange={(e) => setNewClient({ ...newClient, postalCode: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>City*</p>
            <input
                placeholder="Lyon"
                required
                value={newClient.city}
                onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Address*</p>
            <input
                style={{ height:'100px'}}
                placeholder="Type in your full address"
                value={newClient.address}
                onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
          </form>
        </div>

        <form className='w-1/2 mx-auto mt-20 mb-4'>
          <input type="checkbox" id="checkboxRadio" className="styled-radio"/>
          <Link href='/conditions' className='pl-4'>I have read and accepted the general conditions of use of my account</Link>
        </form>

        <button type="submit" onClick={registerClient} className="w-1/2 p-2 text-white bg-red-500 rounded hover:bg-red-700 mb-4">
          <p>Register</p>
        </button>

        <div className="rounded-xl w-3/4 mx-auto my-4 p-4 bg-gray-100 rounded shadow mb-32">
          <p>Already have an account?</p>
          <button className="mb-2 border-2 border-red-500 w-full p-2 text-red rounded hover:bg-red-600">
              <Link href="/client-login">Login as an client</Link>
          </button>

          <button className="rounded-xl mt-2 border-2 border-red-500 w-full p-2 text-red bg-rounded hover:bg-red-600">
              <Link href="/man-login">Login as a manufacturer</Link>
          </button>
        </div>
      </div>
      
    </div>
  );
}
