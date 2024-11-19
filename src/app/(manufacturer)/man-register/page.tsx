
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ManufacturerRegister() {

  const [newManufacturer, setNewManufacturer] = React.useState(
    { 
    first_name: '', last_name: '',profile_name:'', email: '',password: '',password1: '',
    password2:'', company:'', idNumber:'', postalCode:'', city:'', address:''
  });

  const router = useRouter();

  let [errorP, setErrorP] = useState(false);

  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'

  const [profilepic, setProfilepic] = React.useState<File>();

  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setProfilepic(e.target.files?.[0])

    if (file && file instanceof Blob) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };


  // Register agent
  const registerManufacturer = async () => {

    const formData = new FormData();
    if(newManufacturer.password1 !== newManufacturer.password2){ setErrorP(true); }
    else{

      if (newManufacturer) {
        formData.set('first_name', newManufacturer.first_name);
        formData.set('last_name', newManufacturer.last_name);
        formData.set('profile_name', newManufacturer.profile_name);
        formData.set('email', newManufacturer.email);
        formData.set('password', newManufacturer.password);
        formData.set('password1', newManufacturer.password1);
        formData.set('password2', newManufacturer.password2);
        formData.set('company', newManufacturer.company);
        formData.set('IdNumber', newManufacturer.idNumber);
        formData.set('postalCode', newManufacturer.postalCode);
        formData.set('city', newManufacturer.city);
        formData.set('address', newManufacturer.address);
        
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
        const response = await axios.post(`${backend_url}/manufacturer/manufacturer-register/`, formData);

        console.log(`Successful registration ${response.status}`)

        router.push('/man-login')

      } catch (error) {
        console.error('Error registering in manufacturer:', error);
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
          Create your manufacturer account
        </h1>
        <p className='mb-12'> 
          Are you registering as a client? <Link href="/client-register">Click here..</Link>
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
            { errorP && (
                <p className='text-red-600'><strong>Password and confirm password must be same</strong></p>
            )}
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
                value={newManufacturer.first_name}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, first_name: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Last name*</p>
            <input
                placeholder="Please enter last name"
                required
                value={newManufacturer.last_name}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, last_name: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Username*</p>
            <input
                placeholder="Please enter user name"
                value={newManufacturer.profile_name}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, profile_name: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>email*</p>
            <input
                placeholder="Please enter email"
                required
                type='email'
                value={newManufacturer.email}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, email: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>password*</p>
            <input
                placeholder="Please enter password"
                required
                type='password'
                value={newManufacturer.password1}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, password1: e.target.value, password: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>confirm password*</p>
            <input
                placeholder="Please confirm password"
                required
                type='password'
                value={newManufacturer.password2}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, password2: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Name of your company</p>
            <input
                placeholder="Company name"
                value={newManufacturer.company}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, company: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Indentification number - SIREN*</p>
            <input
                placeholder="362 521 879"
                required
                value={newManufacturer.idNumber}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, idNumber: e.target.value })}
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
                value={newManufacturer.postalCode}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, postalCode: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>City*</p>
            <input
                placeholder="Lyon"
                required
                value={newManufacturer.city}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, city: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Address*</p>
            <input
                style={{ height:'100px'}}
                placeholder="Type in your full address"
                value={newManufacturer.address}
                onChange={(e) => setNewManufacturer({ ...newManufacturer, address: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
          </form>
        </div>

        <form className='w-1/2 mx-auto mt-20 mb-4'>
          <input type="checkbox" id="checkboxRadio" className="styled-radio"/>
          <Link href='/conditions' className='pl-4'>I have read and accepted the general conditions of use of my account</Link>
        </form>


        <button type="submit" onClick={registerManufacturer} className="w-1/2 p-2 text-white bg-red-500 rounded hover:bg-red-700 mb-4">
          <p>Register</p>
        </button>

        <div className=" w-3/4 mx-auto my-4 p-4 bg-gray-100 rounded shadow mb-32">
          <p>Already have an account?</p>
          <button className="rounded-xl mb-2 border-2 border-red-500 w-full p-2 text-red rounded hover:bg-red-600">
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
