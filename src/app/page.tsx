"use client"
import NewsCard, { newsArticleType } from "@/components/newscard";
import axios from "axios";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export type Request = {
  title: string, client:string, image1:string, image2:string, image3:string, image4:string,
  image5: string, file1:string, file2:string, file3:string,material:string, offer_type:string,
  description:string, urgent:boolean, quantity:string, mailbox_send:boolean, relaypoint_send:boolean,
  deadline:string, accepted_manufacturer_id:string, completed_status:string, created:string,
  completed_date:string, id: number
}


export default function Home() {
  let router = useRouter()

  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'
  
  let [ newsArticles, setNewsArticles ] = useState([])
  let [ requests, setRequests ] = useState<Request[]>()

  useEffect(() => {
      GetNewsArticles()
      GetRequests()
  },[])

  const GetNewsArticles = async () => {
      const response = await axios.get(`${backend_url}/thierry/news-list`)

      let news_articles = response.data
      let latest = news_articles.slice(0, 3)

      setNewsArticles(latest)
  }

  const GetRequests = async () => {
    const response = await axios.get(`${backend_url}/client/general-request-list2/`)

    let requestData = response.data
    console.log(requestData)

    setRequests(requestData) 
  }

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
  return (
    <div >
      <div
        style={{textAlign: 'center', marginTop:'30px'}}
      >
        <h1 className="font-bolder text-3xl text-blue-500 pb-4">Mon Usinage</h1>
        <p>Connect to the best machine builders</p>
        <p>to realize your tailor-made projects</p>
      </div>
      <div className="flex mx-auto w-3/4 py-4">
          <div>
            <Image
              src="/assets/home/home1.png"
              alt="home"
              width={500}  
              height={250}
            />
          </div>
          <div>
            <Image
              src="/assets/home/home2.png"
              alt="home"
              width={500}  
              height={250}
            />
          </div>
          <div>
            <Image
              src="/assets/home/home3.png"
              alt="home"
              width={500}  
              height={250}
            />
          </div>
          <div>
            <Image
              src="/assets/home/home4.png"
              alt="home"
              width={500}  
              height={250}
            />
          </div>
        </div>
        <p className="w-3/4 mx-auto text-center">Share your plans with us, and in return, the manufacturers will provide
           you with quotes for free. Whether you are working on a small project or
            a large-scale development, our team is ready to help you by giving you
           a clear idea of the potential costs involved.
        </p>
        <div className="text-center">
          <button onClick={requestSubmit} className="bg-red-500 rounded-xl px-6 py-2 my-2 text-center">Submit a request</button>
        </div>
        
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 mx-auto w-3/4 py-4">
          <div>
            <Image
              src="/assets/home/home7.png"
              alt="cworks8"
              width={500}  
              height={250}
            />
          </div>
          <div>
            <Image
              src="/assets/home/home6.png"
              alt="home"
              width={500}  
              height={250}
            />
          </div>
          <div>
            <Image
              src="/assets/home/home7.png"
              alt="cworks8"
              width={500}  
              height={250}
            />
          </div>
        </div>

        {
          requests?
          <div>
            <h1 className="text-center font-bolder text-3xl pb-4">Recent Machining Requests</h1>
            <Link href={`/Requests/${requests[0].id}`} className="grid grid-cols-1 gap-2 md:grid-cols-2 mx-auto w-3/4 py-4">
              <div className="grid grid-cols-2 gap-2 bg-gray-100 shadow rounded-xl p-4">
                <div>
                  <p className="font-bolder text-xl">{requests[0].title}</p>
                  <p>{requests[0].created.split('T')[0]}</p>
                  <p>{requests[0].description.slice(0,30)}</p>
                  <p><Link href={`/Requests/${requests[0].id}`}>View...</Link></p>
                </div>
                <div>
                  <Image
                    src={`${requests[0].image1}`}
                    //src="/assets/home/home6.png"
                    alt="cworks8"
                    width={500}  
                    height={250}
                  />
                </div>
              </div>
              <Link href={`/Requests/${requests[1].id}`} className="grid grid-cols-2 gap-2 bg-gray-100 shadow rounded-xl p-4">
                <div>
                  <p className="font-bolder text-xl">{requests[1].title}</p>
                  <p>{requests[1].created.split('T')[0]}</p>
                  <p>{requests[1].description.slice(0,30)}</p>
                  <p><Link href={`/Requests/${requests[1].id}`}>View Request...</Link></p>
                </div>
                <div>
                  <Image
                    src={`${requests[1].image1}`}
                    //src="/assets/home/home6.png"
                    alt="cworks8"
                    width={500}  
                    height={250}
                  />
                </div>
              </Link>
            </Link>
          </div>:
          <div>p</div>
        }
        <div className="text-center">
          <button className="bg-red-500 rounded-xl px-6 py-2 my-2 text-center">
            <Link href="/Requests">Access to requests</Link>
          </button>
        </div>
        <h1 className="text-center font-bolder text-3xl pb-4 pt-10">Operation of the service</h1>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 w-[75%] mx-auto ">
          <div>
            <Image
                src="/assets/home/home8.png"
                alt="cworks4"
                width={300}  
                height={300}
                className='mx-auto mt-5'
            />
          </div>
          <div>
            <Image
                src="/assets/home/home9.png"
                alt="cworks5"
                width={300}  
                height={300}
                className='mx-auto mt-5'
            />
          </div>
          <div>
            <Image
                src="/assets/home/home10.png"
                alt="cworks6"
                width={300}  
                height={300}
                className='mx-auto mt-5'
            />
          </div>
        </div>
        <div className="text-center">
          <button className="bg-red-500 rounded-xl px-6 py-2 my-2 text-center">
            <Link href='/howitworks'>How does it work?</Link>
          </button>
        </div>
        <h1 className="text-center font-bolder text-3xl pb-4 pt-10">Latest News</h1>
        <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-3 w-[80%] mx-auto">
            {newsArticles.map( (NewsArticle: newsArticleType) => (
                <NewsCard key={NewsArticle.id} article={NewsArticle}/>
            )
            )}
        </div>
        <div className="text-center">
          <button className="bg-red-500 rounded-xl px-6 py-2 my-2 text-center">
            <Link href='/news'>News</Link>
          </button>
        </div>
    </div>
  );
}
