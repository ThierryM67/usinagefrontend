
"use client";
import React from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';


export default function CreateRequest() {

  const router = useRouter();

  const params = useParams<{ Client: string;}>()

  const backend_url = 'https://usinageback-5tu2.onrender.com'
  //const backend_url = 'http://localhost:8000'
  //const backend_url = 'https://usinage-vercelback.vercel.app'

  const [request, setRequest] = React.useState(
    { 
    title: '', client: '', material:'', offer_type: '', description: '',
    urgent:false, quantity:1, mailbox_send:false , relaypoint_send:false,
    deadline:1, accepted_manufacturer_id: 1
  });

  const [reqImage1, setReqImage1] = React.useState<File>();
  const [reqImage2, setReqImage2] = React.useState<File>();
  const [reqImage3, setReqImage3] = React.useState<File>();
  const [reqImage4, setReqImage4] = React.useState<File>();
  const [reqImage5, setReqImage5] = React.useState<File>();


  const [reqFile1, setReqFile1] = React.useState<File>();
  const [reqFile2, setReqFile2] = React.useState<File>();
  const [reqFile3, setReqFile3] = React.useState<File>();

  const [selectedImages, setSelectedImages] = React.useState<string[]>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxFiles = 5;

    if (files) {

      const filesArray = Array.from(files)

      if (filesArray.length > maxFiles) {
        alert(`You can only upload a maximum of ${maxFiles} images.`);
        return;
      }

      setReqImage1(files?.[0])
      setReqImage2(files?.[1])
      setReqImage3(files?.[2])
      setReqImage4(files?.[3])
      setReqImage5(files?.[4])

      const previews = filesArray.map(file => URL.createObjectURL(file));

      setSelectedImages(previews)
    }

    
  };

  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [filePreviews, setFilePreviews] = React.useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxFiles = 3;

    if (files) {
      const filesArray = Array.from(files); 
      if (filesArray.length > maxFiles) {
        alert(`You can only upload a maximum of ${maxFiles} files.`);
        return;
      }

      setReqFile1(files?.[0])
      setReqFile2(files?.[1])
      setReqFile3(files?.[2])

      // Create previews for each PDF file
      const previews = filesArray.map(file => URL.createObjectURL(file));
      setFilePreviews(previews);
    }
  };

  // Fetch client
  React.useEffect(() => {
    const fetchData = async () => {
      const client = await axios.get(`${backend_url}/client/client-detail/${params.Client}`);
      //const client = await axios.get(`${backend_url}/client/client-detail/`);

      let clientname = client.data.first_name
      console.log(clientname)

      setRequest({ ...request, client: clientname })

    }

    fetchData();

  }, []);


  // Register client
  const createRequest = async () => {

    const formData = new FormData();

    if (request) {
      formData.set('title', request.title);
      formData.set('client', request.client);
      formData.set('material', request.material);
      formData.set('offer_type', request.offer_type);
      formData.set('description', request.description);
      formData.set('urgent', String(request.urgent));
      formData.set('quantity', String(request.quantity));
      formData.set('mailbox_send', String(request.mailbox_send));
      formData.set('relaypoint_send', String(request.relaypoint_send));
      formData.set('deadline', String(request.deadline));
      formData.set('accepted_manufacturer_id', String(request.accepted_manufacturer_id));
    }
    
    if (reqImage1){
      formData.set('Image1', reqImage1); 
    }
    if (reqImage2){
      formData.set('Image2', reqImage2); 
    }
    if (reqImage3){
      formData.set('Image3', reqImage3); 
    }
    if (reqImage4){
      formData.set('Image4', reqImage4); 
    }
    if (reqImage5){
      formData.set('Image5', reqImage5); 
    }
    if (reqFile1){
      formData.set('file1', reqFile1); 
    }
    if (reqFile2){
      formData.set('file2', reqFile2); 
    }
    if (reqFile3){
      formData.set('file3', reqFile3); 
    }
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    console.log(formData)
    console.log(request)

    try {
      const response = await axios.post(`${backend_url}/client/request-createb/`, formData);

      console.log(`Successful submission ${response.status}`)

      router.push(`/client/${params.Client}`)

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
          Submit a Machining Request
        </h1>
        <p className='mb-12 mx-auto w-3/4'> 
          Welcome to our matchmaking platform for machining parts.
          Submitting a manufacturing request on Mon Usinage is simple
          and free of charge. Describe your project in detail. 
          The more precise your description will be, the better the 
          machiners will be able to understand your needs.
        </p>
        
        <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4">

          <h1 className="font-bolder text-3xl text-red-500 my-4">
            Describe your project
          </h1>
          <div className='flex'>
            { selectedImages?
              selectedImages.map((selectedImage, index) => (
                <div className="mt-4 mx-auto" key={index}>
                  <img
                      src={selectedImage}
                      alt="Selected preview"
                      className=" mx-auto w-32 h-32 object-cover border rounded"
                  />
                </div>
              ))
              :
              <p>.</p>
            }
            
          </div>
          <form className="w-3/4 mx-auto my-4 p-4 rounded "> 
            <p className='py-2'>Upload request images</p>
            <input
              type="file"
              name="reqImages"
              multiple
              onChange={(e) => handleImageChange(e) }
              className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <p >Plans in image format*</p>
            <p >
                *The first file will be used to illustrate your request
            </p>
            <p>
                *Max file size 3MB
            </p>

            <p className='pt-6 pb-2'>What is the title of your ad?*</p>
            <input
                placeholder="Ex: Washer diameter EXT 22, INT 15"
                required
                value={request.title}
                onChange={(e) => setRequest({ ...request, title: e.target.value })}
                className="mb-2 w-full p-2 border border-gray-300 rounded"
            />

            <p className='pt-4 pb-2'>Description*</p>
            <input
                placeholder="Describe your project"
                required
                value={request.description}
                onChange={(e) => setRequest({ ...request, description: e.target.value })}
                className="mb-2 w-full h-32 p-2 border border-gray-300 rounded"
            />
          </form>
        </div>

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
            Pdf format files {`(`}optional{`)`}
          </h1>
          <div className='flex'>
            {filePreviews.map((file, index) => (
              <div key={index} className="mb-2">
                <iframe
                  src={file}
                  style={{ border: "none", width: "300px", height: "100px" }} // Adjust height and width as needed
                  title="Request pdf"></iframe>
              </div>
            ))}
            
          </div>
          <p className='py-2'>Upload request pdf files</p>
            <input
              type="file"
              name="reqImages"
              multiple
              onChange={(e) => handleFileChange(e) }
              className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
        </div>

        <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4 mt-20 mb-8">

          <h1 className="font-bolder text-3xl text-red-500 my-4">
            Dealines
          </h1>
          <p className='py-2'>I would like to get the offers before</p>
          <input
            type="number"
            value={request.deadline}
            onChange={(e) => setRequest({ ...request, deadline: parseInt(e.target.value) })}
            className="mb-2 w-1/2 p-2 border border-gray-300 rounded"
          />
          <p className='pt-2'>Days</p>
        </div>

        <button type="submit" onClick={createRequest} className="w-1/2 p-2 text-white bg-red-500 rounded hover:bg-red-700 mb-4">
          <p>Submit</p>
        </button>

      </div>
      
    </div>
  );
}
