"use client"
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Request } from "@/app/page";
import Link from "next/link";
import useWindowWidth from "@/components/window";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

export default function CRequestList () {
    let router = useRouter()
    let params = useParams<{Client : string}>()

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'
    
    let [ active, setActive ] = useState<Request[]>()
    let [ complete, setComplete ] = useState<Request[]>()
    let [ requests, setRequests ] = useState<Request[]>()

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPostsA = active?.slice(firstPostIndex, lastPostIndex);
    const currentPostsC = complete?.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        GetRequests()
    },[])

    const GetRequests = async () => {
        const response = await axios.get(`${backend_url}/client/client-request-list2/${params.Client}/`)
        let activeReq=[]
        let completeReq=[]
        let requestData = response.data

        for(let request of requestData) {
            if(request.completed_status === false){
                activeReq.push(request)
            }
            else{
                completeReq.push(request)
            }
        }
    
        setRequests(requestData)
        setActive(activeReq)
        setComplete(completeReq)
    }

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',  
        }}
        >
            <div style={{textAlign: 'center', marginTop:'60px', width:'80%'}}>
                <h1 className="font-bolder text-3xl text-blue-500 mb-12">Your Active requests</h1>
                    {active ? 
                    <div>
                        {
                            currentPostsA?.map( (request: Request) => (
                                <Link
                                href={`/client/${params.Client}/crequests/${request.id}`}
                                key ={request.id}
                                className="grid grid-cols-5 gap-2 bg-gray-100 shadow-lg rounded-xl p-4 mb-4 hover:scale-105">
                                    <div className="col-span-2">
                                        <Image
                                            src={`${request.image1}`}
                                            //src='https://usinage-vercelback.vercel.app/media/request-images/443904.jpg'
                                            className="rounded-xl bg-red-500"
                                            alt="cworks8"
                                            width={500}  
                                            height={300}
                                        />
                                    </div>
                                    <div className="col-span-3 text-start">
                                        <p className="font-bolder text-xl">{request.title}</p>
                                        <p style={{fontSize:'14px'}} className="text-gray-500 py-2">© Posted {request.created.split('T')[0]}</p>
                                        <p style={{fontSize:'16px'}} className="text-gray-500 pb-2">{request.description.slice(0,40)}...</p>
                                        <div style={{fontSize:'12px', display:'flex'}}>
                                            <p >Deadline after: {request.deadline}</p>
                                            <p className="px-4">Offers sent: {request.deadline}</p>
                                            <p >Type of offer: {request.offer_type}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                        <PaginationSection
                            totalPosts={active.length}
                            postsPerPage={postsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                    :
                    <p className="font-bolder text-3xl text-blue-500 my-auto" >Loading, Please wait</p>
                    }
                <h1 className="font-bolder text-3xl text-blue-500 mb-12">Your Complete requests</h1>
                    {complete ? 
                    <div>
                        {
                            currentPostsC?.map( (request: Request) => (
                                <Link
                                href={`/client/${params.Client}/crequests/${request.id}`}
                                key ={request.id} 
                                className="grid grid-cols-5 gap-2 bg-gray-100 shadow-xl rounded-xl p-4 mb-4 hover:scale-105">
                                    <div className="col-span-2">
                                        <Image
                                            src={`${request.image1}`}
                                            //src='https://usinage-vercelback.vercel.app/media/request-images/443904.jpg'
                                            className="rounded-xl bg-red-500"
                                            alt="cworks8"
                                            width={500}  
                                            height={300}
                                        />
                                    </div>
                                    <div className="col-span-3 text-start">
                                        <p className="font-bolder text-xl">{request.title}</p>
                                        <p style={{fontSize:'14px'}} className="text-gray-500 py-2">© Posted {request.created.split('T')[0]}</p>
                                        <p style={{fontSize:'16px'}} className="text-gray-500 pb-2">{request.description.slice(0,40)}...</p>
                                        <div style={{fontSize:'12px', display:'flex'}}>
                                            <p >Deadline after: {request.deadline}</p>
                                            <p className="px-4">Offers sent: {request.deadline}</p>
                                            <p >Type of offer: {request.offer_type}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                        <PaginationSection
                            totalPosts={complete.length}
                            postsPerPage={postsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                    :
                    <p className="font-bolder text-3xl text-blue-500 my-auto" >Loading, Please wait</p>
                    }    
            </div>
        </div>
    )
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