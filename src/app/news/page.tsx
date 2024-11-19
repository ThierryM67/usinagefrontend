"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import NewsCard, { newsArticleType } from "@/components/newscard";
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

    const GetNewsArticles = async () => {
        const response = await axios.get(`${backend_url}/thierry/news-list`)

        let news_articles = response.data

        setNewsArticles(news_articles)
        console.log(newsArticles)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = newsArticles.slice(firstPostIndex, lastPostIndex);

    if (newsArticles) {
        return (
            <div style={{textAlign: 'center', marginTop:'60px'}}>
                <div className="w-[75%] mx-auto mb-5">
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
            <p>Loading...</p>
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