"use client"
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Request } from "@/app/page";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import Link from "next/link";


export default function ClientDashboard() {
    let [ client, setClient ] = useState({
        first_name:'', last_name:'', email:'', password1:'', password2:'',
        city: '',postalCode:'',idNumber:'',address:'',
        profile_name:'', profile_pic:''
    })

    let params = useParams<{Client: string}>()

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    let [activeprojects, setActiveProjects] = useState<Request[]>([])

    let [completeprojects, setCompleteProjects] = useState<Request[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPostsA = activeprojects.slice(firstPostIndex, lastPostIndex);
    const currentPostsC = completeprojects.slice(firstPostIndex, lastPostIndex);


  useEffect(() => {
    GetClient()
    cprojects()
  },[])


  const GetClient = async () => {

    const clientResponse = await axios.get(`${backend_url}/client/client-detail/`, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
    })

    let clientdata = clientResponse.data

    setClient(clientdata)
  }

  const cprojects = async () => {
    const response = await axios.get(
        `${backend_url}/client/client-request-list2/${params.Client}`
    )

    let requestdata = response.data

    let active=[]
    let completed =[]

    for (let request of requestdata) {
        if (request.completed_status===false){
            active.push(request)
        }
        else{
            completed.push(request)
        }
    }

    setActiveProjects(active)

    setCompleteProjects(completed)

    window.location.reload()//just try
}
    if(activeprojects.length > 0){
        return (
            <div >
                <div
                    style={{textAlign: 'center', marginTop:'30px'}}
                >
                    <h1 className="font-bolder text-3xl text-blue-500 pb-10">Dashboard</h1>
                    <p>Welcome</p>
                </div>
                <Image
                  src={`${client.profile_pic}`}
                  alt="profile image"
                  width={200}  
                  height={200}
                  className='mx-auto mt-5'
                />
                <div
                    style={{textAlign: 'center', marginTop:'10px'}}
                >
                    <p className="text-red-500">{client.first_name} {client.last_name}</p>
                    <p>{client.profile_name}</p>
                    <p>{client.email}</p>
                </div>
                <div
                    style={{textAlign: 'center', marginTop:'60px'}}
                >
                    <h1 className="font-bolder text-3xl text-red-500 pb-10">Current projects</h1>
                </div>
                <div className="mx-auto w-3/4 py-4">

                    {currentPostsA.map((activeproject, index) => (
                        <div className="grid grid-cols-2 gap-2 bg-gray-100 shadow rounded-xl p-4 hover:scale-105" key={index}>
                            <div>
                                <p className="font-bolder text-xl">{activeproject.title}</p>
                                <p>{activeproject.created}</p>
                                <p>{activeproject.description.slice(0, 25)}</p>
                                <p><Link href={`/client/${params.Client}/crequests/${activeproject.id}`}>View...</Link></p>
                            </div>
                            <div>
                                <Image
                                    src={`${activeproject.image1}`}
                                    alt="active project"
                                    width={500}  
                                    height={250}
                                />
                            </div>
                        </div>
                    ))}
                    <PaginationSection
                        totalPosts={activeprojects.length}
                        postsPerPage={postsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                {
                    completeprojects.length > 0?
                    <div>
                        <div
                            style={{textAlign: 'center', marginTop:'60px'}}
                        >
                            <h1 className="font-bolder text-3xl text-red-500 pb-10">Completed projects</h1>
                        </div>
                        <div className=" mx-auto w-3/4 py-4">
                            {currentPostsC.map((completeproject, index) => (
                                <div className="grid grid-cols-2 gap-2 bg-gray-100 shadow rounded-xl p-4 hover:scale-105" key={index}>
                                    <div>
                                        <p className="font-bolder text-xl">{completeproject.title}</p>
                                        <p>{completeproject.created}</p>
                                        <p>{completeproject.description.slice(0, 25)}</p>
                                        <p><Link href={`/client/${params.Client}/crequests/${completeproject.id}`}>View...</Link></p>
                                    </div>
                                    <div>
                                        <Image
                                            src={`${completeproject.image1}`}
                                            alt="complete project"
                                            width={500}  
                                            height={250}
                                        />
                                    </div>
                                </div>
                            ))}
                            <PaginationSection
                                totalPosts={completeprojects.length}
                                postsPerPage={postsPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>:
                    <div
                        style={{textAlign: 'center', marginTop:'30px'}}
                    >
                        <h1 className="font-bolder text-3xl text-red-500 pb-10">Complete projects</h1>
                        <p className="py-10">No complete projects</p>
                    </div>

                }

            </div>
        );
    }
    else {
        return (
            <div >
                <div
                    style={{textAlign: 'center', marginTop:'30px'}}
                >
                    <h1 className="font-bolder text-3xl text-blue-500 pb-10">Dashboard</h1>
                    <p>Welcome</p>
                </div>
                <Image
                  src={`${client.profile_pic}`}
                  alt="profile image"
                  width={200}  
                  height={200}
                  className='mx-auto mt-5'
                />
                <div
                    style={{textAlign: 'center', marginTop:'10px'}}
                >
                    <p className="text-red-500">{client.first_name} {client.last_name}</p>
                    <p>{client.profile_name}</p>
                    <p>{client.email}</p>
                </div>
                <div
                    style={{textAlign: 'center', marginTop:'30px'}}
                >
                    <h1 className="font-bolder text-3xl text-red-500 pb-10">Current projects</h1>
                    <p className="py-10">No current projects</p>
                </div>

                {
                    completeprojects.length > 0?
                    <div>
                        <div
                            style={{textAlign: 'center', marginTop:'60px'}}
                        >
                            <h1 className="font-bolder text-3xl text-red-500 pb-10">Completed projects</h1>
                        </div>
                        <div className=" mx-auto w-3/4 py-4">
                            {currentPostsC.map((completeproject, index) => (
                                <div className="grid grid-cols-2 gap-2 bg-gray-100 shadow rounded-xl p-4" key={index}>
                                    <div>
                                        <p className="font-bolder text-xl">{completeproject.title}</p>
                                        <p>{completeproject.created}</p>
                                        <p>{completeproject.description.slice(0, 25)}</p>
                                        <p>Request Page link</p>
                                    </div>
                                    <div>
                                        <Image
                                            src={`${completeproject.image1}`}
                                            alt="active project"
                                            width={500}  
                                            height={250}
                                        />
                                    </div>
                                </div>
                            ))}
                            <PaginationSection
                                totalPosts={completeprojects.length}
                                postsPerPage={postsPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>:
                    <div
                        style={{textAlign: 'center', marginTop:'30px'}}
                    >
                        <h1 className="font-bolder text-3xl text-red-500 pb-10">Complete projects</h1>
                        <p className="py-10">No complete projects</p>
                    </div>

                }
                
                
            </div>
        );
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