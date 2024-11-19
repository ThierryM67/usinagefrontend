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

    const [ManufacturerU, setManufacturerU] = useState(
        { 
        first_name: '', last_name: '',profile_name:'', email: '',password: '',password1: '',
        password2:'', company:'', idNumber:'', postalCode:'', city:'', address:''
      }
    );

    const [Manufacturer, setManufacturer] = useState(
        { 
        first_name: '', last_name: '',profile_name:'', email: '',password: '',password1: '',
        password2:'', company:'', idNumber:'', postalCode:'', city:'', address:''
      }
    );

    useEffect(() => {
        GetManufacturer()
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

    const params = useParams<{ Manufacturer: string;}>()

    // Update manufacturer
    const updateManufacturer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        if(ManufacturerU.password1 !== ManufacturerU.password2){ setErrorP(true); }
        else{

            if (ManufacturerU) {
                formData.set('first_name', ManufacturerU.first_name);
                formData.set('last_name', ManufacturerU.last_name);
                formData.set('profile_name', ManufacturerU.profile_name);
                formData.set('email', ManufacturerU.email);
                formData.set('password', ManufacturerU.password);
                formData.set('password1', ManufacturerU.password1);
                formData.set('password2', ManufacturerU.password2);
                formData.set('company', ManufacturerU.company);
                formData.set('idNumber', ManufacturerU.idNumber);
                formData.set('postalCode', ManufacturerU.postalCode);
                formData.set('city', ManufacturerU.city);
                formData.set('address', ManufacturerU.address);
            }
            if (profilepic){
                formData.set('profile_pic', profilepic); 
            }

            try {

            const response = await axios.put(`${backend_url}/manufacturer/manufacturer-update/${params.Manufacturer}`, formData);

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

            const response = await axios.delete(`${backend_url}/manufacturer/manufacturer-delete/${params.Manufacturer}`);

            console.log(`Successful deletion ${response.status}`)

            document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            localStorage.removeItem('jwt');

            router.push('/man-login')

        } catch (error) {

        console.error('Error deleting profile', error);
        setErrorD(true)

        }
  }

    const GetManufacturer = async () => {

        const response = await axios.get(`${backend_url}/manufacturer/manufacturer-detail/`, {
            headers: {
            Authorization: localStorage.getItem('jwt'),
            },
        })

        let manufacturerdata = response.data

        setManufacturer(manufacturerdata)
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
                    <form className="w-3/4 mx-auto my-4 p-4 rounded" onSubmit={updateManufacturer}>
                        { error && (
                            <p className='text-red-600'><strong>Error updating profile</strong></p>
                        )}
                        { errorP && (
                            <p className='text-red-600'><strong>Password and confirm password must be same</strong></p>
                        )}
                        <p className='pt-6 pb-2'>First Name*</p>
                        <input
                            placeholder={`${Manufacturer.first_name}`}
                            required
                            value={ManufacturerU.first_name}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, first_name: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Last Name*</p>
                        <input
                            placeholder={`${Manufacturer.last_name}`}
                            required
                            value={ManufacturerU.last_name}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, last_name: e.target.value })}
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
                            placeholder={`${Manufacturer.profile_name}`}
                            required
                            value={ManufacturerU.profile_name}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, profile_name: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>email*</p>
                        <input
                            placeholder={`${Manufacturer.email}`}
                            required
                            value={ManufacturerU.email}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, email: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Password*</p>
                        <input
                            placeholder={`enter password`}
                            required
                            type="password"
                            value={ManufacturerU.password1}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, password: e.target.value, password1: e.target.value  })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Repeat password*</p>
                        <input
                            placeholder={`confirm password`}
                            required
                            type="password"
                            value={ManufacturerU.password2}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, password2: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>City*</p>
                        <input
                            placeholder={`${Manufacturer.city}`}
                            required
                            value={ManufacturerU.city}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, city: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Company</p>
                        <input
                            placeholder={`${Manufacturer.company}`}
                            value={ManufacturerU.company}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, company: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Postal code*</p>
                        <input
                            placeholder={`${Manufacturer.postalCode}`}
                            required
                            value={ManufacturerU.postalCode}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, postalCode: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>ID Number*</p>
                        <input
                            placeholder={`${Manufacturer.idNumber}`}
                            required
                            value={ManufacturerU.idNumber}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, idNumber: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />

                        <p className='pt-6 pb-2'>Address*</p>
                        <input
                            placeholder={`${Manufacturer.address}`}
                            required
                            value={ManufacturerU.address}
                            onChange={(e) => setManufacturerU({ ...ManufacturerU, address: e.target.value })}
                            className="mb-2 w-full p-2 border border-gray-300 rounded"
                        />
                        <button type="submit" className="mx-auto bg-red-500 rounded-xl px-12 py-2 mt-4">Update</button>
                    </form>
                </div>

                <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4 mt-10 mb-60">
                    <h1 className="font-bolder text-3xl text-red-500 my-4">
                        Delete Manufacturer Profile
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