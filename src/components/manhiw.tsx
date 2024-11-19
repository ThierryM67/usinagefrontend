import Image from "next/image";

export default function ManufacturerHowItWorks() {
    return(
        <div
        className="w-[75%] mx-auto mt-10"
        >
            <h1 className="font-bolder text-3xl mb-2">
                You are a machine operator: consult the machining requests
                and make offers for free
            </h1>
            <p>
                Send your best machining offers to potential clients for
                free. Registration on Usineur.fr is free and without obligation
            </p>
            <Image
                src="/assets/mhiw/mhiw1.png"
                alt="mworks1"
                width={900}  
                height={750}
                className='mx-auto mt-5 rounded-xl'
            />
           
            <div className="bg-gray-100 mt-16 rounded-xl py-10 px-12">
                <h1 className="font-bolder text-3xl mb-2 text-red-500">
                    Have the assurance of being paid
                </h1>
                <p className="py-4">
                    On My Machining, it's simple: you deliver a quality machining
                    job to the customer and you get paid. Your customer pays the 
                    entire price to a secure account when ordering Usineur.fr. 
                    The funds are unlocked on your account as soon as your customer 
                    has received the machined parts and validated the quality of your work.
                </p>
                <p>
                    A commission of 14.9% is levied at the source to cover the operating costs of the site
                    Usineur.fr. This is the only cost of using My Machining.
                </p>
                <Image
                    src="/assets/mhiw/mhiw2.png"
                    alt="mworks2"
                    width={700}  
                    height={550}
                    className='mx-auto mt-5 rounded-xl'
                />
                
            </div>

            <div className="mt-16 rounded-xl py-10 px-12">
                <h1 className="font-bolder text-3xl mb-2">
                    Create your profile
                </h1>
                <p className="py-4">
                    Introduce yourself, inspire confidence and 
                    convince new customers to order from you. 
                    Bring together in one place accessible to all: 
                    a presentation of your machining activity, 
                    customer testimonials, a photo gallery to show 
                    your installations or your best achievements.
                </p>
                <Image
                    src="/assets/mhiw/mhiw3.png"
                    alt="mworks2"
                    width={700}  
                    height={550}
                    className='mx-auto mt-5 rounded-xl'
                />
                
            </div> 

            <h1 className="font-bolder text-xl mt-16 mb-2">Do you still have questions?</h1>
            <button className="bg-red-600 hover:bg-red-700 mb-2 w-1/2 mx-auto rounded-lg py-2">Check out our FAQ</button>
            <p>OR</p>
            <button className="border-2 border-read hover:bg-red-700 mt-2 mb-16 w-1/2 mx-auto rounded-lg py-2">Contact Us</button>

        </div>
    )
}