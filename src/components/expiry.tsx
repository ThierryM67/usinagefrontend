import { jwtDecode }from "jwt-decode";
import { cookies } from 'next/headers';

interface JwtPayload {
    exp: number;
  }

export async function isTokenExpired() {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get('jwt')?.value;
    const token = myCookie;
  
  if (!token) {console.log("no token found");return true;} // If no token, treat it as expired

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000; 

    // Check if token is expired
    if(decoded){
        //return decoded.exp < currentTime;
        return false;
    }
    

  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // If there's an error, treat the token as expired
  }
}
