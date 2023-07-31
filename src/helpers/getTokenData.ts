
import jwt from "jsonwebtoken";

export const getTokenData =  (request: { cookies: { get: (arg0: string) => { (): any; new(): any; value: string; }; }; }) => {
try {
    const token=request.cookies.get("token")?.value || "";
    const decodedToken:any=jwt.verify(token,process.env.TOKEN_SECRET!);
    return decodedToken.id;
} catch (error:any) {
    throw new Error(error.message);
}
  
}
