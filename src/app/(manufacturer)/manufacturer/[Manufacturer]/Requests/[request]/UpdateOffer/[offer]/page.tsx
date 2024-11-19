
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function UpdateOffer() {

  const router = useRouter();

  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'

  const params = useParams<{ Manufacturer: string; request: string; offer:string}>()

  const [offer, setOffer] = React.useState(
    { 
    request: '', manufacturer: '', price:0, days:1, description: '', updated: ''
  });

  const [offerU, setOfferU] = React.useState(
    { 
    request: '', manufacturer: '', price:0, days:1, description: '', updated: new Date().toLocaleString
  });

  const [request, setRequest] = React.useState(
    { 
    title: '', client: '', material:'', offer_type: '', description: '',
    urgent:false, quantity:1, mailbox_send:false , relaypoint_send:false,
    deadline:1, image1: '', image2: '', image3: '', image4: '', image5: '',
    created: ''
  });

  const [selectedImages, setSelectedImages] = React.useState<string[]>();
  const [filePreviews, setFilePreviews] = React.useState<string[]>([]);

  const [error, setError] = useState(false);

    const [errorD, setErrorD] = useState(false);

  // Fetch Manufacturer
  React.useEffect(() => {
    const fetchMan = async () => {
      const manufacturer = await axios.get(`${backend_url}/manufacturer/manufacturer-detail2/${params.Manufacturer}`);

      let manName = manufacturer.data.first_name

      setOfferU({ ...offerU, manufacturer: manName })

    }

    fetchMan();

    const fetchOffer = async () => {
      const offer = await axios.get(`${backend_url}/manufacturer/offer-detail/${params.offer}`);

      let offerData = offer.data

      setOffer(offerData)

    }
  
    fetchOffer();

    const fetchReq = async () => {
      const prodrequest = await axios.get(`${backend_url}/client/request-detail2/${params.request}`);

      let requestTitle = prodrequest.data.title

      setOfferU({ ...offerU, request: requestTitle })

      setRequest(prodrequest.data)

      let images = []
      let pass = 1
      prodrequest.data.image1? images.push(prodrequest.data.image1): pass+=1
      prodrequest.data.image2? images.push(prodrequest.data.image2): pass+=1
      prodrequest.data.image3? images.push(prodrequest.data.image3): pass+=1
      prodrequest.data.image4? images.push(prodrequest.data.image4): pass+=1
      prodrequest.data.image5? images.push(prodrequest.data.image5): pass+=1
      setSelectedImages(images)

      let files : string[] = []
      prodrequest.data.file1? files.push(prodrequest.data.file1): pass+=1
      prodrequest.data.file2? files.push(prodrequest.data.file2): pass+=1
      prodrequest.data.file3? files.push(prodrequest.data.file3): pass+=1
      setFilePreviews(files)

    }

    fetchReq();

  }, []);

  // Update offer
  const updateOffer = async () => {

    try {

      const response = await axios.put(`${backend_url}/manufacturer/offer-update/${params.offer}`, offerU);

      console.log(`Successful submission ${response.status}`)

      router.push(`/manufacturer/${params.Manufacturer}`)

    } catch (error) {
      console.error('Error submitting machining request:', error);
      setError(true)
    }
  };

  const handleDelete = async () => {
    try {

        const response = await axios.delete(`${backend_url}/manufacturer/offer-delete/${params.offer}`);

        console.log(`Successful deletion ${response.status}`)

        router.push(`/manufacturer/${params.Manufacturer}`)

    } catch (error) {

    console.error('Error deleting news article:', error);
    setErrorD(true)

    }
  }


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',  
      }}
    >
      <div style={{textAlign: 'center', marginTop:'60px'}}>
        <h1 className="font-bolder text-3xl text-blue-500 mb-4">
          {request?.title}
        </h1>
        {request.image1 && (
            <div className="mt-4 mx-auto">
              <Image
                src={`${request.image1}`}
                alt="machining request preview"
                width={100}  
                height={100}
                className=" mx-auto w-1/4 h-32 object-cover border rounded"
              />
            </div>
        )}
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
        
        <div style={{fontSize:'14px', display:'flex', color:'GrayText'}} className="w-[50%] mx-auto"> 
          <p className='pr-6'>Posted: {request.created.slice(0, 10)}</p>
          <p className='px-6'>Valid for: {request.deadline}</p>
          <p className='pl-6'>{request.offer_type}</p>
        </div>

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

        <p className='my-6 mx-auto w-3/4'>{request.description}</p>

        <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4 my-20">
          <h1 className="font-bolder text-3xl text-red-500 my-4">
            Other Information
          </h1>
          <form className="w-3/4 mx-auto my-4 p-4 rounded "> 

            <p className='py-4'>Quantity*</p>
            <p className='bg-white w-3/4 rounded-2xl mx-auto'>{request.quantity}</p>

            <p className='py-4'>Material*</p>
            <p className='bg-white w-3/4 rounded-2xl mx-auto'>{request.material}</p>

            <p className='py-4'>Type of request*</p>
            <p className='bg-white w-3/4 rounded-2xl mx-auto'>{request.offer_type}</p>

            <div className='py-4'>
              <input
              type="checkbox" name="urgent"
              readOnly
              checked={request.urgent}/>Urgent
            </div>

            <div className='py-4'>
              <input
              type="checkbox" name="relaypoint"
              readOnly
              checked={request.urgent}/>Sending to a relay point{`(`}Mondial Relay{`)`}
            </div>

            <div className='py-4'>
              <input
              type="checkbox" name="mailbox"
              readOnly
              checked={request.mailbox_send}/>Sending to the mailbox
            </div>
          </form>
        </div>
        <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4">

          <h1 className="font-bolder text-3xl text-red-500 my-4">
            Update previous offer
          </h1>
          { error && (
              <p className='text-red-600'><strong>Error updating offer</strong></p>
          )}
          <form className="w-3/4 mx-auto my-4 p-4 rounded ">
            <p className='pt-6 pb-2'>Price*</p>
            <input
                placeholder={`${offer.price}`}
                required
                type='number'
                onChange={(e) => setOfferU({ ...offerU, price: parseInt(e.target.value) })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Days*</p>
            <input
                placeholder={`${offer.days}`}
                required
                type='number'
                onChange={(e) => setOfferU({ ...offerU, days: parseInt(e.target.value) })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Message*</p>
            <textarea
                placeholder={`${offer.description}`}
                required
                value={offerU.description}
                onChange={(e) => setOfferU({ ...offerU, description: e.target.value })}
                className="mb-2 w-full h-32 p-2 border border-gray-300 rounded"
            />
          </form>
        </div>
        <button type="submit" onClick={updateOffer} className="w-1/2 p-2 text-white bg-red-500 rounded hover:bg-red-700 my-4">
          <p>Submit</p>
        </button>

        <div className="bg-gray-200 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4 my-20">
            <h1 className="font-bolder text-3xl text-red-500 my-4">
                Delete Offer
            </h1>
            { errorD && (
                <p className='text-red-600'><strong>Error deleting offer</strong></p>
            )}
            <button onClick={handleDelete} className="mx-auto bg-red-500 rounded-xl px-12 py-2">Delete</button>
        </div>

      </div>
      
    </div>
  );
}
