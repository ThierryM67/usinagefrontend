
"use client"
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Request } from "@/app/page";
import { Offer } from "./[request]/page";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { FaFilter } from "react-icons/fa";

export default function RequestList () {
    let router = useRouter()
    let params = useParams<{Manufacturer : string}>()

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    type RequestU = Request & {
        countOffers: number;
      };
    
    let [ requests, setRequests ] = useState<Request[]>()
    let [ filteredReq, setFilteredReq ] = useState<RequestU[]>()
    let [ filters, setFilters ] = useState(false)
    let [ filterParams, setFilterParams ] = useState({offerCount:'', deadline:'', sort:'', offerType:''})
    let [ small, setSmall ] = useState(false)
    let [ requestsU, setRequestsU ] = useState<RequestU[]>()
    const windowWidth = () => {window.innerWidth; window.innerWidth>800? setSmall(false): setSmall(true)}

    const [selected, setSelected] = useState<string | null>(null);
    const [selectedD, setSelectedD] = useState<string | null>(null);
    const [selectedS, setSelectedS] = useState<string | null>(null);
    const [selectedT, setSelectedT] = useState<string | null>(null);

    // Handler to toggle select/deselect
    const handleRadioChange = (value: string) => {
        // Deselect if the same value is clicked
        setSelected((prevSelected) => (prevSelected === value ? null : value));
        setFilterParams({...filterParams, offerCount: value});
    };

    const handleRadioChangeD = (value: string) => {
        // Deselect if the same value is clicked
        setSelectedD((prevSelected) => (prevSelected === value ? null : value));
        setFilterParams({...filterParams, deadline: value});
    };

    const handleRadioChangeS = (value: string) => {
        // Deselect if the same value is clicked
        setSelectedS((prevSelected) => (prevSelected === value ? null : value));
        setFilterParams({...filterParams, sort: value});
    };

    const handleRadioChangeT = (value: string) => {
        // Deselect if the same value is clicked
        setSelectedT((prevSelected) => (prevSelected === value ? null : value));
        setFilterParams({...filterParams, offerType: value});
    };

    useEffect(() => {
        GetRequests()
        windowWidth()
    },[small])

    function getDaysDifference(dateString: string) {
        const currentDate = new Date();
        const givenDate = new Date(dateString);
    
        // Calculate difference in milliseconds
        const differenceInMs = currentDate.getTime() - givenDate.getTime();
    
        // Convert from milliseconds to days
        const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    
        return differenceInDays;
    }

    function EndsIn(created: string, deadline: number) {
        let remainder = deadline-getDaysDifference(created)
        if(remainder<=0){return 'ended'}
        else{ return `${remainder} days` }
    }

    function filterRequests(requests: RequestU[]) {
        let fArray : RequestU[] =[]
        if(filterParams.offerType){
            if(filterParams.offerType=='Classic'){
                fArray = requests.filter(request => request.offer_type==='Classic')
            }
            if(filterParams.offerType=='Modern'){
                fArray=requests.filter(request => request.offer_type==='Modern')
            }
            if(filterParams.offerType=='Different'){
                fArray=requests.filter(request => request.offer_type==='Different')
            }
            if(filterParams.offerType=='all'){
                fArray = requests
            }
        } else { fArray = requests }

        console.log(fArray)

        if(filterParams.sort){
            if(filterParams.sort=='normal'){
                fArray = fArray
            }
            if(filterParams.sort=='reverse'){
                fArray = fArray.reverse()
            }
        } else { fArray = fArray }

        console.log(fArray)

        if(filterParams.deadline){
            fArray = fArray.filter(request => EndsIn(request.created, parseInt(request.deadline)) !== 'ended')

            if(filterParams.deadline=='1'){
                fArray = fArray.filter(request => EndsIn(request.created, parseInt(request.deadline)).split(' ')[0]=='1')
            }
            if(filterParams.deadline=='2'){
                fArray = fArray.filter(request => EndsIn(request.created, parseInt(request.deadline)).split(' ')[0]<='2')
            }
            if(filterParams.deadline=='3'){
                fArray = fArray.filter(request => EndsIn(request.created, parseInt(request.deadline)).split(' ')[0]<='3')
            }
            if(filterParams.deadline=='4'){
                fArray = fArray.filter(request => EndsIn(request.created, parseInt(request.deadline)).split(' ')[0]<='4')
            }
            if(filterParams.deadline=='5+'){
                console.log(EndsIn(requests[0].created, parseInt(requests[0].deadline)).split(' ')[0])
                fArray = fArray.filter(request => EndsIn(request.created, parseInt(request.deadline)).split(' ')[0]>= '5')
            }
        } else { fArray = fArray }
        console.log(fArray)

        if(filterParams.offerCount){
            if(filterParams.offerCount=='5'){
                fArray = fArray.filter(request => request.countOffers < 5)
            }
            if(filterParams.offerCount=='5-10'){
                fArray = fArray.filter(request => request.countOffers >= 5 && request.countOffers <11)
            }
            if(filterParams.offerCount=='10-20'){
                fArray = fArray.filter(request => request.countOffers >10 && request.countOffers <20)
            }
            if(filterParams.offerCount=='20+'){
                fArray = fArray.filter(request => request.countOffers >=20)
            }
        } else { fArray = fArray }
        console.log(fArray)

        setFilteredReq(fArray)
    }

    const GetRequests = async () => {
        const response = await axios.get(`${backend_url}/client/general-request-list2/`)
    
        let requestData: Request[] = response.data
        console.log(requestData)
        let arrayU: RequestU[]=[]
        for(let request of requestData){
            let offers: Offer[] = []
            let countRequest = await axios.get(`${backend_url}/manufacturer/request-offer-list/${request.id}`)
            offers = countRequest.data
            let count = { countOffers: offers.length}
            let requestU = {...request, ...count}
            arrayU.push(requestU)
        }
        setRequestsU(arrayU)
        setRequests(requestData) 
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let currentPosts
    filteredReq ?
    currentPosts = filteredReq?.slice(firstPostIndex, lastPostIndex)
    : currentPosts = requestsU?.slice(firstPostIndex, lastPostIndex)

    

    if(small === false) {

        return (
            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',  
            }}
            >
                <div style={{textAlign: 'center', marginTop:'60px'}}>
                    <h1 className="font-bolder text-3xl text-blue-500 mb-12">Parts requests</h1>
                    
                    <div className="grid grid-cols-1 w-[85%] mx-auto gap-6 sm:grid-cols-6">
                        <div className="col-span-4">
                        {requestsU? 
                        <div>
                            {
                                currentPosts?.map( (request: RequestU) => (
                                    <Link
                                    href={`/manufacturer/${params.Manufacturer}/Requests/${request.id}`}
                                    key ={request.id} className="grid grid-cols-5 gap-2 bg-gray-100 shadow-xl rounded-xl p-4 mb-4 hover:scale-105">
                                        <div className="col-span-2">
                                            <Image
                                                src={`${request.image1}`}
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
                                                <p >Ends in: {EndsIn(request.created, parseInt(request.deadline))}</p>
                                                <p className="px-4">Offers sent: {request.countOffers}</p>
                                                <p >Type of offer: {request.offer_type}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                            <PaginationSection
                                totalPosts={requestsU.length}
                                postsPerPage={postsPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                        
                        :
                        <p className="font-bolder text-3xl text-blue-500 my-32" >Loading, Please wait</p>
                        }
                        
                        </div>
                        <div className="col-span-2">
                            <div className="border-b-2 border-black py-8">
                                <p>Need to make a room?</p>
                                <p style={{fontSize:'16px'}} className="text-gray-500 pb-4 pt-2">Publish your request and get quotes at no cost</p>
                                <button className="text-red-500 pb-2 border-2 border-red-500 px-4 py-2 rounded-xl">
                                    <Link href="/client-login">Submit a request</Link> 
                                </button>
                            </div>
                            <div className="border-b-2 border-black py-8">
                                <p>Are you a manufacturer?</p>
                                <p className="text-gray-500 pb-4">Create your profile and submit your proposal</p>
                                <button className="text-red-500 pb-2 border-2 border-red-500 px-4 py-2 rounded-xl">
                                    <Link href="/man-login">Manufacturer</Link> 
                                </button>
                            </div>
                            <div className="border-b-2 border-black py-8">
                                <p>Number of offers</p>
                                <div className="text-start">
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="5"
                                        name="options"
                                        checked={selected === '5'}
                                        onChange={() => handleRadioChange('5')}
                                        />
                                        <label className="pl-2" htmlFor="option1">less than 5</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="5-10"
                                        name="options"
                                        checked={selected === '5-10'}
                                        onChange={() => handleRadioChange('5-10')}
                                        />
                                        <label className="pl-2" htmlFor="option2">5 - 10</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="10-20"
                                        name="options"
                                        checked={selected === '10-20'}
                                        onChange={() => handleRadioChange('10-20')}
                                        />
                                        <label className="pl-2" htmlFor="option3">10 - 20</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="20+"
                                        name="options"
                                        checked={selected === '20+'}
                                        onChange={() => handleRadioChange('20+')}
                                        />
                                        <label className="pl-2" htmlFor="option4">20+</label>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b-2 border-black py-8">
                                <p>Will close at the latest in:</p>
                                <div className="text-start">
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="1"
                                        name="optionsD"
                                        checked={selectedD === '1'}
                                        onChange={() => handleRadioChangeD('1')}
                                        />
                                        <label className="pl-2" htmlFor="option5">One day</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="2"
                                        name="optionsD"
                                        checked={selectedD === '2'}
                                        onChange={() => handleRadioChangeD('2')}
                                        />
                                        <label className="pl-2" htmlFor="option6">2 days</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="3"
                                        name="optionsD"
                                        checked={selectedD === '3'}
                                        onChange={() => handleRadioChangeD('3')}
                                        />
                                        <label className="pl-2" htmlFor="option7">3 days</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="4"
                                        name="optionsD"
                                        checked={selectedD === '4'}
                                        onChange={() => handleRadioChangeD('4')}
                                        />
                                        <label className="pl-2" htmlFor="option8">4 days</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="5+"
                                        name="optionsD"
                                        checked={selectedD === '5+'}
                                        onChange={() => handleRadioChangeD('5+')}
                                        />
                                        <label className="pl-2" htmlFor="option9">5 days+</label>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b-2 border-black py-8">
                                <p>Sort by:</p>
                                <div className="text-start">
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="normal"
                                        name="optionsS"
                                        checked={selectedS === 'normal'}
                                        onChange={() => handleRadioChangeS('normal')}
                                        />
                                        <label className="pl-2" htmlFor="option10">Last</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="reverse"
                                        name="optionsS"
                                        checked={selectedS === 'reverse'}
                                        onChange={() => handleRadioChangeS('reverse')}
                                        />
                                        <label className="pl-2" htmlFor="option11">Oldest</label>
                                    </div>
                                </div>
                            </div>
                            <div className="py-8">
                                <p>Type of offer:</p>
                                <div className="text-start">
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="all"
                                        name="optionsT"
                                        checked={selectedT === 'all'}
                                        onChange={() => handleRadioChangeT('all')}
                                        />
                                        <label className="pl-2" htmlFor="option12">All</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="Classic"
                                        name="optionsT"
                                        checked={selectedT === 'Classic'}
                                        onChange={() => handleRadioChangeT('Classic')}
                                        />
                                        <label className="pl-2" htmlFor="option13">Classic</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="Modern"
                                        name="optionsT"
                                        checked={selectedT === 'Modern'}
                                        onChange={() => handleRadioChangeT('Modern')}
                                        />
                                        <label className="pl-2" htmlFor="option14">Modern</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="Different"
                                        name="optionsT"
                                        checked={selectedT === 'Different'}
                                        onChange={() => handleRadioChangeT('Different')}
                                        />
                                        <label className="pl-2" htmlFor="option15">Different</label>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="flex rounded-2xl py-2 px-4 bg-blue-500 mx-auto mt-4"
                                onClick={()=>{filterRequests(requestsU!)}}
                            >
                                <FaFilter className="mt-1 mr-2"/>Apply Filter Options
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return(
            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',  
            }}
            >
                <div style={{textAlign: 'center', marginTop:'60px'}}>
                    <h1 className="font-bolder text-3xl text-blue-500 mb-12">Parts requests</h1>
                    <div className="w-[85%] mx-auto gap-6 ">
                        <button
                            onClick={()=> setFilters(!filters)}
                            className="flex mx-auto mb-6 border-2 border-blue-500 rounded-2xl px-4 py-2"
                        >
                            <FaFilter className="mt-1 mr-2"/>Filters
                        </button>
                        { filters ? 
                        <div>
                            <div className="border-b-2 border-black py-8">
                                <p>Need to make a room?</p>
                                <p style={{fontSize:'16px'}} className="text-gray-500 pb-4 pt-2">Publish your request and get quotes at no cost</p>
                                <button className="text-red-500 pb-2 border-2 border-red-500 px-4 py-2 rounded-xl">
                                    Submit a request
                                </button>
                            </div>
                            <div className="border-b-2 border-black py-8">
                                <p>Are you a manufacturer?</p>
                                <p className="text-gray-500 pb-4">Create your profile and submit your proposal</p>
                                <button className="text-red-500 pb-2 border-2 border-red-500 px-4 py-2 rounded-xl">
                                    <Link href="/man-login">Manufacturer</Link> 
                                </button>
                            </div>
                            <div className="border-b-2 border-black py-8">
                                <p>Number of offers</p>
                                <div className="text-start">
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="5"
                                        name="options"
                                        checked={selected === '5'}
                                        onChange={() => handleRadioChange('5')}
                                        />
                                        <label className="pl-2" htmlFor="option1">less than 5</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="5-10"
                                        name="options"
                                        checked={selected === '5-10'}
                                        onChange={() => handleRadioChange('5-10')}
                                        />
                                        <label className="pl-2" htmlFor="option2">5 - 10</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="10-20"
                                        name="options"
                                        checked={selected === '10-20'}
                                        onChange={() => handleRadioChange('10-20')}
                                        />
                                        <label className="pl-2" htmlFor="option3">10 - 20</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="20+"
                                        name="options"
                                        checked={selected === '20+'}
                                        onChange={() => handleRadioChange('20+')}
                                        />
                                        <label className="pl-2" htmlFor="option4">20+</label>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b-2 border-black py-8">
                                <p>Will close at the latest in:</p>
                                <div className="text-start">
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="1"
                                        name="optionsD"
                                        checked={selectedD === '1'}
                                        onChange={() => handleRadioChangeD('1')}
                                        />
                                        <label className="pl-2" htmlFor="option5">One day</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="2"
                                        name="optionsD"
                                        checked={selectedD === '2'}
                                        onChange={() => handleRadioChangeD('2')}
                                        />
                                        <label className="pl-2" htmlFor="option6">2 days</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="3"
                                        name="optionsD"
                                        checked={selectedD === '3'}
                                        onChange={() => handleRadioChangeD('3')}
                                        />
                                        <label className="pl-2" htmlFor="option7">3 days</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="4"
                                        name="optionsD"
                                        checked={selectedD === '4'}
                                        onChange={() => handleRadioChangeD('4')}
                                        />
                                        <label className="pl-2" htmlFor="option8">4 days</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="5+"
                                        name="optionsD"
                                        checked={selectedD === '5+'}
                                        onChange={() => handleRadioChangeD('5+')}
                                        />
                                        <label className="pl-2" htmlFor="option9">5 days+</label>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b-2 border-black py-8">
                                <p>Sort by:</p>
                                <div className="text-start">
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="normal"
                                        name="optionsS"
                                        checked={selectedS === 'normal'}
                                        onChange={() => handleRadioChangeS('normal')}
                                        />
                                        <label className="pl-2" htmlFor="option10">Last</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="reverse"
                                        name="optionsS"
                                        checked={selectedS === 'reverse'}
                                        onChange={() => handleRadioChangeS('reverse')}
                                        />
                                        <label className="pl-2" htmlFor="option11">Oldest</label>
                                    </div>
                                </div>
                            </div>
                            <div className="py-8">
                                <p>Type of offer:</p>
                                <div className="text-start">
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="all"
                                        name="optionsT"
                                        checked={selectedT === 'all'}
                                        onChange={() => handleRadioChangeT('all')}
                                        />
                                        <label className="pl-2" htmlFor="option12">All</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="Classic"
                                        name="optionsT"
                                        checked={selectedT === 'Classic'}
                                        onChange={() => handleRadioChangeT('Classic')}
                                        />
                                        <label className="pl-2" htmlFor="option13">Classic</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="Modern"
                                        name="optionsT"
                                        checked={selectedT === 'Modern'}
                                        onChange={() => handleRadioChangeT('Modern')}
                                        />
                                        <label className="pl-2" htmlFor="option14">Modern</label>
                                    </div>
                                    <div className="pl-4">
                                        <input
                                        type="radio"
                                        id="Different"
                                        name="optionsT"
                                        checked={selectedT === 'Different'}
                                        onChange={() => handleRadioChangeT('Different')}
                                        />
                                        <label className="pl-2" htmlFor="option15">Different</label>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="flex rounded-2xl py-2 px-4 bg-blue-500 mx-auto mt-4"
                                onClick={()=>{filterRequests(requestsU!)}}
                            >
                                <FaFilter className="mt-1 mr-2"/>Apply Filter Options
                            </button>
                        </div>
                        
                        :
                        <div>
                            {
                                currentPosts?.map( (request: RequestU) => (
                                    <Link
                                    href={`/manufacturer/${params.Manufacturer}/Requests/${request.id}`}
                                    key ={request.id} className="grid grid-cols-5 gap-2 bg-gray-100 shadow-xl rounded-xl p-4 mb-4 hover:scale-105">
                                        <div className="col-span-2">
                                            <Image
                                                src={`${request.image1}`}
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
                                                <p >Ends in: {EndsIn(request.created, parseInt(request.deadline))}</p>
                                                <p className="px-4">Offers sent: {request.countOffers}</p>
                                                <p >Type of offer: {request.offer_type}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                            <PaginationSection
                                totalPosts={requestsU?.length}
                                postsPerPage={postsPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function PaginationSection({
    totalPosts,
    postsPerPage,
    currentPage,
    setCurrentPage,
  }: {
    totalPosts: any;
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