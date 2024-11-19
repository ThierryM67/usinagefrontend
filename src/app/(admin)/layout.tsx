import type { Metadata } from "next";
import "../globals.css"
import Adminbar from "@/components/adminnav";


export const metadata: Metadata = {
  icons: {
    icon: "/assets/1.ico",
    apple: "/assets/apple-touch-icon.png"
  },
  title: "MonUsinage",
  description: "Best Machinists meet Best Clients",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
        <Adminbar/>
        {children}
    </body>
  );
}
