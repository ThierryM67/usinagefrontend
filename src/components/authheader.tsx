"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { FiMessageCircle } from "react-icons/fi";
import { FaEuroSign } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";

const AuthNav = ({}) => {
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
    <div className="shadow-lg">
      <div className="flex justify-between items-center w-[80%] h-25 px-4 nav mx-auto">

        <ul className="hidden md:flex mx-auto">
          <li
            className="nav-links px-4 mt-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
          >
            <Link href='#' className="flex" onClick={() => {setNav(!nav); CorMBase(); accountRoute();}}>
              <TbInfoSquareRoundedFilled className="text-blue-500 mt-1"/>Dashboard
            </Link>
          </li>
          <li
            className="nav-links px-4 mt-2 ccursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
          >
            <Link href='#' className="flex" onClick={() => {setNav(!nav); CorM()}}>
              <FaBriefcase className="text-blue-500 mt-1"/>Access to Requests
            </Link>
          </li>
          <li
            className="nav-links px-4 mt-2 ccursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
          >
            <Link href='#' className="flex" onClick={() => {setNav(!nav); CorMBase(); messagingRoute();}}>
              <FiMessageCircle className="text-red-500 mt-1"/>Messaging
            </Link>
          </li>
          <li
            className="nav-links px-4 mt-2 ccursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
          >
            <Link href='#' className="flex" onClick={() => {setNav(!nav); CorMBase(); paymentRoute();}}>
              <FaEuroSign className="text-blue-500 mt-1"/>Payments
            </Link>
          </li>
          <li
            className="nav-links px-4 mt-2 ccursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
          >
            <Link href='#' className="flex" onClick={() => {setNav(!nav); CorMBase(); settingsRoute();}}>
              <IoSettingsSharp className="text-blue-500 mt-1"/>Parameters
            </Link>
          </li>
          <li
            className="nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-200 duration-200 link-underline"
          >
            <button onClick={handleLogout} className="flex border-2 p-2 border-transparent">
              <LuLogOut className="text-blue-500 mt-1"/>Logout
            </button>
          </li>
        
        </ul>

        {/* <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div> */}

      </div>
    </div>
  );
};

export default AuthNav;