"use client"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast'

 function Pay() {
    Payment()
    return (
        <div >
        <p>This is the client payment page</p>
        </div>
    );
}

export default function Payment () {
    const params = useParams<{Client:string}>()
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',  
        }}
        >
            <div style={{textAlign: 'center', marginTop:'60px'}}>
                <PayPalScriptProvider options={{"clientId":clientId!}}>
                    <div className="w-1/2 mx-auto">
                        <Toaster/>
                        <div className="bg-green-500 h-[100px] w-[200px]">Product</div>
                        <PayPalButtons
                            style={{ layout:"vertical"}}
                            createOrder={(data, actions)=>{
                                return actions.order.create({
                                    intent: "CAPTURE",
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: "USD",
                                                value: "10.00",
                                            },
                                        },
                                    ],
                                })
                            }}
                            // onApprove={(data, actions)=>{
                            //     if (!actions) return Promise.resolve();

                            //     return actions.order?.capture().then(details => {
                            //         toast.success("Payment completed. Thank you")
                            //     })
                            // }}
                            onApprove = {async (data, actions) => {
                                // Capture the funds from the transaction.
                                // const response = await fetch("/my-server/capture-paypal-order", {
                                //   method: "POST",
                                //   body: JSON.stringify({
                                //     orderID: data.orderID
                                //   })
                                // })
                        
                                //const detailsResponse = await response.json();
                        
                                return actions.order?.capture().then(details => {
                                    toast.success("Payment completed. Thank you"+ details)
                                })
                            }}
                            onCancel={()=>{
                                toast("You cancelled the payment",
                                    {duration: 10000}
                                )
                            }}
                            onError={()=>{
                                toast.error("There was an error with your payment.Please try again",
                                    {duration: 10000}
                                )
                            }}
                        />
                    </div>
                </PayPalScriptProvider>
            </div> 
        </div>
        
    )
}