
"use client";
import React from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function CreateOffer() {

  const router = useRouter();
  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'

  const params = useParams<{ Manufacturer: string; request: string}>()

  const [offer, setOffer] = React.useState(
    { 
    request: '', manufacturer: '', price:0, days:1, description: ''
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

  // Fetch Manufacturer
  React.useEffect(() => {
    const fetchMan = async () => {
      const manufacturer = await axios.get(`${backend_url}/manufacturer/manufacturer-detail2/${params.Manufacturer}`);

      let manName = manufacturer.data.first_name

      setOffer({ ...offer, manufacturer: manName })

    }

    fetchMan();

    const fetchReq = async () => {
      const prodrequest = await axios.get(`${backend_url}/client/request-detail2/${params.request}`);

      let requestTitle = prodrequest.data.title

      setOffer({ ...offer, request: requestTitle })

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

  // Register offer
  const createOffer = async () => {

    try {

      const response = await axios.post(`${backend_url}/manufacturer/offer-create2/`, offer);

      console.log(`Successful submission ${response.status}`)

      router.push(`/manufacturer/${params.Manufacturer}`)

    } catch (error) {
      console.error('Error submitting machining request:', error);
    }
  };


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
        <div className='flex w-[80%] mx-auto mt-6'>
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
          <p></p>
          }
          
        </div>
        <div className='flex my-6 w-2/4 mx-auto'> 
          <p className='pr-6 mx-auto'>Posted: {request.created.slice(0, 10)}</p>
          <p className='pr-6 mx-auto'>Valid for: {request.deadline}</p>
          <p className='pr-6 mx-auto'>Offer type: {request.offer_type}</p>
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
            <p></p>
            }
            
        </div>

        <p className='my-6 mx-auto w-3/4'>{request.description}</p>

        <h1 className="font-bolder text-3xl mb-4">
          Offers
        </h1>

        <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4 my-20">
          <h1 className="font-bolder text-3xl text-red-500 my-4">
            Other formats(optional)
          </h1>
          <form className="w-3/4 mx-auto my-4 p-4 rounded "> 

            <p className='py-2'>Quantity*</p>
            <input
                placeholder="Quantity"
                required
                type='number'
                value={request.quantity}
                onChange={(e) => setRequest({ ...request, quantity: parseInt(e.target.value) })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Material*</p>
            <input
                placeholder="Aluminium, stainless steel etc."
                required
                value={request.material}
                onChange={(e) => setRequest({ ...request, material: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Type of offer*</p>
            <input
                className="mb-2 w-full p-2 border border-gray-300 rounded"
                placeholder="Classic"
                list="offers"
                id="offer"
                name="offer"
                value={request.offer_type}
                onChange={(e) => setRequest({ ...request, offer_type: e.target.value })}
            />

            <datalist id="offers">
                <option value="Classic" />
                <option value="Modern" />
                <option value="Different" />
            </datalist>

            <div>
                <input
                    type="checkbox" name="urgent"
                    checked={request.urgent}
                    onChange={(e) => setRequest({ ...request, urgent: e.target.checked })} />Urgent
                <p className='pt-4'>
                    Check the box if the work is urgent
                </p>
                <p className='pb-8'>
                    *an additional cost may be requested by the manufacturer
                </p>
            </div>

            <input
                type="checkbox" name="relaypoint"
                checked={request.relaypoint_send}
                onChange={(e) => setRequest({ ...request, relaypoint_send: e.target.checked })} />Sending to a relay point{`(`}Mondial Relay{`)`}
          
            <p className='pt-6'>
                <input
                type="checkbox" name="mailbox"
                checked={request.mailbox_send}
                onChange={(e) => setRequest({ ...request, mailbox_send: e.target.checked })} />Sending to the mailbox
            </p>
          </form>
        </div>
        
        <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4">

          <h1 className="font-bolder text-3xl text-red-500 my-4">
            Send an offer
          </h1>
          <form className="w-3/4 mx-auto my-4 p-4 rounded ">
            <p className='pt-6 pb-2'>Price*</p>
            <input
                placeholder="Price including delivery costs"
                required
                value={offer.price}
                onChange={(e) => setOffer({ ...offer, price: parseInt(e.target.value) })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Days*</p>
            <input
                placeholder="Time in days before shipment"
                required
                value={offer.days}
                onChange={(e) => setOffer({ ...offer, days: parseInt(e.target.value) })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Message*</p>
            <input
                placeholder="Presentation of the offer"
                required
                value={offer.description}
                onChange={(e) => setOffer({ ...offer, description: e.target.value })}
                className="mb-2 w-full h-32 p-2 border border-gray-300 rounded"
            />
          </form>
        </div>

        <button type="submit" onClick={createOffer} className="w-1/2 p-2 text-white bg-red-500 rounded hover:bg-red-700 my-4">
          <p>Submit</p>
        </button>

      </div>
      
    </div>
  );
}
