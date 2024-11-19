"use client"

import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function NewsArticle () {

    let [ articleU, setArticleU ] = useState({
       title:'', tags:'', article:'', created:'', image: ''
    })

    let [ article, setArticle ] = useState({
        title:'', tags:'', article:'', created:'', image: ''
     })

    let [coverpic, setCoverPic] = useState<File>();

    let [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log('image change')
    
        setCoverPic(e.target.files?.[0])
    
        if (file && file instanceof Blob) {
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
        }
    };


    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    const params = useParams<{ article: string;}>()

    const router = useRouter()

    const [error, setError] = useState(false);

    const [errorD, setErrorD] = useState(false);

    useEffect(() => {
        GetArticle()
    },[])

    const GetArticle = async () => {
        const response = await axios.get(`${backend_url}/thierry/news-detail/${params.article}`)

        let newsArticle = response.data

        setArticle(newsArticle)
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

    // Update news article
  const updateArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (articleU) {
      formData.set('title', articleU.title);
      formData.set('tags', articleU.tags);
      formData.set('article', articleU.article);
    }
    if (coverpic){
      formData.set('image', coverpic); 
    }

    try {

      const response = await axios.put(`${backend_url}/thierry/news-update/`, formData);

      console.log(`Successful registration ${response.status}`)

      window.location.reload()

    } catch (error) {
      console.error('Error updating news article:', error);
      setError(true)
    }
  };

  const handleDelete = async () => {
    try {

        const response = await axios.delete(`${backend_url}/thierry/news-delete/${params.article}`);

        console.log(`Successful deletion ${response.status}`)

        router.push('/adnews')

    } catch (error) {

    console.error('Error deleting news article:', error);
    setErrorD(true)

    }
  }

    if (article) {
        return (
            <div style={{textAlign: 'center', marginTop:'60px'}}>
                <div className="w-[75%] mx-auto mb-5">
                    <h1 className="font-bolder text-3xl text-blue-500 mb-12">{article.title}</h1>
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

                    <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4 mt-10">
                        <h1 className="font-bolder text-3xl text-red-500 my-4">
                            Update News Article
                        </h1>
                        <form className="w-3/4 mx-auto my-4 p-4 rounded" onSubmit={updateArticle}>
                            { error && (
                                <p className='text-red-600'><strong>Error updating news article</strong></p>
                            )}

                            <p className='pt-6 pb-2'>Title*</p>
                            <input
                                placeholder={`${article.title}`}
                                required
                                value={articleU.title}
                                onChange={(e) => setArticleU({ ...articleU, title: e.target.value })}
                                className="mb-2 w-full p-2 border border-gray-300 rounded"
                            />

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

                            <p className='py-2'>Upload news article picture</p>
                            <input
                            type="file"
                            name="profilepic"
                            onChange={(e) => handleImageChange(e) }
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                            />

                            <p className='pt-6 pb-2'>tags*</p>
                            <input
                                placeholder={`${article.tags}`}
                                required
                                value={articleU.tags}
                                onChange={(e) => setArticleU({ ...articleU, tags: e.target.value })}
                                className="mb-2 w-full p-2 border border-gray-300 rounded"
                            />

                            <p className='pt-6 pb-2'>article*</p>
                            <textarea
                                placeholder={`${article.article}`}
                                required
                                value={articleU.article}
                                onChange={(e) => setArticleU({ ...articleU, article: e.target.value })}
                                className="mb-2 w-full p-2 border border-gray-300 rounded h-[500px]"
                            />
                            <button type="submit" className="mx-auto bg-red-500 rounded-xl px-12 py-2">Update</button>
                        </form>
                    </div>

                    <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4 mt-10 mb-60">
                        <h1 className="font-bolder text-3xl text-red-500 my-4">
                            Delete News Article
                        </h1>
                        { errorD && (
                            <p className='text-red-600'><strong>Error deleting news article</strong></p>
                        )}
                        <button onClick={handleDelete} className="mx-auto bg-red-500 rounded-xl px-12 py-2">Delete</button>
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