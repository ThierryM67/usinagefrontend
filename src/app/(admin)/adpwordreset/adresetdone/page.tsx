import Image from "next/image";
import Link from "next/link";

export default function ResetDone() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',  
            }}
            >
            <div style={{textAlign: 'center', marginTop:'60px'}}>
                <h1 className="font-bolder text-3xl text-blue-500 mb-12">Reset Password</h1>
                
                <div className="bg-gray-100 w-3/4 mx-auto py-10 border-2 rounded-2xl px-4">
                    <div >
                        <Image
                            src="/assets/usinagelogo.png"
                            alt="Mon Usinage"
                            width={200}  
                            height={200}
                            className='mx-auto mt-5'
                            /> 
                    </div>
                    <p>
                        We have emailed you instructions for setting your password, if an account exists with the email
                        you have entered, you should receive the password reset email shortly.
                        <Link href='client-login'>Return to login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}