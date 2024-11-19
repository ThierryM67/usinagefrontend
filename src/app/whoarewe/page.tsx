import Image from "next/image";


export default function WhoAreWe() {
    return (
      <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',  
        }}
        >
            <div style={{textAlign: 'center', marginTop:'60px'}}>
                <h1 className="font-bolder text-3xl text-blue-500">Who are we</h1>
                
                <div className=" w-3/4 mx-auto pb-10 mt-2 px-12">
                    <p>My Machining was born in June 2013 from our machining experience.
                    Having noticed the variations large number of prices offered for 
                    the same piece and the large number of customers renouncing to to place 
                    an order due to high prices, we have taken the initiative to create a 
                    website on which will be able to find each other easily buyers and machinists.</p>
                    <p>Indeed, the machining costs depend on the type of machining to be carried 
                    out but also on the equipment of the machining workshop, the know-how of the
                    machiner and the raw materials in stock in the workshop.</p>
                   
                    <p>
                    Thus, for the same machining job, the costs can vary significantly from one 
                    workshop to another one. By making it possible to broadcast machining 
                    announcements to many machine operators, Usineur.fr allows machine operators 
                    to identify the requests that best match their capacity. And to the companies
                     and individuals to access machining workshops that will 
                     best meet their specific request.
                    </p>
                    <p>
                        By offering a meeting place specialized in machining between customers 
                        and machinists, we will facilitate the access of the greatest number to machining
                        and will thus allow the machining workshops to express to their full potential.
                    </p>
                    <p>To get to know us better, find out what the press says about us, the evaluations
                        of the machiners, or well the prices charged on My Machining.</p>
                </div>

                <div className="bg-gray-100 w-3/4 mx-auto py-10 mt-10 border-2 rounded-2xl px-12">
                    <h1 className="font-bolder text-3xl text-red-500 pb-6">
                        Our people
                    </h1>
                    <p>My Machining allows you to immediately access the best Machiners. So you
                    can to make your machining work easily, quickly and efficiently.</p>
                    <p>Finding a Machine Builder on Mon Usinage is easy: all you have to do is publish 
                        your ad for free and to wait for the proposals of qualified Machinists.</p>
                    <Image
                        src="/assets/wrw.png"
                        alt="Mon Usinage"
                        width={700}  
                        height={500}
                        className='mx-auto mt-5'
                    />
                </div>

                <div className=" w-3/4 mx-auto py-10 mt-10">
                    <h1 className="font-bolder text-3xl text-red-500 pb-6">
                        Help understand us
                    </h1>
                    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
                        <div>
                            <a href="#"><Image
                                src="/assets/contactwrw.png"
                                alt="contact"
                                width={400}  
                                height={300}
                                className='mx-auto mt-5'
                            /></a>
                        </div>
                        <div>
                            <a href="#"><Image
                                src="/assets/faqwrw.png"
                                alt="FAQs"
                                width={400}  
                                height={300}
                                className='mx-auto mt-5'
                            /></a>
                        </div>
                        <div>
                            <a href="#"><Image
                                src="/assets/image.png"
                                alt="works"
                                width={400}  
                                height={300}
                                className='mx-auto mt-5'
                            /></a>
                        </div>
                    </div>
                </div>

                <h1 className="font-bolder text-xl mt-16 mb-2">Do you still have questions?</h1>
                <button className="bg-red-600 hover:bg-red-700 mb-16 w-1/2 mx-auto rounded-lg py-2">Contact Us</button>
            </div>
        </div>
    );
  }