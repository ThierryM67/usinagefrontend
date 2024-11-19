"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import NewsCard, { newsArticleType } from "@/components/adnewscard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";


export default function NewsArticle () {

    let [ newsArticles, setNewsArticles ] = useState([])

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'


    useEffect(() => {
        GetNewsArticles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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

     // Create news article
  const createArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (article) {
      formData.set('title', article.title);
      formData.set('tags', article.tags);
      formData.set('article', article.article);
    }
    if (coverpic){
      formData.set('image', coverpic); 
    }

    try {

      const response = await axios.post(`${backend_url}/thierry/news-create/`, formData);

      console.log(`Successful creation ${response.status}`)

      window.location.reload()

    } catch (error) {
      console.error('Error creating news article:', error);
      setError(true)
    }
  };

    const [error, setError] = useState(false);


    const GetNewsArticles = async () => {
        const response = await axios.get(`${backend_url}/thierry/news-list`)

        let news_articles = response.data

        setNewsArticles(news_articles)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = newsArticles.slice(firstPostIndex, lastPostIndex);

    if (newsArticles) {
        return (
            <div style={{textAlign: 'center', marginTop:'60px'}}>
                <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4 mt-10">
                    <h1 className="font-bolder text-3xl text-red-500 my-4">
                        Create News Article
                    </h1>
                    <form className="w-3/4 mx-auto my-4 p-4 rounded" onSubmit={createArticle}>
                        { error && (
                            <p className='text-red-600'><strong>Error creating news article</strong></p>
                        )}

                        <p className='pt-6 pb-2'>Title*</p>
                        <input
                            placeholder="Enter new article title..."
                            required
                            value={article.title}
                            onChange={(e) => setArticle({ ...article, title: e.target.value })}
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
                            placeholder="Enter new article tags..."
                            required
                            value={article.tags}
                            onChange={(e) => setArticle({ ...article, tags: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>article*</p>
                        <textarea
                            placeholder="Article body goes here.."
                            required
                            value={article.article}
                            onChange={(e) => setArticle({ ...article, article: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded h-[400px]"
                        />
                        <button type="submit" className="mx-auto bg-red-500 rounded-xl px-12 py-2">Create Article</button>
                    </form>
                </div>
                <div className="w-[75%] mx-auto my-5">
                    <h1 className="font-bolder text-3xl text-blue-500 mb-12">News</h1>
                    <p> Check out our blog, rich in useful and entertaining information
                        on various topics. You will captivating articles and practical
                        tips
                    </p>

                    <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-3">
                        {currentPosts.map( (NewsArticle: newsArticleType) => (
                            <NewsCard key={NewsArticle.id} article={NewsArticle}/>
                        )
                        )}
                    </div>
                    <PaginationSection
                        totalPosts={newsArticles.length}
                        postsPerPage={postsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        )
    }

    else {
        return (
            <p className="font-bolder text-3xl text-blue-500 mt-20">Loading...</p>
        )
    }
    
                
}

function PaginationSection({
    totalPosts,
    postsPerPage,
    currentPage,
    setCurrentPage,
  }: {
    totalPosts: number;
    postsPerPage: any;
    currentPage: any;
    setCurrentPage: any;
  }) {
    let pageNumbers =[];

    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i);
    }

    const maxPageNum = 5; // Maximum page numbers to display at once
    const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

    let activePages = pageNumbers.slice(
        Math.max(0, currentPage - 1 - pageNumLimit),
        Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
    );

    const handleNextPage = () => {
        if (currentPage < pageNumbers.length) {
          setCurrentPage(currentPage + 1);
        }
      };
    
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to render page numbers with ellipsis
    const renderPages = () => {
        const renderedPages = activePages.map((page, idx) => (
        <PaginationItem
            key={idx}
            className={currentPage === page ? "bg-neutral-100 rounded-md" : ""}
        >
            <PaginationLink onClick={() => setCurrentPage(page)}>
            {page}
            </PaginationLink>
        </PaginationItem>
        ));

        // Add ellipsis at the start if necessary
        if (activePages[0] > 1) {
        renderedPages.unshift(
            <PaginationEllipsis
            key="ellipsis-start"
            onClick={() => setCurrentPage(activePages[0] - 1)}
            />
        );
        }

        // Add ellipsis at the end if necessary
        if (activePages[activePages.length - 1] < pageNumbers.length) {
        renderedPages.push(
            <PaginationEllipsis
            key="ellipsis-end"
            onClick={() =>
                setCurrentPage(activePages[activePages.length - 1] + 1)
            }
            />
        );
        }

        return renderedPages;
    };

    return (
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevPage} />
              </PaginationItem>
    
              {renderPages()}
    
              <PaginationItem>
                <PaginationNext onClick={handleNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
    );

}
