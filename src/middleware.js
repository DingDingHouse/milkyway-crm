import { NextResponse } from "next/server";


export default function middleware(req) {
  console.log('working')
    const loggedin = req.cookies.get("userToken");
  console.log('working',loggedin)

    const { pathname } = req.nextUrl;
    if(!loggedin&&pathname!=='/'){
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (loggedin && pathname === "/") {
      return NextResponse.redirect(new URL(`/dashboard`, req.url));
    }

    // For any other cases return
  return NextResponse.next()
}

export const config = { matcher: "/((?!api|static|.*\\..*|_next).*)" };