"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import axios from "axios"

export default function Messaging() {
    type message = { body:string, client_user:number, created:string, id:number,
        manufacturer_user:number, read:boolean, receiver:number, sender:number }

    type chat = { body:string, client_user:number, created:string, id:number,
        read:boolean, senderFirst:string, senderLast:string, senderId:number }

    let [reads, setReads ] = useState<message[]>()
    let [readChats, setReadChats ] = useState<chat[]>()

    let [unreads, setUnreads ] = useState<message[]>()
    let [unreadChats, setUnreadChats ] = useState<chat[]>()

    let [currentChat, setCurrentChat] = useState<{id:number, name:string}>()
    let [chatView, setChatView ] = useState<message[]>()
    let [reachOut, setReachOut] = useState<{id:number, name:string}>()
    let [reachView, setReachView ] = useState<message[]>()

    let [text, setText ] = useState('')


    useEffect(()=>{
        getUnread()
        getRead()
        let idStorage = localStorage.getItem('chatId')
        let id = parseInt(idStorage!)
        let nameStorage = localStorage.getItem('ChatName')
        let name = nameStorage!
        setReachOut({id: id, name: name})
        reachChat()
    }, [])

    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'

    const params = useParams<{Client:string}>()

    const reachChat = async () => {
        let idStorage = localStorage.getItem('chatId')
        let id = parseInt(idStorage!)

        let senderMessages = await axios.post(`${backend_url}/directs/manufacturer-chat/${idStorage}/`, 
            { "id": parseInt(params.Client)}
        )
        let responseSender = senderMessages.data

        let receiverMessages = await axios.post(`${backend_url}/directs/client-chat/${params.Client}/`, 
            { "id": id}
        )
        let responseReceiver = receiverMessages.data
        let chatArray = [...responseSender, ...responseReceiver].sort((a: message, b: message)=> new Date(a.created).getTime() - new Date(b.created).getTime())
        console.log(chatArray)
        setReachView(chatArray)

    }

    const getUnread = async () => {
        let request = await axios.post(`${backend_url}/directs/client-unread/`, 
            { "id": parseInt(params.Client)}
        )
        let response = request.data
        setUnreads(response)

        let chats: chat[] = []

        for(let item of response){

            let manRequest = await axios.get(`${backend_url}/manufacturer/manufacturer-detail/${item.sender}`)
            let manFirst = manRequest.data.first_name
            let manLast = manRequest.data.last_name
            let itemChat: chat = {
                body: item.body,
                client_user:item.client_user,
                created: item.created,
                id: item.id,
                read: item.read,
                senderFirst: manFirst,
                senderLast: manLast,
                senderId: item.sender
            }
            chats.push(itemChat)
        }

        setUnreadChats(chats)
    }

    const getRead = async () => {
        let request = await axios.post(`${backend_url}/directs/client-inbox/`, 
            { "id": parseInt(params.Client)}
        )

        let response = request.data
        setReads(response)

        let chats: chat[] = []

        for(let item of response){

            let manRequest = await axios.get(`${backend_url}/manufacturer/manufacturer-detail/${item.sender}`)
            let manFirst = manRequest.data.first_name
            let manLast = manRequest.data.last_name
            let itemChat: chat = {
                body: item.body,
                client_user:item.client_user,
                created: item.created,
                id: item.id,
                read: item.read,
                senderFirst: manFirst,
                senderLast: manLast,
                senderId: item.sender
            }
            chats.push(itemChat)
        }

        setReadChats(chats)
    }

    const chatClick = (id: number, name: string) => {
        setCurrentChat({id: id, name: name})
        console.log("clicked")

        getChat()
    }

    const Combine = () => {
        if(unreadChats && readChats){
            let combined = [...unreadChats, ...readChats]

            function removeDuplicates(array: Array<chat>) {
                const seen = new Set();
                return array.filter((item:chat) => {
                    const value = item.senderId;
                    if (seen.has(value)) {
                    return false;
                    } else {
                    seen.add(value);
                    return true;
                    }
                });
            }
              
            const uniqueCombined = removeDuplicates(combined);

            function splitByRead(array: Array<chat>) {
                const truthyGroup: Array<chat> = [];
                const falsyGroup: Array<chat> = [];
              
                array.forEach((item: chat) => {
                  if (item['read']) {
                    truthyGroup.push(item);
                  } else {
                    falsyGroup.push(item);
                  }
                });
              
                return { truthyGroup, falsyGroup };
            }
            let combinedRead = splitByRead(uniqueCombined).truthyGroup
            let combinedUnread = splitByRead(uniqueCombined).falsyGroup

            return (
                <div>
                    {
                        combinedUnread.map(
                            (unreadChat: chat) => (
                                <div 
                                key={unreadChat.id}
                                onClick={() => {chatClick(unreadChat.senderId, unreadChat.senderFirst)}}
                                className="border-2 rounded-xl border-red-500 p-4 bg-white my-4 mx-4">
                                    <div className="flex">
                                        <p>{unreadChat.senderFirst}</p>
                                        <p>{unreadChat.senderLast}</p>
                                    </div>
                                    <p>{unreadChat.body}</p>
                                </div>
                            )
                        )
                    }
                    {
                        combinedRead.map(
                            (readChat: chat) => (
                                <div 
                                key={readChat.id}
                                onClick={() => {chatClick(readChat.senderId, readChat.senderFirst)}}
                                className="border-2 rounded-xl p-4 bg-white my-4 mx-4">
                                    <div className="flex">
                                        <p>{readChat.senderFirst}</p>
                                        <p>{readChat.senderLast}</p>
                                    </div>
                                    <p>{readChat.body}</p>
                                </div>
                            )
                        )
                    }
                </div>
            )
        }
        
        else if (unreadChats && !readChats){
            function removeDuplicates(array: Array<chat>) {
                const seen = new Set();
                return array.filter((item:chat) => {
                    const value = item.senderId;
                    if (seen.has(value)) {
                    return false;
                    } else {
                    seen.add(value);
                    return true;
                    }
                });
            }
              
            const uniqueUnread = removeDuplicates(unreadChats);

            return uniqueUnread.map(
                (unreadChat) => (
                    <div key={unreadChat.id} className="border-2 rounded-xl border-red-500 p-4 bg-white my-4 mx-4">
                        <div className="flex">
                            <p>{unreadChat.senderFirst}</p>
                            <p>{unreadChat.senderLast}</p>
                        </div>
                        <p>{unreadChat.body}</p>
                    </div>
                )
            )
        } else  if (readChats && !unreadChats){
            function removeDuplicates(array: Array<chat>) {
                const seen = new Set();
                return array.filter((item:chat) => {
                    const value = item.senderId;
                    if (seen.has(value)) {
                    return false;
                    } else {
                    seen.add(value);
                    return true;
                    }
                });
            }
              
            const uniqueRead = removeDuplicates(readChats);

            return uniqueRead.map(
                (unreadChat) => (
                    <div key={unreadChat.id} className="border-2 rounded-xl p-4 bg-white my-4 mx-4">
                        <div className="flex">
                            <p>{unreadChat.senderFirst}</p>
                            <p>{unreadChat.senderLast}</p>
                        </div>
                        <p>{unreadChat.body}</p>
                    </div>
                )
            )
        }
    }

    const getChat = async () => {
        if(currentChat){
            console.log(currentChat)

            let senderMessages = await axios.post(`${backend_url}/directs/client-chat/${currentChat?.id}/`, 
                { "id": parseInt(params.Client)}
            )
            let responseSender = senderMessages.data
    
            let receiverMessages = await axios.post(`${backend_url}/directs/manufacturer-chat/${params.Client}/`, 
                { "id": currentChat?.id}
            )
            let responseReceiver = receiverMessages.data
            let raw = [...responseSender, ...responseReceiver]
            console.log(raw)
            let chatArray = [...responseSender, ...responseReceiver].sort((a: message, b: message)=> new Date(a.created).getTime() - new Date(b.created).getTime())
            console.log(chatArray)
            setChatView(chatArray)
        }
        //setChatView(responseSender)
        //setChatView(responseReceiver)

    }

    const sendMessage = async () => {
        let manufacturer = currentChat?.id
        let request = await axios.post(`${backend_url}/directs/client-send/`, 
            { "client_id": parseInt(params.Client), "manufacturer": manufacturer, "body": text}
        )

        window.location.reload()

    }

    const messageReachOut = async () => {
        let manufacturer = reachOut?.id
        let request = await axios.post(`${backend_url}/directs/client-send/`, 
            { "manufacturer_id": parseInt(params.Client), "manufacturer": manufacturer, "body": text}
        )
        console.log(request.status)

        window.location.reload()

    }

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',  
        }}
        >
            <div style={{textAlign: 'center', marginTop:'60px'}}>
                <h1 className="font-bolder text-3xl text-blue-500 mb-12">Messaging</h1>
                <div className="grid grid-cols-1 mx-auto gap-6 sm:grid-cols-6 md:w-[700px] lg:w-[900px] xl:w-[1100px]">
                    <div className="col-span-4  bg-gray-100 rounded-2xl shadow-xl">
                        {
                            currentChat==undefined?
                            <div>
                                <p className="my-4">Chat : {reachOut?.name}</p>
                                <div className="overflow-y-auto" style={{height: '75vh'}}>
                                    {
                                        reachView?
                                        reachView.map(
                                            (message) => (
                                                <div key={message.id} className="border-2 rounded-xl p-4 bg-white my-4 mx-2">
                                                    <p className="text-red-400 text-start">{reachOut?.name}</p>
                                                    <p>{message.body}</p>
                                                </div>
                                            )
                                        )
                                        :
                                        <h1 className="font-bolder text-3xl text-gray-500 my-20">no chats</h1>
                                    
                                    }
                                </div>
                                <div className="mt-4 flex w-full">
                                    <textarea
                                        placeholder="Send message"
                                        value={text}
                                        onChange={(e) => setText(e.target.value )}
                                        className="mr-4 w-full p-2 border border-gray-300 rounded h-20 ml-2"
                                    />
                                    <button onClick={messageReachOut} className="bg-red-500 rounded-xl px-8">Send</button>
                                </div>
                            </div>
                            :
                            <div>
                                <p className="my-4">Chat : {currentChat.name}</p>
                                <div className="overflow-y-auto" style={{height: '75vh'}}>
                                    {
                                        chatView?
                                        chatView.map(
                                            (message) => (
                                                <div key={message.id} className="border-2 rounded-xl p-4 bg-white my-4 mx-2">
                                                    <p className="text-red-400 text-start">{currentChat.name}</p>
                                                    <p>{message.body}</p>
                                                </div>
                                            )
                                        )
                                        :
                                        <h1 className="font-bolder text-3xl text-gray-500 my-20">no chats</h1>
                                    
                                    }
                                </div>
                                <div className="mt-4 flex w-full">
                                    <textarea
                                        placeholder="Send message"
                                        value={text}
                                        onChange={(e) => setText(e.target.value )}
                                        className="mr-4 w-full p-2 border border-gray-300 rounded h-20 ml-2"
                                    />
                                    <button onClick={sendMessage} className="bg-red-500 rounded-xl px-8">Send</button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-span-2 h-screen overflow-y-auto bg-gray-100 rounded-2xl shadow-xl">
                        <div className="border-b-2 border-black py-8">
                            <h1 className="font-bolder text-xl text-red-500 mb-12">Messages</h1>
                        </div>
                        {Combine()}
                    </div>
                </div>
            </div>
        </div>
    )
}