
 
// This function can be marked `async` if using `await` inside
export function middleware(request: { nextUrl: string | URL | undefined; cookies: { get: (arg0: string) => { (): any; new(): any; value: string; }; }; },response: { redirect: (arg0: URL) => any; }) {
//   return NextResponse.redirect(new URL('/home', request.url))
const path=request.nextUrl;
const ispublicPath=path==='/login'|| path==='/signup' || path==='/verifyemail'

const token=request.cookies.get('token')?.value || "";
if(ispublicPath&&token){
    return response.redirect(new URL('/profile',request.nextUrl))
}

if(!ispublicPath&&!token){
    return response.redirect(new URL('/login',request.nextUrl))
}
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
   '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}