"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiUserSharedFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = ({}) => {
  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'

  let router = useRouter()
  
  const [nav, setNav] = useState(false);
  const [client, setClient] = useState<boolean>();
  const [userId, setUserId] = useState<number>();

  useEffect(()=> {
    CorMBase()
  },[])

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

  const CorMBase = async () => {
    let token = localStorage.getItem('jwt')

    if( token ) {
      try {
        const clientResponse = await axios.get(`${backend_url}/client/client-detail/`, {
          headers: {
            Authorization: token,
          },
        })

        if(clientResponse.status===200){
          setClient(true);
          console.log("this is a client user");
          setUserId(clientResponse.data.id)
        }
      }
      catch (error) {
        const manResponse = await axios.get(`${backend_url}/manufacturer/manufacturer-detail/`, {
          headers: {
            Authorization: token,
          },
        })
        if(manResponse.status===200){
          setClient(false);
          console.log("this is a manufacturer user");
          setUserId(manResponse.data.id)
        }
      }
    }

    else {console.log("login first")}
    
  }

  const accountRoute = () => {
    if(userId){
      if(client) {window.location.replace(`/client/${userId}`);}
      else{ window.location.replace(`/manufacturer/${userId}`); }
    }
    else{console.log("no rerouting")}
  }

  const paymentRoute = () => {
    if(userId){
      if(client) { window.location.replace(`/client/${userId}/Pay`);}
      else{ window.location.replace(`/manufacturer/${userId}/Withdraw`); }
    }
    else{console.log("no rerouting")}
  }

  const settingsRoute = () => {
    if(userId){
      if(client) { window.location.replace(`/client/${userId}/Settings`);}
      else{ window.location.replace(`/manufacturer/${userId}/SettingsM`); }
    }
    else{console.log("no rerouting")}
  }

  const messagingRoute = () => {
    if(userId){
      if(client) { 
        window.location.replace(`/client/${userId}/Messages/`);
      }
      else{
        window.location.replace(`/manufacturer/${userId}/Messages/`);
      }
    }
    else{console.log("no rerouting")}
  }

  const handleLogout = async () => {
    document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.removeItem('jwt');
    router.push(`/client-login`)
    if(nav){setNav(!nav)}
  }

  return (
    <div className="flex justify-between items-center w-full h-25 px-4  nav">
      <div style={{display: 'flex'}}>
        <Link href="/">
        <Image
          src="/assets/usinagelogo.png"
          alt="usinage"
          width={100}  
          height={100}
          className='mx-auto my-4'
        /></Link>
      </div>

      <ul className="hidden md:flex">
        {
          userId?
          <li></li>
          :
          <li
            className="nav-links px-4 mt-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
          >
            <Link href='/client-login'>Login</Link>
          </li>
        }
        <li
          className="nav-links px-4 mt-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
        >
          <Link href='/Requests'>Access to requests</Link>
        </li>
        <li
          className="nav-links px-4 mt-2 ccursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
        >
          <Link href='/whoarewe'>Abouts us</Link>
        </li>
        <li
          className="nav-links px-4 mt-2 ccursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
        >
          <Link href='/contact' >Contact</Link>
        </li>
        <li
          className="nav-links px-4 mt-2 ccursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline xl:pr-64"
        >
          <Link href='/news' >News</Link>
        </li>
        <li
          className="nav-links pl-20 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline "
        >
          <button className="border-2 border-red-500 p-2 rounded-xl">
            <IoMdNotificationsOutline />
          </button>
        </li>
        <li
          className="nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
        >
          <button onClick={handleLogout} className="border-2 border-red-500 p-2 rounded-xl">
            <RiUserSharedFill />
          </button>
        </li>
        <li
          className="nav-links mt-2 pr-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
        >
          <Link className="px-2 py-2 border-2 rounded-xl border-red-500" href='' onClick={requestSubmit} >Submit a request</Link>
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
            <Link href='/Requests' onClick={() => {setNav(!nav)}}>Access to Requests</Link>
          </li>
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='/whoarewe' onClick={() => setNav(!nav)}>About</Link>
          </li>
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='/contact' onClick={() => setNav(!nav)}>Contact</Link>
          </li>
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='/news' onClick={() => setNav(!nav)}>News</Link>
          </li>
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='#' onClick={() => {CorMBase(); accountRoute(); setNav(!nav);}}>Account</Link>
          </li>
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='#' onClick={() => {setNav(!nav); requestSubmit()}}>Submit a Request</Link>
          </li>
          <hr className="border-2 border-red-500 w-3/4"/>
          {/* <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='#' onClick={() => setNav(!nav)}>Dashboard</Link>
          </li> */}
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='#' onClick={() => {setNav(!nav); CorMBase(); messagingRoute();}}>Messaging</Link>
          </li>
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='#' onClick={() => {setNav(!nav); CorMBase(); paymentRoute();}}>Payments</Link>
          </li>
          <li
            className="px-4 cursor-pointer capitalize py-6"
          >
            <Link href='#' onClick={() => {setNav(!nav); CorMBase(); settingsRoute();}}>Parameters</Link>
          </li>
          <li
          className="nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
          >
            <button onClick={handleLogout} className="border-2 border-red-500 p-2 rounded-xl">
              <RiUserSharedFill />
            </button>
          </li>
        </ul>
      )}

    </div>
  );
};

export default Navbar;