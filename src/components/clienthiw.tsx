import Image from "next/image";
import Link from "next/link";

export default function ClientHowItWorks() {
    
    return(
        <div
        >
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 w-[75%] mx-auto ">
                <div>
                    <Image
                        src="/assets/chiw/chowitworks1.png"
                        alt="wcorks1"
                        width={300}  
                        height={300}
                        className='mx-auto mt-5'
                    />
                </div>
                <div>
                    <Image
                        src="/assets/chiw/chowitworks2.png"
                        alt="cworks2"
                        width={300}  
                        height={300}
                        className='mx-auto mt-5'
                    />
                </div>
                <div>
                    <Image
                        src="/assets/chiw/chowitworks3.png"
                        alt="cworks3"
                        width={300}  
                        height={300}
                        className='mx-auto mt-5'
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 w-[75%] mx-auto ">
                <div>
                    <Image
                        src="/assets/chiw/chowitworks4.png"
                        alt="cworks4"
                        width={300}  
                        height={300}
                        className='mx-auto mt-5'
                    />
                </div>
                <div>
                    <Image
                        src="/assets/chiw/chowitworks5.png"
                        alt="cworks5"
                        width={300}  
                        height={300}
                        className='mx-auto mt-5'
                    />
                </div>
                <div>
                    <Image
                        src="/assets/chiw/chowitworks6.png"
                        alt="cworks6"
                        width={300}  
                        height={300}
                        className='mx-auto mt-5'
                    />
                </div>
            </div> 

            <div className="bg-gray-100 w-3/4 mx-auto py-10 mt-10 border-2 rounded-2xl px-12">
                <h1 className="font-bolder text-3xl text-red-500 pb-6">
                    Machining parts has never been easier and affordable
                </h1>
                <p>My Machining allows you to immediately access the best mchiners.
                    So you can do carry out your machining work easily, quickly and efficiently</p>
                <p>Finding a machine on mon usinage is easy; all you have to do is publish your ad
                    for free and to wait for the proposals of qualified machiners
                </p>
                <Image
                    src="/assets/chiw/chowitworks7.png"
                    alt="cworks"
                    width={670}  
                    height={550}
                    className='mx-auto mt-5'
                />
            </div>
            
            <div className="w-3/4 mx-auto py-10 mt-10">
                <h1 className="font-bolder text-3xl text-red-500 pb-6">
                    Guaranteed Result: your payment is only effective after receipt
                    and inspection of machine parts
                </h1>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3 mx-auto ">
                    <div>
                        <Image
                            src="/assets/chiw/chowitworks8.png"
                            alt="cworks8"
                            width={900}  
                            height={800}
                        />
                    </div>
                    <div>
                        <p>
                            Your are not taking a risk on my machining. You pay the proposed
                            amount by the machine operator to order on a secure account. This
                            amount is returned to your machine only after you have received 
                            your coins and confirmed the quality of the machining work. In addition,
                            the machinist are evaluated by the buyers so you can make yourself a 
                            solid opinion from your machiner before ordering
                        </p>
                    </div>
                    <div>
                        <Image
                            src="/assets/chiw/chowitworks9.png"
                            alt="works9"
                            width={900}  
                            height={800}
                        />
                    </div>
                </div> 
            </div>

            <div className="bg-gray-100 w-3/4 mx-auto py-10 mt-10 border-2 rounded-2xl px-12">
                <h1 className="font-bolder text-3xl text-red-500 pb-6">
                    My machining is completely free of charge for you
                </h1>
                <p>There are no hidden fess, no charges, no additional costs. The 
                    committee of Usineur.fr -14.9% is included in the price offered
                        by the machinists and is paid your machiner. In other words,
                        the cost of using usineur.fr is included in the price offeredby your machine operator</p>
                <Image
                    src="/assets/chiw/chowitworks10.png"
                    alt="works9"
                    width={900}  
                    height={800}
                    className="mx-auto mt-6"
                />
            </div>

            <h1 className="font-bolder text-xl mt-16 mb-2">Do you still have questions?</h1>
            <button className="bg-red-600 hover:bg-red-700 mb-2 w-1/2 mx-auto rounded-lg py-2">
                <Link href='/faqs'>Check out our FAQ</Link>
            </button>
            <p>OR</p>
            <button className="border-2 border-read hover:bg-red-700 mt-2 mb-16 w-1/2 mx-auto rounded-lg py-2">
                <Link href='/contact'>Contact Us</Link>
            </button>

        </div>
    )
}