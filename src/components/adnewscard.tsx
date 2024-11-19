import Image from "next/image"
import Link from "next/link"

export type newsArticleType = {
    id: number,
    title: string,
    image: string,
    created: string,
    tags: string,
    article: string
}

export default function NewsCard(props:{ article : newsArticleType}){
    const backend_url = 'https://usinageback-5tu2.onrender.com'
    //const backend_url = 'http://localhost:8000'
    //const backend_url = 'https://usinage-vercelback.vercel.app'
    
    return(
        <div className="bg-gray-100 shadow-lg rounded-lg">
            <Link href={`/adnews/${props.article.id}`}>
                <div style={{ maxHeight:'250px', minHeight:'250px' }}>
                    <Image
                        src={`${props.article.image}`}
                        alt={`${props.article.tags}`}
                        width={400}  
                        height={200}
                    />
                </div>
                <div>
                    <p className="font-bolder text-xl pb-4 text-center">{props.article.title}</p>
                    <p className="text-center px-2 pb-6 text-gray-500">{props.article.article.slice(0, 71)}...</p>
                </div>
            </Link>
        </div>
    )
}