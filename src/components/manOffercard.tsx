import Image from "next/image"
import Link from "next/link"
import { Offer } from "@/app/(client)/client/[Client]/crequests/[Detail]/page"
import { useEffect, useState } from "react"
import axios from "axios"
import { FaStarHalfStroke } from "react-icons/fa6";<FaStarHalfStroke className="text-red-500"/>
import { FaRegStar } from "react-icons/fa";<FaRegStar className="text-red-500"/>
import { FaStar } from "react-icons/fa";<FaStar className="text-red-500"/>
import { ratings } from "./ratings"

export type manufacturer = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    city: string
    company: string
    profile_name: string
    profile_pic: string,   
}

export type rating = {
    id: number,
    rating_value: string,
    review: string,
    offer: string,
    client_id: number,
    created: string,  
}

export default function ManOfferCard(
    props:{ 
        manufacturer : manufacturer,
        selected:boolean,
        setSelected:React.Dispatch<React.SetStateAction<boolean>>,
        offerId:string,
        setOfferId:React.Dispatch<React.SetStateAction<string>>
    }
    ){
        
    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'


    let [ rating, setRating ] = useState<number>()
    let [ selectOffer, setSelectOffer ] = useState<Offer>()
    //let [ selected, setSelected ] = useState(false)
    let [ styling, setStyling ] = useState("")

    const getRatings = async () => {
        let manufRating = await axios.get(`${backend_url}/manufacturer/manufacturer-rating/${props.manufacturer.id}`)
        setRating(manufRating.data)
    }

    useEffect(() => {
        getRatings()
        console.log(props.selected)
    },[])

    const getStar = (rating:number) => {
        const descriptor = Object.getOwnPropertyDescriptor(ratings, rating);
        return (descriptor?.value)
    }

    const handleClick = () => {
        props.setSelected(!props.selected)
        props.selected? setStyling('border-2 border-red-500 rounded-2xl'): setStyling('rounded-2xl')
        props.setOfferId(`${props.manufacturer.id}`)
    };

    
    
    return(
        <div onClick={handleClick} className={`bg-gray-100 shadow-lg ${styling}`}>
            <div style={{ maxHeight:'250px', minHeight:'200px' }} className="rounded-2xl">
                <Image
                    src={`${props.manufacturer.profile_pic}`}
                    alt={`${props.manufacturer.profile_name}`}
                    width={400}  
                    height={200}
                    className="rounded-2xl"
                />
            </div>
            <div className="rounded-2xl h-14">
                <p className="font-bolder text-xl pb-2 text-center">{props.manufacturer.first_name} {props.manufacturer.last_name}</p>
                {rating && (<p className="text-center px-2">{rating}</p>)}
            </div>
            {
                rating? getStar(rating): <p>.</p>
            }
        </div>
    )
}