"use client"

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NewsCard, { newsArticleType } from "@/components/newscard";


export default function NewsArticle () {

    let [ newsArticles, setNewsArticles ] = useState([])

    let [ article, setArticle ] = useState({
       title:'', tags:'', article:'', created:'', image: ''
    })
    
    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    const params = useParams<{ article: string;}>()

    useEffect(() => {
        GetArticle()
        GetNewsArticles()
    },[])

    const GetArticle = async () => {
        const response = await axios.get(`${backend_url}/thierry/news-detail/${params.article}`)

        let newsArticle = response.data

        setArticle(newsArticle)
    }

    const GetNewsArticles = async () => {
        const response = await axios.get(`${backend_url}/thierry/news-list`)

        let newsArticles = response.data
        let latest = newsArticles.slice(0, 3)

        setNewsArticles(latest)
    }

    const formatBodyContent = (body: string) => {
        if (body !== undefined) {
          const groupedRecords = []
          let blogItems = body.split('.')
  
          for(let index= 0; index < blogItems.length; index += 5) {
            groupedRecords.push(blogItems.slice(index, index + 5).join("."))
          }
  
          const blogData = groupedRecords.map(sentence => `<p>${sentence.trim().concat(".")}</p><br>`)
          const item = blogData.join("")
  
          return <div dangerouslySetInnerHTML={{__html: item }} />
        } else {
          return "";
        }
    }

    if (article) {
        console.log(article)
        return (
            <div style={{textAlign: 'center', marginTop:'60px'}}>
                <div className="w-[75%] mx-auto mb-5">
                    <h1 className="font-bolder text-3xl text-blue-500 mb-12">{article.title}</h1>
                    <p> Welcome Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin 
                        literature from 45 BC, making it over 2000 years old. Richard McClintock,</p>
                    <Image
                        src={`${article.image}`}
                        alt="works1"
                        width={900}  
                        height={700}
                        className='mx-auto my-10'
                    />
                    <div>
                        { formatBodyContent(article.article) }
                    </div>

                    <h1 className="font-bolder text-xl text-red-500 mb-2">Tags</h1>
                    <p className="mb-6">{article.tags}</p>
                    <hr className=" border-gray-600"/>

                    <h1 className="font-bolder text-2xl  mt-24">Latest News</h1>

                    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
                        {newsArticles.map( (NewsArticle: newsArticleType) => (
                            <NewsCard key={NewsArticle.id} article={NewsArticle}/>
                        )
                        )}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <p>Loading...</p>
        )
    }
                
}