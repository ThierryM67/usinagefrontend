"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiUserSharedFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";

const Adminbar = ({}) => {
  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'

  let router = useRouter()
  
  const [nav, setNav] = useState(false);

  const requestSubmit = async () => {
    let token = localStorage.getItem('jwt')
    if(token){
      const clientResponse = await axios.get(`${backend_url}/client/client-detail/`, {
        headers: {
          Authorization: token,
        },
      })

      router.push(`/client/${clientResponse.data.id}/createreq`)
    }

    else{
      router.push('/client-login')
    }
  }

  const CorM = async () => {
    let token = localStorage.getItem('jwt')
    const clientResponse = await axios.get(`${backend_url}/client/client-detail/`, {
      headers: {
        Authorization: token,
      },
    })
    if(clientResponse){
      router.push(`/client/${clientResponse.data.id}/crequests`)
    }
    else {
      const manResponse = await axios.get(`${backend_url}/manufacturer/manufacturer-detail/`, {
        headers: {
          Authorization: token,
        },
      })
      if(manResponse){
        router.push(`/manufacturer/${manResponse.data.id}/Requests`)
      }
      else {
        router.push(`/client/client-login`)
      }
    }
  }

  const handleLogout = async () => {}

  return (
    <div className="flex justify-between items-center w-full h-25 px-4  nav">
      <div style={{display: 'flex'}}>
        <Image
          src="/assets/usinagelogo.png"
          alt="usinage"
          width={100}  
          height={100}
          className='mx-auto my-4'
        />
      </div>

      <ul className="hidden md:flex mx-auto">
        <li
          className="nav-links px-4 mt-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
        >
          <Link href='/adnews'>News</Link>
        </li>
        <li
          className="nav-links px-4 mt-2 ccursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
        >
          <Link href='/adfaqs'>FAQS</Link>
        </li>
        <li
          className="nav-links px-4 mt-2 ccursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
        >
          <Link href='/adcontacts' >Contacts</Link>
        </li>
      </ul>

      {/* <button onClick={handleLogout} className={'text-white py-2 px-4 rounded bg-red-400 hover:bg-red-700'}>
        Logout
      </button> */}

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center top-0 left-0 w-full h-screen md:hidden">
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='/adnews' onClick={() => setNav(!nav)}>News</Link>
          </li>
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='/adfaqs' onClick={() => setNav(!nav)}>FAQS</Link>
          </li>
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='/adcontacts' onClick={() => setNav(!nav)}>Contacts</Link>
          </li>
        </ul>
      )}

    </div>
  );
};

export default Adminbar;