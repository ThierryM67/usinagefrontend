"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Request } from "@/app/page";
import { FaEuroSign } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { IoSettingsSharp } from "react-icons/io5";
import ManOfferCard, { manufacturer } from "@/components/manOffercard";
import Messaging from "@/app/(manufacturer)/manufacturer/[Manufacturer]/Messages/page";

export type Offer = {
    manufacturer:string, price:number, days:number, description:string, accepted_status:boolean,
    accepted_by_client:string, created:string, active:boolean
}

export default function MReqDetail() {
    let router = useRouter()
    let params = useParams<{Manufacturer : string; request: string}>()

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    let [ request, setRequest ] = useState<Request>()
    let [ offers, setOffers ] = useState<Offer[]>()
    let [ selectOffer, setSelectOffer ] = useState<Offer>()
    let [ selected, setSelected ] = useState(false)
    let [ clientId, setClientId ] = useState<number>()
    let [ offerId, setOfferId ] = useState("")
    let [ offerManufacturers, setOfferManufacturers ] = useState<manufacturer[]>()
    let [ client, setClient ] = useState('')
    const [selectedImages, setSelectedImages] = useState<string[]>();

    const [filePreviews, setFilePreviews] = useState<string[]>([]);

    useEffect(() => {
        GetRequest()
        GetOffers()
        offerDetail()
    },[offerId])


    const GetRequest = async () => {
        const response = await axios.get(`${backend_url}/client/request-detail2/${params.request}/`)
    
        let requestData = response.data
    
        setRequest(requestData) 

        const GetClient = async () => {
            const response = await axios.get(`${backend_url}/client/client-detail/${requestData.client}/`)
        
            let clientData = response.data.first_name
        
            setClient(clientData)
            setClientId(response.data.id)
        }

        GetClient()
        let images = []
        let pass = 1
        requestData.image1? images.push(requestData.image1): pass+=1
        requestData.image2? images.push(requestData.image2): pass+=1
        requestData.image3? images.push(requestData.image3): pass+=1
        requestData.image4? images.push(requestData.image4): pass+=1
        requestData.image5? images.push(requestData.image5): pass+=1
        setSelectedImages(images)

        let files : string[] = []
        requestData.file1? files.push(requestData.file1): pass+=1
        requestData.file2? files.push(requestData.file2): pass+=1
        requestData.file3? files.push(requestData.file3): pass+=1
        setFilePreviews(files)
    }

    const GetOffers = async () => {
        const response = await axios.get(`${backend_url}/manufacturer/request-offer-list/${params.request}/`)
    
        let offerData = response.data
    
        setOffers(offerData)

        let manufs = []

        for (let offer of offerData) {
            manufs.push(parseInt(offer.manufacturer))
        }
        let postRequest = {"manufacturers": manufs}
        const manresponse = await axios.post(`${backend_url}/manufacturer/offer-manufacturers/`, postRequest)
        const manufacturersData = manresponse.data
        setOfferManufacturers(manufacturersData)
    }

    const offerDetail = async () => { 
        const response = await axios.get(`${backend_url}/manufacturer/offer-detail/${params.Manufacturer}/`)
    
        let offerData = response.data
        setSelectOffer(offerData)

    };

    const handleMessage = () => {
        localStorage.setItem('chatId', `${clientId}`);
        localStorage.setItem('ChatName', `${client}`);
        router.push(`/manufacturer/${params.Manufacturer}/Messages`)

        setTimeout(() => {
            localStorage.removeItem('chatId');
            localStorage.removeItem('ChatName');
            console.log('Item removed after 50 seconds');
          }, 50000);
    }

    const handleDelete = async () => { 
        const response = await axios.delete(`${backend_url}/manufacturer/offer-delete/${offerId}/`)
    
        let deleteData = response.data
        console.log(deleteData)

    };

    const handleUpdate = async () => { 
        router.push(`/manufacturer/${params.Manufacturer}/Requests/${params.request}/UpdateOffer/${offerId}`)
    };
    

    if(request){

        return (
            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',  
            }}
            >
                <div style={{textAlign: 'center', marginTop:'60px', width:'80%'}}>
                    <h1 className="font-bolder text-3xl text-blue-500 mb-12">{request.title}</h1>
                    <Image
                        src={`${request.image1}`}
                        alt="works1"
                        width={300}  
                        height={250}
                        className='mx-auto mb-2 mt-10 bg-red-500 rounded-2xl'
                    />
                    <div className='flex'>
                        { selectedImages?
                        selectedImages.map((selectedImage, index) => (
                            <div className="mt-2 mb-8 mx-auto" key={index}>
                            <img
                                src={`${selectedImage}`}
                                alt="Selected preview"
                                className=" mx-auto w-32 h-32 object-cover border rounded"
                            />
                            </div>
                        ))
                        :
                        <p>.</p>
                        }
                        
                    </div>
                    <div style={{fontSize:'12px', display:'flex', color:'GrayText'}} className="w-[50%] mx-auto">
                        <div><p >© Posted {request.created.split('T')[0]}</p></div>
                        <div><p className="px-4">Deadline after: {request.deadline}</p></div>
                        <div><p className="pr-4">Offers sent: {offers?.length}</p></div>
                        <div><p >© Type of offer: {request.offer_type}</p></div>
                    </div>
                    <p style={{fontSize:'14px', width:'80%'}} className="py-4 text-gray-500 mx-auto">{request.description}</p>
                    <p>Published by - {client}</p>
                    <div className="grid grid-cols-2">
                        <div style={{fontSize:'12px'}}><p className="ml-10">Quantity: {request.quantity}</p></div>
                        <div style={{fontSize:'12px'}} ><p className="flex"><IoSettingsSharp className="text-blue-500 mt-1 mr-2"/>Material : {request.material}</p></div>
                    </div>
                    <p className="py-4">{request.urgent.toString()} Urgent</p>
                    <p>{request.relaypoint_send.toString()} Sending to a relay point</p>
                    <div className='flex'>
                        { filePreviews?
                        filePreviews.map((preview, index) => (
                            <div className="mt-2 mb-8 mx-auto" key={index}>
                                <iframe
                                    src={`${preview}`}
                                    style={{ border: "none", width: "200px", height: "140px" }} // Adjust height and width as needed
                                    title="Request pdf">
                                </iframe>
                                <Link href={`${preview}`} target="_blank" rel="noopener noreferrer">view</Link>
                            </div>
                        ))
                        :
                        <p>.</p>
                        }
                        
                    </div>
                    <button className="bg-red-600 rounded-lg px-24 py-2 mt-4">
                        <Link href={`/manufacturer/${params.Manufacturer}/Requests/${params.request}/CreateOffer`}>Send an offer</Link>
                    </button>
                    <div>
                        <button className="bg-blue-500 rounded-lg px-24 py-2 mt-4" onClick={handleMessage}>
                            <p>Message Client</p>
                        </button>
                    </div>
                    { offerManufacturers && (
                        <div>
                            <h1 className="font-bolder text-3xl my-12">The offers</h1>
                            <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-3">
                                {offerManufacturers.map( (offerManufacturer: manufacturer) => (
                                    <ManOfferCard 
                                    key={offerManufacturer.id}
                                    manufacturer={offerManufacturer}
                                    selected={selected}
                                    setSelected={setSelected}
                                    offerId={offerId}
                                    setOfferId={setOfferId}
                                />
                                )
                                )}
                            </div>
                        </div>
                    )}
                    {
                        selectOffer? 
                            offerId==params.Manufacturer?
                                <div className="bg-gray-100 mx-auto rounded-2xl py-10">
                                    <h1 className="font-bolder text-3xl my-12">Your Offer</h1>
                                    <div className="flex text-center w-[50%] mx-auto pb-4">
                                        <p className="flex pr-16">
                                            <FaEuroSign className="mt-1 mr-2"/>Price: {selectOffer.price}<FaEuroSign className="mt-1 mr-2"/>
                                        </p>
                                        <p className="flex">
                                            <FaRegCalendar className="text-blue-500 mt-1 mr-2"/>Days {selectOffer.days}
                                        </p>
                                    </div>
                                    <p className="w-[70%] mx-auto text-gray-500">{selectOffer.description}</p>
                                    <hr className="w-[80%] mx-auto border-2 border-gray-400 my-10"/>
                                    <div className="mx-auto flex w-[80%] pb-4">
                                        <button onClick={handleUpdate} className="px-8 py-2 border-2 border-red-500 rounded-xl mx-auto">
                                            Modify your order
                                        </button>
                                        <button onClick={handleDelete} className="px-8 py-2 border-2 border-red-500 rounded-xl mx-auto">
                                            Delete your order
                                        </button>
                                    </div>
                                </div>
                            :
                            <div className="bg-gray-100 mx-auto rounded-2xl py-10">
                                <h1 className="font-bolder text-3xl my-12">Offer</h1>
                                <div className="flex text-center w-[40%] mx-auto pb-4">
                                    <p className="flex pr-16">
                                        <FaEuroSign className="mt-1 mr-2"/>Price: {selectOffer.price}<FaEuroSign className="mt-1 mr-2"/>
                                    </p>
                                    <p className="flex">
                                        <FaRegCalendar className="text-blue-500 mt-1 mr-2"/>Days {selectOffer.days}
                                    </p>
                                </div>
                                <p className="w-[70%] mx-auto text-gray-500">{selectOffer.description}</p>
                                <hr className="w-[80%] mx-auto border-2 border-gray-400 my-10"/>
                            </div>
                        :
                        <p></p>
                    }
                </div>
            </div>
        );
    } 
}