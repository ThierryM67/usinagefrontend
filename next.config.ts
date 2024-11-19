import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '8000', // Specify the port if your backend runs on a specific one
//         pathname: '**', // Adjust the path pattern as needed
//       },
//     ],
//   },
// };

//export default nextConfig;

// module.exports = {
//   images: {
//       domains: ['https://usinageback.onrender.com'],
//   },
// }

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'https://usinage-vercelback.vercel.app',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'another-domain.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
// };
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'usinageback-5tu2.onrender.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'monusinage.s3.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}