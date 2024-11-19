"use client"

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Settings() {

    const router = useRouter();

    let [error, setError] = useState(false);

    let [errorD, setErrorD] = useState(false);

    let [errorP, setErrorP] = useState(false);

    let [profilepic, setProfilepic] = useState<File>();

    let [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [ClientU, setClientU] = useState(
        { 
        first_name: '', last_name: '',profile_name:'', email: '',password: '',password1: '',
        password2:'', postalCode:'', city:'', address:''
      }
    );

    const [Client, setClient] = useState(
        { 
        first_name: '', last_name: '',profile_name:'', email: '',password: '',password1: '',
        password2:'', postalCode:'', city:'', address:''
      }
    );

    useEffect(() => {
        GetClient()
      },[])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log('image change')
    
        setProfilepic(e.target.files?.[0])
    
        if (file && file instanceof Blob) {
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
        }
    };

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    const params = useParams<{ Client: string;}>()

    // Update manufacturer
    const updateClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        if(ClientU.password1 !== ClientU.password2){ setErrorP(true); }
        else{

            if (ClientU) {
                formData.set('first_name', ClientU.first_name);
                formData.set('last_name', ClientU.last_name);
                formData.set('profile_name', ClientU.profile_name);
                formData.set('email', ClientU.email);
                formData.set('password', ClientU.password);
                formData.set('password1', ClientU.password1);
                formData.set('password2', ClientU.password2);
                formData.set('postalCode', ClientU.postalCode);
                formData.set('city', ClientU.city);
                formData.set('address', ClientU.address);
            }
            if (profilepic){
                formData.set('profile_pic', profilepic); 
            }

            try {

            const response = await axios.put(`${backend_url}/client/client-update/${params.Client}`, formData);

            console.log(`Successful updating ${response.status}`)

            window.location.reload()

            } catch (error) {
            console.error('Error updating details:', error);
            setError(true)
            }
        }
    };

    const handleDelete = async () => {
        try {

            const response = await axios.delete(`${backend_url}/client/client-delete/${params.Client}`);

            console.log(`Successful deletion ${response.status}`)

            document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            localStorage.removeItem('jwt');

            router.push('/man-login')

        } catch (error) {

        console.error('Error deleting profile', error);
        setErrorD(true)

        }
  }

    const GetClient = async () => {

        const response = await axios.get(`${backend_url}/client/client-detail/`, {
            headers: {
            Authorization: localStorage.getItem('jwt'),
            },
        })

        let clientData = response.data

        setClient(clientData)
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',  
            }}
            >
            <div style={{textAlign: 'center', marginTop:'60px'}} className="w-4/5">
                <div className="bg-gray-100 mx-auto py-10 border-2 rounded-2xl px-4 mt-10">
                    <h1 className="font-bolder text-3xl text-red-500 my-4">
                        Update Details
                    </h1>
                    <form className="w-3/4 mx-auto my-4 p-4 rounded" onSubmit={updateClient}>
                        { error && (
                            <p className='text-red-600'><strong>Error updating profile</strong></p>
                        )}
                        { errorP && (
                            <p className='text-red-600'><strong>Password and confirm password must be same</strong></p>
                        )}
                        <p className='pt-6 pb-2'>First Name*</p>
                        <input
                            placeholder={`${Client.first_name}`}
                            required
                            value={ClientU.first_name}
                            onChange={(e) => setClientU({ ...ClientU, first_name: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Last Name*</p>
                        <input
                            placeholder={`${Client.last_name}`}
                            required
                            value={ClientU.last_name}
                            onChange={(e) => setClientU({ ...ClientU, last_name: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        {selectedImage && (
                            <div className="mt-4 mx-auto">
                            <p className="text-gray-500 mb-2">Profile pic preview:</p>
                            <img
                                src={selectedImage}
                                alt="Selected preview"
                                className=" mx-auto w-32 h-32 object-cover border rounded"
                            />
                            </div>
                        )}

                        <p className='py-2'>Upload profile picture</p>
                        <input
                        type="file"
                        name="profilepic"
                        onChange={(e) => handleImageChange(e) }
                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Profile Name*</p>
                        <input
                            placeholder={`${Client.profile_name}`}
                            required
                            value={ClientU.profile_name}
                            onChange={(e) => setClientU({ ...ClientU, profile_name: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>email*</p>
                        <input
                            placeholder={`${Client.email}`}
                            required
                            value={ClientU.email}
                            onChange={(e) => setClientU({ ...ClientU, email: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Password*</p>
                        <input
                            placeholder={`enter password`}
                            required
                            type="password"
                            value={ClientU.password1}
                            onChange={(e) => setClientU({ ...ClientU, password: e.target.value, password1: e.target.value  })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Repeat password*</p>
                        <input
                            placeholder={`confirm password`}
                            required
                            type="password"
                            value={ClientU.password2}
                            onChange={(e) => setClientU({ ...ClientU, password2: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>City*</p>
                        <input
                            placeholder={`${Client.city}`}
                            required
                            value={ClientU.city}
                            onChange={(e) => setClientU({ ...ClientU, city: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Postal code*</p>
                        <input
                            placeholder={`${Client.postalCode}`}
                            required
                            value={ClientU.postalCode}
                            onChange={(e) => setClientU({ ...ClientU, postalCode: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Address*</p>
                        <input
                            placeholder={`${Client.address}`}
                            required
                            value={ClientU.address}
                            onChange={(e) => setClientU({ ...ClientU, address: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <button type="submit" className="mx-auto bg-red-500 rounded-xl px-12 py-2 mt-4">Update</button>
                    </form>
                </div>

                <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4 mt-10 mb-60">
                    <h1 className="font-bolder text-3xl text-red-500 my-4">
                        Delete Profile
                    </h1>

                    { errorD && (
                        <p className='text-red-600'><strong>Error deleting profile</strong></p>
                    )}

                    <button onClick={handleDelete} className="mx-auto bg-red-500 rounded-xl px-12 py-2">Delete</button>
                </div>
            </div>
        </div>
    );
}