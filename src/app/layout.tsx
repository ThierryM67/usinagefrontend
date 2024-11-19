import type { Metadata } from "next";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import AuthNav from "@/components/authheader";
import { cookies } from 'next/headers';
import { isTokenExpired } from "@/components/expiry";
//use server properties of this component to
//fetch authorization header/cookies
//so as to display auth header or not


export const metadata: Metadata = {
  icons: {
    icon: "/assets/1.ico",
    apple: "/assets/apple-touch-icon.png"
  },
  title: "MonUsinage",
  description: "Best Machinists meet Best Clients",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let token = ''
  const getCookie = async () => {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get('jwt')?.value;
    token = myCookie? token = myCookie : ''
    return token
  }

  //console.log(isTokenExpired())

  // if( await getCookie()){
  //   return (
  //     <html lang="en">
  //       <body
  //       >
  //         <Navbar/>
  //         <AuthNav/>
  //         {children}
  //         <Footer/>
  //       </body>
  //     </html>
  //   );
  // }
  // else {
  //   return (
  //     <html lang="en">
  //       <body
  //       >
  //         <Navbar/>
  //         {children}
  //         <Footer/>
  //       </body>
  //     </html>
  //   );
  // }

  if( await isTokenExpired() ===false ){
    return (
      <html lang="en">
        <body
        >
          <Navbar/>
          <AuthNav/>
          {children}
          <Footer/>
        </body>
      </html>
    );
  }
  else {
    return (
      <html lang="en">
        <body
        >
          <Navbar/>
          {children}
          <Footer/>
        </body>
      </html>
    );
  }
  
}

