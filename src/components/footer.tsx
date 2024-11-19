"use client"
import Image from "next/image";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from 'next/navigation';


export default function Footer() {
  
  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'

  let router = useRouter()

  const pathname = usePathname();

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

  const CorM2 = async () => {
    let token = localStorage.getItem('jwt')
    const clientResponse = await axios.get(`${backend_url}/client/client-detail/`, {
      headers: {
        Authorization: token,
      },
    })
    if(clientResponse){
      router.push(`/client/${clientResponse.data.id}`)
    }
    else {
      const manResponse = await axios.get(`${backend_url}/manufacturer/manufacturer-detail/`, {
        headers: {
          Authorization: token,
        },
      })
      if(manResponse){
        router.push(`/manufacturer/${manResponse.data.id}`)
      }
      else {
        router.push(`/client/client-login`)
      }
    }
  }

  if (pathname.startsWith('/ad')) {
    return(<p></p>)
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 mt-10 border-2 border-gray-200">
      <div className="text-center">
        <div className="flex mt-8 mb-2">
          <Image
            src="/assets/usinagelogo.png"
            alt="Mon Usinage"
            width={200}  
            height={200}
          /> 
        </div>
        
        <p>We offer online machining services, adapted both companies and
            individuals. Our expertise includes custom manufacturing for 
            various needs, whether industrial or personal. Thanks to our 
            state-of-the-art technologies, we ensure precision and optimal 
            speed. Place an order easily and enjoy of high-quality parts 
            thanks to our efficient and trustworthy.</p>

        <div className="flex justify-content-center">
          <a href="#"><FaSquareFacebook size={42}/></a>
            
          <a href="#"><FaInstagramSquare size={42}/></a>
        </div>
      </div>
      <div className="text-center">
        <p className="font-bolder text-3xl text-red-500 my-10">Links</p>
        <p className="py-4"><Link href="#" onClick={requestSubmit}>Submit a request</Link></p>
        <p className="py-4"><Link href="#" onClick={CorM}>Access to requests</Link></p>
        <p className="py-4"><Link href="/whoarewe">About Us</Link></p>
        <p className="py-4"><Link href="#" onClick={CorM2}>Account</Link></p>
        <p className="py-4"><Link href="/news">News</Link></p>
      </div>
      <div className="text-center">
        <p className="font-bolder text-3xl text-red-500 my-10">Help</p>
        <p className="py-4"><Link href="/contact">Contact</Link></p>
        <p className="py-4"><Link href="/howitworks">How It Works</Link></p>
        <p className="py-4"><Link href="/faqs">FAQ</Link></p>
        <p className="py-4"><Link href="/#">Conditions</Link></p>
        <p className="py-4">Privacy policy</p>
      </div>
    </div>
  );
  }
  