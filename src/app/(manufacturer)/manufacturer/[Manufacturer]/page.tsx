"use client"
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Request } from "@/app/page";
import Link from "next/link";

export default function ManufacturerDashboard() {
    let [ manufacturer, setManufacturer ] = useState({
        first_name:'', last_name:'', email:'', password1:'', password2:'',
        city: '', company:'',postalCode:'',idNumber:'',address:'',
        profile_name:'', profile_pic:''
    })

    let params = useParams<{Manufacturer: string}>()

    let [activeprojects, setActiveProjects] = useState<Request[]>([])

    let [completeprojects, setCompleteProjects] = useState<Request[]>([])

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'


  useEffect(() => {
    GetManufacturer()
    manprojects()
  },[])

  const GetManufacturer = async () => {

    const response = await axios.get(`${backend_url}/manufacturer/manufacturer-detail/`, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
    })

    let manufacturerdata = response.data

    setManufacturer(manufacturerdata)
  }

  const manprojects = async () => {
    const response = await axios.get(
        `${backend_url}/manufacturer/manufacturer-request-list/${params.Manufacturer}`
    )

    let requestdata = response.data

    let active=[]
    let completed =[]

    for (let request of requestdata) {
        if (request.completed_status===false){
            active.push(request)
            console.log(active)
        }
        else{
            completed.push(request)
            console.log(completed)
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
                  src={`${manufacturer.profile_pic}`}
                  alt="profile image"
                  width={200}  
                  height={200}
                  className='mx-auto mt-5'
                />
                <div
                    style={{textAlign: 'center', marginTop:'10px'}}
                >
                    <p className="text-red-500">{manufacturer.first_name} {manufacturer.last_name}</p>
                    <p>{manufacturer.profile_name}</p>
                    <p>{manufacturer.email}</p>
                    <p>{manufacturer.company}</p>
                </div>
                <div
                    style={{textAlign: 'center', marginTop:'60px'}}
                >
                    <h1 className="font-bolder text-3xl text-red-500 pb-10">Current projects</h1>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mx-auto w-3/4 py-4">

                    {activeprojects.map((activeproject, index) => (
                        <div className="grid grid-cols-2 gap-2 bg-gray-100 shadow rounded-xl p-4" key={index}>
                            <div>
                                <p className="font-bolder text-xl">{activeproject.title}</p>
                                <p>{activeproject.created}</p>
                                <p>{activeproject.description.slice(0, 25)}</p>
                                <p><Link href={`/manufacturer/${params.Manufacturer}/Requests/${activeproject.id}`}>View...</Link></p>
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
                </div>

                <div
                    style={{textAlign: 'center', marginTop:'60px'}}
                >
                    <h1 className="font-bolder text-3xl text-red-500 pb-10">Completed projects</h1>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mx-auto w-3/4 py-4">
                    {completeprojects.map((completeproject, index) => (
                        <div className="grid grid-cols-2 gap-2 bg-gray-100 shadow rounded-xl p-4" key={index}>
                            <div>
                                <p className="font-bolder text-xl">{completeproject.title}</p>
                                <p>{completeproject.created}</p>
                                <p>{completeproject.description.slice(0, 25)}</p>
                                <p><Link href={`/manufacturer/${params.Manufacturer}/Requests/${completeproject.id}`}>View...</Link></p>
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
                </div>
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
                  src={`${manufacturer.profile_pic}`}
                  alt="profile image"
                  width={200}  
                  height={200}
                  className='mx-auto mt-5'
                />
                <div
                    style={{textAlign: 'center', marginTop:'10px'}}
                >
                    <p className="text-red-500">{manufacturer.first_name} {manufacturer.last_name}</p>
                    <p>{manufacturer.profile_name}</p>
                    <p>{manufacturer.email}</p>
                    <p>{manufacturer.company}</p>
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
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mx-auto w-3/4 py-4">
                            {completeprojects.map((completeproject, index) => (
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